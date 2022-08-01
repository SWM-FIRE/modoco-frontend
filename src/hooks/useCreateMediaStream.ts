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
    if (!userMediaStream?.active) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
        setUserMediaStream(stream);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { userMediaStream, createMediaStream, stopMediaStream };
};
