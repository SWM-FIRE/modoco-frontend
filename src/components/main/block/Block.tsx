import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import media from 'src/styles/media';
import UserStore from '../../../stores/userStore';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import RoomDetail from '../../atoms/RoomDetail';
import BlockDetail from './BlockDetail';

export default function Block({ isMain, data }) {
  const navigate = useNavigate();
  const { nickname } = UserStore();

  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!nickname) {
      toast.error('로그인이 필요합니다');
      return;
    }
    if (data.current === data.total) {
      toast.error('방이 이미 가득 찼습니다');
      return;
    }

    navigate(`/ready/${data.itemId}`);
  };
  return (
    <Container main={isMain} data-cy="main-room-cards">
      <AvatarContainer data-cy="main-room-moderator">
        <MyAvatar num={Number(data.moderator.avatar)} />
        <Moderator>
          방장<Nickname>{data.moderator.nickname}</Nickname>
        </Moderator>
      </AvatarContainer>
      <BlockDetail data={data} />
      <Entering>
        <RoomDetail data={data} />
        <Enter onClick={enterRoom} data-cy="main-room-enter">
          입장하기 →
        </Enter>
      </Entering>
    </Container>
  );
}

const Entering = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  ${media.small} {
    gap: 0.5rem;
  }
`;

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  min-height: 4rem;
  font-size: 1.6rem;
  font-family: SFProDisplayRegular;
  color: #fcfcfd;
  border: solid 0.2rem #777e90;
  border-radius: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${media.small} {
    width: 8.6rem;
    height: 3.2rem;
    font-size: 1.2rem;
    margin: 1rem 0rem;
  }
`;

const AvatarContainer = styled.div`
  width: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${media.small} {
    height: 5.4rem;
    margin-bottom: 1.6rem;
  }
`;

const Moderator = styled.span`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  margin-top: 2rem;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  font-family: IBMPlexMonoRegular;
  width: 100%;
  justify-content: center;
  ${media.small} {
    font-size: 1rem;
    margin-top: 1rem;
  }
`;

const Nickname = styled.span`
  color: white;
  text-align: center;
`;

const Container = styled.div<{ main: boolean }>`
  background-color: #23262f;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: ${(props) => (props.main ? '20%' : '22.5rem')};
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;
  min-width: 29.4rem;
  ${media.small} {
    padding: 2.3rem 0.5rem;
    height: 26rem;
    min-width: 14rem;
    width: 14rem;
    margin-right: ${(props) => (props.main ? '0rem' : '1rem')};
  }
`;