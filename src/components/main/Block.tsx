import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import media from 'src/styles/media';
import UserStore from '../../stores/userStore';
import MyAvatar from '../../assets/avatar/MyAvatar';
import RoomDetail from '../atoms/RoomDetail';

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
      </AvatarContainer>
      <Moderator>
        방장<Nickname>{data.moderator.nickname}</Nickname>
      </Moderator>
      <DetailContainer data-cy="main-room-detail">
        <TitleContainer>
          <Title>{data.title}</Title>
        </TitleContainer>
        <DescriptionContainer>
          <Description>{data.details}</Description>
        </DescriptionContainer>
        <Tags>
          {data.tags.map((myTag) => (
            <Tag key={Symbol(myTag).toString()}>#{myTag}</Tag>
          ))}
        </Tags>
        <PositionRoom>
          <RoomDetail data={data} />
        </PositionRoom>
      </DetailContainer>
      <Enter onClick={enterRoom} data-cy="main-room-enter">
        입장하기 →
      </Enter>
    </Container>
  );
}

const PositionRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.small} {
    display: none;
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

const Tag = styled.div`
  padding: 0 1rem;
  height: 3.1rem;
  color: #45b26b;
  background-color: rgba(69, 178, 107, 0.1);
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.small} {
    padding: 0 0.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;

const DetailContainer = styled.div`
  height: 18.8rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.small} {
    display: none;
  }
`;

const Description = styled.div`
  color: #777e90;
  font-size: 1.4rem;
`;

const AvatarContainer = styled.div`
  width: 8rem;
  height: 11.4rem;
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
  ${media.small} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 1rem;
    font-size: 1.8rem;
  }
`;

const Moderator = styled.span`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  font-family: IBMPlexMonoRegular;
  width: 100%;
  justify-content: center;
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
  }
`;
