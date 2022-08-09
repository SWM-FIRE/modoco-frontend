/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import UserMediaStreamStore from '../stores/userMediaStreamStore';

export const useCreateMediaStream = () => {
  const {
    userMediaStream,
    setUserMediaStream,
    userMic,
    setUserMic,
    setUserVideo,
    userVideo,
  } = UserMediaStreamStore();
  const myStream: { localStream: MediaStream | null } = {
    localStream: userMediaStream,
  };

  const stopMediaStream = () => {
    if (userMediaStream) {
      userMediaStream.getTracks().forEach((track) => track.stop());
    }
    setUserMic(false);
    setUserVideo(false);
    myStream.localStream = null;
    setUserMediaStream(null);
  };

  const toggleMic = () => {
    console.log('toggling mic');
    myStream.localStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setUserMic(!userMic);
  };

  const stopDisplayStream = () => {
    if (userVideo) {
      myStream.localStream.getVideoTracks().forEach((track) => track.stop());
      console.log('blah blah');
      myStream.localStream.removeTrack(
        myStream.localStream.getVideoTracks()[0],
      );
      setUserVideo(false);
      const newStream = myStream.localStream;
      console.log(
        'removing display stream',
        myStream.localStream.getVideoTracks(),
      );
      setUserMediaStream(newStream);
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
            echoCancellation: false,
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

  const createDisplayStream = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      videoStream.getVideoTracks().forEach((track) => {
        myStream.localStream.addTrack(track);
      });
      setUserVideo(true);
      console.log('set display');
      console.log('myStream', myStream.localStream.getVideoTracks());
      setUserMediaStream(myStream.localStream);
    } catch (error) {
      console.log('failed to get display stream', error);
    }
  };

  const createAll = async () => {
    await createAudioStream();
    await createDisplayStream();
  };

  return {
    toggleMic,
    createDisplayStream,
    createAudioStream,
    stopMediaStream,
    stopDisplayStream,
    createAll,
  };
};
