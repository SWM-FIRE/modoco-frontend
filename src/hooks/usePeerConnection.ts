/* eslint-disable no-undef */
import { useEffect } from 'react';
import axios from 'axios';
import roomSocket from '../adapters/roomSocket';
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import connectedUsersStore from '../stores/connectedUsersStore';
import userPcStore from '../stores/userPcStore';
import messageStore from '../stores/messagesStore';
import { API } from '../config';

const usePeerConnection = () => {
  const { userMediaStream } = UserMediaStreamStore();
  const { connectedUsers, appendUser, setUserStream } = connectedUsersStore();
  const { pcs, setPc } = userPcStore();
  const { appendMessages } = messageStore();
  const newSocket = roomSocket.socket;

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
    const createPeerConnection = (sid: string) => {
      // if (pcs[sid]) {
      //   console.log('already connected pc');
      //   return pcs[sid];
      // }

      if (!userMediaStream) {
        console.debug('error no localStream');
      }

      const peerConnection = new RTCPeerConnection(RTCConfig);

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          newSocket.emit('ice-candidate', {
            to: sid,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.debug('adding track', event.streams[0]);
        //
        setUserStream({ sid, stream: event.streams[0] });
      };

      peerConnection.onicegatheringstatechange = (event: Event) => {
        console.debug('ice gathering state changed', event);
      };

      userMediaStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, userMediaStream);
      });

      setPc({ sid, peerConnection });

      return peerConnection;
    };

    const createOffer = async (sid: string) => {
      console.debug('creating offer', userMediaStream);
      const peerConnection = createPeerConnection(sid);
      if (peerConnection) {
        const offer = await peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(
          new RTCSessionDescription(offer),
        );
        console.debug(`[SOCKET] call user(${sid}) with offer`, offer);
        newSocket.emit('call-user', { to: sid, offer });
      }
    };

    // create answer to offer
    const createAnswer = async (
      sid: string,
      offer: RTCSessionDescriptionInit,
    ) => {
      const peerConnection = createPeerConnection(sid);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offer),
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        // send answer to other user
        console.debug('[SOCKET] answer to user(', sid, ')');
        newSocket.emit('make-answer', { to: sid, answer });
      }
    };

    // handle offer from new user
    const onCallMade = async (data: {
      sid: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      console.debug(
        `[SOCKET:on"call-made"] received offer from other user(${data.sid})`,
      );
      await createAnswer(data.sid, data.offer);
    };

    // handle answer made from other user
    const onAnswerMade = async (data: {
      sid: string;
      answer: RTCSessionDescriptionInit;
    }) => {
      console.debug(
        `[SOCKET:on"answer-made"] received answer from other user(${data.sid})(${data.answer})`,
      );
      const peerConnection = pcs[data.sid];

      if (peerConnection) {
        peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer),
        );
      }
    };

    const onNewUser = async ({ sid, uid }) => {
      axios
        .get((API.USER as string) + uid, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          if (!connectedUsers.includes(uid)) {
            appendUser({
              nickname: res.data.nickname,
              uid,
              avatar: res.data.avatar,
              socketId: sid,
              enabledVideo: true,
              enabledAudio: true,
            });
          } else {
            console.log('already connected');
          }
          appendMessages({
            uid,
            nickname: res.data.nickname,
            avatar: res.data.avatar,
            message: `${res.data.nickname}님이 입장하셨습니다.`,
            createdAt: '',
            type: 'join',
            isHideTime: false,
            isHideNicknameAndAvatar: false,
          });
          // console.log('new', res.data.nickname, 'joined');
        });
      await createOffer(sid);
    };

    // handle ice-candidate from other user
    const onIceCandidateReceived = (data: {
      sid: string;
      candidate: RTCIceCandidateInit;
    }) => {
      console.debug(
        `[SOCKET:on"ice-candidate"] received ice-candidate from other user(${data.sid}), candidate: ${data.candidate}`,
      );
      if (pcs[data.sid]) {
        pcs[data.sid].addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    newSocket.off('newUser').on('newUser', onNewUser);
    newSocket.off('call-made').on('call-made', onCallMade);
    newSocket.off('answer-made').on('answer-made', onAnswerMade);
    newSocket.off('ice-candidate').on('ice-candidate', onIceCandidateReceived);
  }, [userMediaStream, pcs]);
};

export default usePeerConnection;
