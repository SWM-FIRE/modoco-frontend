import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import MyAvatar from '../../assets/avatar/MyAvatar';
import userStore from '../../stores/userStore';
import { ReactComponent as TopArrow } from '../../assets/svg/topArrow.svg';
import { ReactComponent as BottomArrow } from '../../assets/svg/bottomArrow.svg';

export default React.memo(function Profile({
  isOpenProfileModal,
  toggleProfileModal,
  openLoginModal,
}: {
  isOpenProfileModal: boolean;
  toggleProfileModal: () => void;
  openLoginModal: () => void;
}) {
  const { nickname, avatar } = userStore();

  return nickname ? (
    <ProfileContainer onClick={toggleProfileModal} data-cy="main-profile">
      <AvatarContainer>
        <MyAvatar num={avatar} />
      </AvatarContainer>
      <SvgComponent>
        {isOpenProfileModal ? <TopArrow /> : <BottomArrow />}
      </SvgComponent>
    </ProfileContainer>
  ) : (
    <Login onClick={openLoginModal} data-cy="main-login-button">
      로그인
    </Login>
  );
});

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
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.small} {
    font-size: 1.2rem;
  }
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.small} {
    width: 7.4rem;
    height: 3.8rem;
    font-size: 1.2rem;
  }
`;

const AvatarContainer = styled.div`
  height: 4rem;
  width: 4rem;
  margin-left: 0.3rem;
  svg {
    height: 100%;
    width: 100%;
  }
  ${media.small} {
    height: 3.2rem;
    width: 3.2rem;
  }
`;

const SvgComponent = styled.div`
  margin: 1.9rem;
  display: flex;
  align-items: center;
  ${media.small} {
    margin: 1.5rem;
  }
`;
