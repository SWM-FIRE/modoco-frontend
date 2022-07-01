import React, { forwardRef } from 'react';
import { Video, VideoContainer } from './Video';

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
