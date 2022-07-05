/* eslint-disable no-param-reassign */
import { RefObject, useEffect, useState } from 'react';

export const useCreateMediaStream = (
  localVideoRef: RefObject<HTMLVideoElement>,
) => {
  const [userMediaStream, setUserMediaStream] = useState<MediaStream>();
  /**
   * @stream getUserMedia - webCam
   * @stream getDisplayMedia - screen
   */
  useEffect(() => {
    const createMediaStream = async () => {
      const stream: MediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setUserMediaStream(stream);
    };
    createMediaStream();
  }, [localVideoRef]);

  return userMediaStream;
};
