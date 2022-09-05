import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';
import LogoutModalStore from '../../stores/logoutModalStore';

export default function HeaderProfileModal() {
  const navigate = useNavigate();
  const { toggleLogoutModal } = LogoutModalStore();

  const { nickname, avatar, uid } = UserStore((state) => state);
  const onLogOut = () => {
    localStorage.removeItem('access_token');
    navigate(`/`);
    toggleLogoutModal();
    toast.success('로그아웃 되었습니다');
  };

  const onProfile = () => {
    navigate(`/profile/${uid}`);
    toggleLogoutModal();
  };

  return (
    <Component>
      <UserInformation>
        <AboutMe>
          <AvatarComponent>
            <MyAvatar num={avatar} />
          </AvatarComponent>
          <Nickname>{nickname}</Nickname>
        </AboutMe>
        <Button onClick={onProfile}>마이페이지</Button>
      </UserInformation>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.7rem;
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

const AboutMe = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
`;

const UserInformation = styled.div`
  border-bottom: 1px solid #4b5563;
  padding-bottom: 2.8rem;
`;

const Nickname = styled.span`
  color: #f9fafb;
  font-size: 2.4rem;
  font-family: IBMPlexSansKRRegular;
`;

const Button = styled.button`
  color: #f9fafb;
  width: 100%;
  font-size: 1.5rem;
  height: 4.3rem;
  border: 1px solid #f9fafb;
  border-radius: 2rem;
  padding: 1rem 0 1rem 0;
  cursor: pointer;
`;
