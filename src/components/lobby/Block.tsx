import styled from 'styled-components';
import blockInterface from '../../interface/block.interface';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Block({
  nickname,
  avatar,
  title,
  detail,
  tags,
}: blockInterface) {
  console.log(detail);
  return (
    <Container>
      <AvatarContainer>
        <MyAvatar num={avatar} />
        <Nickname>{nickname}</Nickname>
      </AvatarContainer>
      <DetailContainer>
        <Title>{title}</Title>
        <Detail>{detail}</Detail>
        <Tags>
          {tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </Tags>
      </DetailContainer>
      <Enter>입장하기 →</Enter>
    </Container>
  );
}

const Tags = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Enter = styled.div`
  position: absolute;
  bottom: 6.4rem;
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
  position: relative;
  margin-top: 3.2rem;
  width: 29.3rem;
  height: 14.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Detail = styled.div`
  margin-top: 1.6rem;
  color: #777e90;
  font-size: 1.4rem;
`;

const AvatarContainer = styled.div`
  margin-top: 6.4rem;
  width: 8rem;
  height: 11.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
`;

const Nickname = styled.div`
  color: white;
  text-align: center;
  margin-top: 0.8rem;
  font-size: 1.2rem;
  font-family: IBMPlexMonoRegular;
`;

const Container = styled.div`
  background-color: #23262f;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: 34rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
