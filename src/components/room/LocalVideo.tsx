import React, { forwardRef } from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export const LocalVideo = forwardRef<
  HTMLVideoElement,
  React.HTMLProps<HTMLVideoElement>
>((props, ref) => {
  return (
    <Component>
      <Video ref={ref} autoPlay playsInline muted />
      <User>
        <MyAvatar num={1} />
        <UserName>User1</UserName>
      </User>
    </Component>
  );
});
LocalVideo.displayName = 'Video';

const Component = styled.div`
  position: relative;
  background-color: darkgray;
  width: 46.3rem;
  height: 30rem;
`;

const Video = styled.video`
  border-radius: 0.5rem;
  height: 100%;
  width: 100%;
`;

const User = styled.div`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
`;

const UserName = styled.span`
  color: #f9fafb;
`;
