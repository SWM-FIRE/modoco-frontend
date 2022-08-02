import UserMediaStreamStore from '../stores/userMediaStreamStore';

export const useCreateMediaStream = () => {
  const { userMediaStream, setUserMediaStream } = UserMediaStreamStore();

  const stopMediaStream = () => {
    if (userMediaStream) {
      userMediaStream.getTracks().forEach((track) => track.stop());
    }
    setUserMediaStream(null);
  };

  const createMediaStream = async () => {
    if (!userMediaStream) {
      try {
        const videoStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
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
        const [videoTrack] = videoStream.getVideoTracks();
        const [audioTrack] = audioStream.getAudioTracks();
        const stream = new MediaStream([videoTrack, audioTrack]);
        setUserMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { userMediaStream, createMediaStream, stopMediaStream };
};
