import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserStore from '../../stores/userStore';
import blockInterface from '../../interface/block.interface';
import MyAvatar from '../../assets/avatar/MyAvatar';
import ThemeImage from '../atoms/ThemeImages';
import { ReactComponent as Bar } from '../../assets/svg/Room/Bar.svg';
import useRoom from '../../hooks/useRoom';

export default function Block({
  isMain,
  itemId,
  moderator,
  title,
  details,
  tags,
  current,
  total,
  theme,
}: blockInterface) {
  const navigate = useNavigate();
  const { nickname } = UserStore();
  const { data } = useRoom(itemId);

  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!nickname) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (data.current === data.total) {
      alert('방이 이미 초과되었습니다.');
      return;
    }

    navigate(`/ready/${itemId}`);
  };
  return (
    <Container main={isMain}>
      <AvatarContainer>
        <MyAvatar num={Number(moderator.avatar)} />
        <Moderator>
          방장<Nickname>{moderator.nickname}</Nickname>
        </Moderator>
      </AvatarContainer>
      <DetailContainer>
        <Title>{title}</Title>
        <Description>{details}</Description>
        <Tags>
          {tags.map((myTag) => (
            <Tag key={myTag}>#{myTag}</Tag>
          ))}
        </Tags>
        <Detail>
          <ThemeImage theme={theme} />
          <Bar />
          <Attend>
            <div style={{ marginTop: '-0.3rem' }}>🔥</div>
            <div>{total}중</div>
            <div>{current}명</div>
            <div>참여중</div>
          </Attend>
        </Detail>
      </DetailContainer>
      <Enter onClick={enterRoom}>입장하기 →</Enter>
    </Container>
  );
}

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
`;

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  font-size: 1.6rem;
  font-family: SFProDisplayRegular;
  color: #fcfcfd;
  border: solid 0.2rem #777e90;
  border-radius: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  gap: 1.6rem;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
`;

const Moderator = styled.span`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  font-family: IBMPlexMonoRegular;
`;

const Nickname = styled.span`
  color: white;
  text-align: center;
`;

const Detail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  height: 2rem;
  font-size: 1.4rem;
  font-family: IBMPlexMonoRegular;
`;

const Attend = styled.div`
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.3rem;
`;

const Container = styled.div<{ main: boolean }>`
  background-color: #23262f;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: ${(props) => (props.main ? '22.5%' : '22.5rem')};
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;
  min-width: 29.4rem;
`;
