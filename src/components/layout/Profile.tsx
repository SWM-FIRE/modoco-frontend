import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';
import userStore from '../../stores/userStore';
import LoginModalStore from '../../stores/loginModalStore';
import { ReactComponent as TopArrow } from '../../assets/svg/topArrow.svg';
import { ReactComponent as BottomArrow } from '../../assets/svg/bottomArrow.svg';

export default function Profile({
  toggleModal,
  headerProfile,
}: {
  toggleModal: () => void;
  headerProfile: boolean;
}) {
  const { nickname, avatar } = userStore();
  const { openLoginModal } = LoginModalStore();
  const closeHeaderProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleModal();
  };

  return nickname ? (
    <ProfileContainer onClick={closeHeaderProfile}>
      <AvatarContainer>
        <MyAvatar num={avatar} />
      </AvatarContainer>
      <SvgComponent>
        {headerProfile ? <TopArrow /> : <BottomArrow />}
      </SvgComponent>
    </ProfileContainer>
  ) : (
    <Login onClick={openLoginModal}>로그인</Login>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;
  color: white;
  border: 1px solid #4b5563;
  border-radius: 5rem;
  cursor: pointer;
`;

const Login = styled.button`
  width: 9.1rem;
  height: 4.8rem;
  border: 2px solid #494e5b;
  border-radius: 0.8rem;
  cursor: pointer;
  color: #fcfcf9;
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  font-weight: 700;
`;

const AvatarContainer = styled.div`
  height: 4rem;
  width: 4rem;
  margin-left: 0.3rem;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const SvgComponent = styled.div`
  margin: 1.9rem;
  display: flex;
  align-items: center;
`;
