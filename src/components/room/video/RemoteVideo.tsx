import React, { useEffect, useState } from 'react';
import { Video, VideoContainer } from './video';

export function RemoteVideo(props: any) {
  type MediaProvider = MediaStream | MediaSource | Blob;
  const [mediaStream, setMediaStream] = useState<MediaProvider>();

  const { id } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      const videoStream = document.getElementById(
        id,
      ) as HTMLVideoElement | null;
      if (videoStream !== null) {
        const stream = videoStream.srcObject;
        if (stream) {
          setMediaStream(stream);
          clearInterval(interval);
        }
      }
      console.log(mediaStream);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [id]);

  return (
    <VideoContainer>
      <Video autoPlay playsInline muted />
    </VideoContainer>
  );
}
