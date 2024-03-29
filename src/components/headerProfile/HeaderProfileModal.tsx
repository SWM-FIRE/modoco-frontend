import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';
import Friends from './Friends';
import { leaveLobby } from '../../adapters/lobbySocket';

export default React.memo(function HeaderProfileModal({
  closeProfileModal,
}: {
  closeProfileModal: () => void;
}) {
  const navigate = useNavigate();
  const { nickname, avatar, uid, setClear } = UserStore();

  const onLogOut = () => {
    leaveLobby();
    localStorage.removeItem('access_token');
    closeProfileModal();
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  const onProfile = () => {
    navigate(`/profile/${uid}`);
    closeProfileModal();
  };

  return (
    <ModalPosition>
      <Container>
        <UserInformation>
          <AboutMe>
            <AvatarComponent>
              <MyAvatar num={avatar} />
            </AvatarComponent>
            <Nickname>{nickname}</Nickname>
          </AboutMe>
          <Button onClick={onProfile}>마이페이지</Button>
        </UserInformation>
        <Friends />
        <Button onClick={onLogOut} data-cy="profile-logout">
          로그아웃
        </Button>
      </Container>
    </ModalPosition>
  );
});

const ModalPosition = styled.div`
  position: absolute;
  top: 8.4rem;
  right: 4.4rem;
  z-index: 1;
  ${media.small} {
    top: 5.4rem;
    right: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.7rem;
  width: 32rem;
  background-color: #23262f;
  border-radius: 2rem;
  padding: 3.2rem 2.4rem;
  z-index: 2;
  ${media.small} {
    width: 20rem;
    gap: 1.2rem;
  }
`;

const AvatarComponent = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  ${media.small} {
    width: 4rem;
    height: 4rem;
  }
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
  ${media.small} {
    padding-bottom: 1rem;
  }
`;

const Nickname = styled.span`
  color: #f9fafb;
  font-size: 2.4rem;
  font-family: IBMPlexSansKRRegular;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.small} {
    font-size: 1.6rem;
  }
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.small} {
    font-size: 1.2rem;
    height: 4rem;
  }
`;
