import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MyAvatar from '../../assets/avatar/MyAvatar';
import UserStore from '../../stores/userStore';

export default function HeaderProfileModal({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const navigate = useNavigate();

  const { nickname, avatar, uid, setClear } = UserStore();
  const onLogOut = () => {
    localStorage.removeItem('access_token');
    toggleModal();
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  const onProfile = () => {
    navigate(`/profile/${uid}`);
    toggleModal();
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
        <Button onClick={onLogOut}>로그아웃</Button>
      </Container>
    </ModalPosition>
  );
}

const ModalPosition = styled.div`
  position: absolute;
  top: 8.4rem;
  right: 4.4rem;
  overflow: hidden;
  z-index: 1;
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
  @keyframes dropdown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  animation: dropdown 400ms ease-in-out forwards;
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
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
