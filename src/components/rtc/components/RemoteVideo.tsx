/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Video, VideoContainer } from './Video';

export function RemoteVideo(props: any) {
  type MediaProvider = MediaStream | MediaSource | Blob;
  const [mediaStream, setMediaStream] = useState<MediaProvider>();

  useEffect(() => {
    console.log('props', props);
    const interval = setInterval(() => {
      const remote = document.getElementById(
        props.id,
      ) as HTMLVideoElement | null;
      const stream = remote?.srcObject;

      if (stream) {
        setMediaStream(stream);
        clearInterval(interval);
        console.log(mediaStream);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [props.id]);

  return (
    <VideoContainer>
      <Video {...props} />
    </VideoContainer>
  );
}
