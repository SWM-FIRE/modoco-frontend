/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import axios from 'axios';
import roomSocket from '../adapters/roomSocket';
import { useCreateMediaStream } from './useCreateMediaStream';
import connectedUsersStore from '../stores/connectedUsersStore';

const usePeerConnection = () => {
  const { userMediaStream: localStream, createMediaStream } =
    useCreateMediaStream();
  const { connectedUsers, appendUser, updateMediaStream } =
    connectedUsersStore();

  const [pcs, setPcs] = useState<{ [key: string]: RTCPeerConnection | null }>(
    {},
  );

  const RTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };

  useEffect(() => {
    const createPeerConnection = (receiverSocketId: string) => {
      const peerConnection = new RTCPeerConnection(RTCConfig);

      if (pcs[receiverSocketId]) {
        console.log('already connected pc');
        return pcs[receiverSocketId];
      }

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        console.log('candidate exchange');
        if (event.candidate) {
          roomSocket.emit('ice-candidate', {
            to: receiverSocketId,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log('adding track', event.streams[0]);
        updateMediaStream({
          socketId: receiverSocketId,
          stream: event.streams[0],
        });
      };

      peerConnection.onicegatheringstatechange = (event: Event) => {
        console.log('ice gathering state changed', event);
      };

      localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      setPcs((prevPcs) => ({
        ...prevPcs,
        [receiverSocketId]: peerConnection,
      }));

      return peerConnection;
    };

    const createOffer = async (sid: string) => {
      console.log('creating offer', localStream);
      if (!localStream) {
        console.log('no mediastream before createoffer');
        await createMediaStream();
      }
      const peerConnection = await createPeerConnection(sid);
      // create offer
      if (peerConnection) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer); // triggers ice gathering
        // send offer to new user
        console.log(`[SOCKET] call user(${sid}) with offer`);
        roomSocket.emit('call-user', { to: sid, offer });
      }
    };

    // create answer to offer
    const createAnswer = async (
      sid: string,
      offer: RTCSessionDescriptionInit,
    ) => {
      if (!localStream) {
        console.log('no mediastream before createanswer');
        await createMediaStream();
      }
      const peerConnection = await createPeerConnection(sid);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(offer);
        // create answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer); // peer 2 case

        // send answer to other user
        console.log('[SOCKET] answer to user(', sid, ')');
        roomSocket.emit('make-answer', { to: sid, answer });
      }
    };

    // handle offer from new user
    const onCallMade = async (data: any) => {
      console.log(
        `[SOCKET:on"call-made"] received offer from other user(${data.sid})`,
      );
      await createAnswer(data.sid, data.offer);
    };

    // handle answer made from other user
    const onAnswerMade = async (data: any) => {
      console.log(
        `[SOCKET:on"answer-made"] received answer from other user(${data.sid})(${data.answer})`,
      );
      if (!pcs[data.sid].currentRemoteDescription) {
        console.log('setting pcs to ', data.answer);
        pcs[data.sid].setRemoteDescription(data.answer);
      }
    };

    // handle ice-candidate from other user
    const onIceCandidateRecieved = (data: any) => {
      console.log(
        `[SOCKET:on"ice-candidate"] received ice-candidate from other user(${data.sid}), candidate: ${data.candidate}`,
      );
      if (pcs[data.sid]) {
        pcs[data.sid].addIceCandidate(data.candidate);
      }
    };

    roomSocket.off('newUser').on('newUser', async ({ sid, uid }) => {
      if (!localStream) {
        console.log('no mediastream before createanswer');
        await createMediaStream();
      }
      axios
        .get((process.env.REACT_APP_GET_USER_INFO as string) + uid)
        .then((res) => {
          if (!connectedUsers.includes(uid)) {
            appendUser({
              nickname: res.data.nickname,
              uid,
              avatar: res.data.avatar,
              socketId: sid,
              stream: null,
            });
          } else {
            console.log('already connected');
          }
          console.log('new', res.data.nickname, 'joined');
        });
      await createOffer(sid);
    });

    roomSocket.off('call-made').on('call-made', onCallMade);
    roomSocket.off('answer-made').on('answer-made', onAnswerMade);
    roomSocket.off('ice-candidate').on('ice-candidate', onIceCandidateRecieved);
  }, [localStream, pcs]);
};

export default usePeerConnection;
