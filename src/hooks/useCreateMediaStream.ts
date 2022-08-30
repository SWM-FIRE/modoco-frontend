/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import userPcStore from '../stores/userPcStore';

export const useCreateMediaStream = () => {
  const {
    userMediaStream,
    setUserMediaStream,
    userMic,
    setUserMic,
    setUserVideo,
    userVideo,
  } = UserMediaStreamStore((state) => state);
  const myStream: { localStream: MediaStream | null } = {
    localStream: userMediaStream,
  };
  const { pcs } = userPcStore();

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
    // myStream.localStream.getAudioTracks().forEach((track) => {
    //   track.enabled = !track.enabled;
    // });
    // setUserMic(!userMic);
    if (userMic) {
      myStream.localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = false));
      setUserMic(false);
      console.log('userMic 껐어용: ', myStream.localStream.getAudioTracks()[0]);
    } else {
      myStream.localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = true));
      setUserMic(true);
      console.log('userMic 켰어용', myStream.localStream.getAudioTracks()[0]);
    }
  };

  const stopDisplayStream = () => {
    if (userVideo) {
      myStream.localStream.getVideoTracks().forEach((track) => track.stop());

      // removeDisplayTrack(sid, myStream.localStream);
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

  const createDisplayStream = async () => {
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
    toggleMic,
    createDisplayStream,
    createAudioStream,
    stopMediaStream,
    stopDisplayStream,
    createAll,
  };
};
