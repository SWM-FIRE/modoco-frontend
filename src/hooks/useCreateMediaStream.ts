/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { useEffect } from 'react';
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import userPcStore from '../stores/userPcStore';
import roomSocket from '../adapters/roomSocket';
import connectedUsersStore from '../stores/connectedUsersStore';

export const useCreateMediaStream = () => {
  const {
    userMediaStream,
    setUserMediaStream,
    setUserMic,
    setUserVideo,
    userVideo,
    userAudioInputDevice,
  } = UserMediaStreamStore();
  const myStream: { localStream: MediaStream | null } = {
    localStream: userMediaStream,
  };
  const { connectedUsers } = connectedUsersStore((state) => state);
  const { pcs } = userPcStore();
  const newSocket = roomSocket.socket;

  useEffect(() => {
    const audioStateChange = (data) => {
      const { sid, enabled } = data;
      const user = connectedUsers.find((user) => user.socketId === sid);
      if (user) {
        user.enabledAudio = enabled;
      }
    };
    newSocket?.on('audioStateChange', audioStateChange);
  }, [roomSocket, connectedUsers]);

  const stopMediaStream = () => {
    if (userMediaStream) {
      userMediaStream.getTracks().forEach((track) => track.stop());
    }
    setUserMic(false);
    setUserVideo(false);
    myStream.localStream = null;
    setUserMediaStream(null);
  };

  const emitAudioStateChange = (room: string, enabled: boolean) => {
    newSocket.emit('audioStateChange', { room, enabled });
    myStream.localStream.getAudioTracks().forEach((track) => {
      track.enabled = enabled;
    });
    setUserMic(enabled);
  };

  const stopDisplayStream = () => {
    if (userVideo) {
      myStream.localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = false));
      setUserVideo(false);
    } else {
      console.log('myStream doesnt exist', myStream);
    }
  };

  const createAudioStream = async () => {
    if (!myStream.localStream) {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            autoGainControl: false,
            channelCount: 2,
            echoCancellation: true,
            latency: 0,
            noiseSuppression: false,
            sampleRate: 48000,
            sampleSize: 16,
          },
        });
        const [audioTrack] = audioStream.getAudioTracks();
        myStream.localStream = new MediaStream([audioTrack]);
        setUserMic(true);
        setUserMediaStream(myStream.localStream);
      } catch (error) {
        console.log('failed to get audio stream', error);
        const stream = new MediaStream();
        setUserMediaStream(stream);
      }
    }
  };

  const replaceAudioStream = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: userAudioInputDevice?.deviceId,
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: true,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
        },
      });
      myStream.localStream.removeTrack(
        myStream.localStream.getAudioTracks()[0],
      );
      myStream.localStream.addTrack(audioStream.getAudioTracks()[0]);
      setUserMediaStream(myStream.localStream);
      Object.keys(pcs).forEach((pc) => {
        const sender = pcs[pc]
          .getSenders()
          .find((s) => s.track.kind === 'audio');
        sender.replaceTrack(audioStream.getAudioTracks()[0]);
      });
    } catch (error) {
      console.log('failed to change audio stream', error);
      const stream = new MediaStream();
      setUserMediaStream(stream);
    }
  };

  const createDisplayStream = async () => {
    if (myStream.localStream.getVideoTracks().length !== 0) {
      myStream.localStream.removeTrack(
        myStream.localStream.getVideoTracks()[0],
      );
    }
    try {
      const videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1280, max: 1280 },
          height: { ideal: 720, max: 720 },
        },
      });
      videoStream.getVideoTracks().forEach((track) => {
        myStream.localStream.addTrack(track);
      });
      setUserVideo(true);
      setUserMediaStream(myStream.localStream);

      Object.keys(pcs).forEach((pc) => {
        const sender = pcs[pc]
          .getSenders()
          .find((s) => s.track.kind === 'video');
        sender.replaceTrack(videoStream.getVideoTracks()[0]);
      });
    } catch (error) {
      console.log('failed to get display stream', error);
    }
  };

  const createAll = async () => {
    await createAudioStream();
    await createDisplayStream();
  };

  return {
    emitAudioStateChange,
    replaceAudioStream,
    createDisplayStream,
    createAudioStream,
    stopMediaStream,
    stopDisplayStream,
    createAll,
  };
};
