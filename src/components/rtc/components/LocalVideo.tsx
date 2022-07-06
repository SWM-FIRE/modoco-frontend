import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const LocalVideo = forwardRef<
  HTMLVideoElement,
  React.HTMLProps<HTMLVideoElement>
>((props, ref) => {
  return (
    <VideoContainer>
      <Video ref={ref} autoPlay playsInline muted />
    </VideoContainer>
  );
});
LocalVideo.displayName = 'Video';

export const VideoContainer = styled.div`
  box-sizing: border-box;
  position: relative;
`;

export const Video = styled.video`
  height: 100%;
  width: 100%;
`;
