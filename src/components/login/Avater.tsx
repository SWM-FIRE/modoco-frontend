import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';

export default function Avater() {
  const { avatar } = UserStore();
  return (
    <AvatarContainer>
      <MyAvatar num={Number(avatar)} />
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div`
  height: 4rem;
  width: 17rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;
