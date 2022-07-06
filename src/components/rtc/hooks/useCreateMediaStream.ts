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
      let stream: MediaStream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      } catch (e) {
        console.log('cannot get display');
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setUserMediaStream(stream);
    };
    createMediaStream();
  }, [localVideoRef]);

  return userMediaStream;
};
