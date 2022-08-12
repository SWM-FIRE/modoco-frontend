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
  const { connectedUsers, appendUser, updateMediaStream } =
    connectedUsersStore();
  const { pcs, setPc } = userPcStore();
  const { appendMessages } = messageStore();

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
        console.log('error no localStream');
      }

      console.log('making peerConnection', sid);

      const peerConnection = new RTCPeerConnection(RTCConfig);

      peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        console.log('candidate exchange');
        if (event.candidate) {
          roomSocket.emit('ice-candidate', {
            to: sid,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.ontrack = (event: RTCTrackEvent) => {
        console.log('remote track', event.streams);
        console.log('adding track', event.streams[0]);
        updateMediaStream({
          socketId: sid,
          stream: event.streams[0],
        });
      };

      peerConnection.onicegatheringstatechange = (event: Event) => {
        console.log('ice gathering state changed', event);
      };

      const setMyStream = () => {
        userMediaStream?.getTracks().forEach((track) => {
          peerConnection.addTrack(track, userMediaStream);
        });
      };
      setMyStream();
      setPc({ sid, peerConnection });
      console.log('new peerConnection created', sid, peerConnection);

      return peerConnection;
    };

    const createOffer = async (sid: string) => {
      console.log('creating offer', userMediaStream);
      const peerConnection = createPeerConnection(sid);
      if (peerConnection) {
        const offer = await peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(
          new RTCSessionDescription(offer),
        );
        // send offer to new user
        console.log(`[SOCKET] call user(${sid}) with offer`, offer);
        roomSocket.emit('call-user', { to: sid, offer });
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
        console.log('[SOCKET] answer to user(', sid, ')');
        roomSocket.emit('make-answer', { to: sid, answer });
      }
    };

    // handle offer from new user
    const onCallMade = async (data: {
      sid: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      console.log(
        `[SOCKET:on"call-made"] received offer from other user(${data.sid})`,
      );
      await createAnswer(data.sid, data.offer);
    };

    // handle answer made from other user
    const onAnswerMade = async (data: {
      sid: string;
      answer: RTCSessionDescriptionInit;
    }) => {
      console.log(
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
              stream: new MediaStream(),
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
          console.log('new', res.data.nickname, 'joined');
        });
      await createOffer(sid);
    };

    // handle ice-candidate from other user
    const onIceCandidateReceived = (data: {
      sid: string;
      candidate: RTCIceCandidateInit;
    }) => {
      console.log(
        `[SOCKET:on"ice-candidate"] received ice-candidate from other user(${data.sid}), candidate: ${data.candidate}`,
      );
      if (pcs[data.sid]) {
        pcs[data.sid].addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    roomSocket.off('newUser').on('newUser', onNewUser);
    roomSocket.off('call-made').on('call-made', onCallMade);
    roomSocket.off('answer-made').on('answer-made', onAnswerMade);
    roomSocket.off('ice-candidate').on('ice-candidate', onIceCandidateReceived);
  }, [userMediaStream, pcs]);
};

export default usePeerConnection;
