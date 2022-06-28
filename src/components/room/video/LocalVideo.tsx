import React from 'react';
import styled from 'styled-components';

export const LocalVideo = React.forwardRef<PropsType, RefType>((props, ref) => {
  return (
    <VideoContainer>
      <VoiceVisualizer id="local" />
      <Video {...props} ref={ref} />
    </VideoContainer>
  );
});

const VideoContainer = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: #3a3a3e;
  box-sizing: border-box;
  position: relative;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
`;
