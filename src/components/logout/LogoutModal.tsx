import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';

export default function LogoutModal() {
  const { nickname, avatar } = UserStore();
  return (
    <Component>
      <UserInformation>
        <AvatarComponent>
          <MyAvatar num={avatar} />
        </AvatarComponent>
        <Nickname>{nickname}</Nickname>
      </UserInformation>
      <Logout>로그아웃</Logout>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.7rem;
  height: 18rem;
  width: 32rem;
  background-color: #23262f;
  border-radius: 2rem;
  position: absolute;
  top: 12.4rem;
  right: 4.4rem;
  padding: 3.2rem 2.4rem;
  z-index: 999;
`;

const AvatarComponent = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const UserInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Nickname = styled.span`
  color: #f9fafb;
  font-size: 2.4rem;
  font-family: IBMPlexSansKRRegular;
`;

const Logout = styled.button`
  color: #f9fafb;
  font-size: 1.5rem;
  width: 100%;
  height: 4.3rem;
  border: 1px solid #f9fafb;
  border-radius: 2rem;
  padding: 1rem 0 1rem 0;
  cursor: pointer;
`;
