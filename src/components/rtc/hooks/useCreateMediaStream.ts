/* eslint-disable no-param-reassign */
import { RefObject, useEffect, useState } from 'react';

export const useCreateMediaStream = (
  localVideoRef: RefObject<HTMLVideoElement>,
) => {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream>();
  useEffect(() => {
    createMediaStream();
  }, [localVideoRef]);

  /**
   * @stream getUserMedia - webCam
   * @stream getDisplayMedia - screen
   */
  const createMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;
      setUserMediaStream(stream);
      console.log('my stream : ', stream);
    } catch (e) {
      console.log('cannot get display');
    }
  };

  return userMediaStream;
};
