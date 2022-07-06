/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  key: string;
  id: string;
  autoPlay: boolean;
  playsInline: boolean;
  muted: boolean;
}

export function RemoteVideo(props: Props) {
  // type MediaProvider = MediaStream | MediaSource | Blob;
  // const [mediaStream, setMediaStream] = useState<MediaProvider>();

  useEffect(() => {
    const interval = setInterval(() => {
      const remote = document.getElementById(
        props.id,
      ) as HTMLVideoElement | null;
      const stream = remote?.srcObject;
      if (stream) {
        // setMediaStream(stream);
        clearInterval(interval);
      }
      console.log('remote', stream);
    }, 10000);

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
const VideoContainer = styled.div`
  box-sizing: border-box;
  position: relative;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
`;
