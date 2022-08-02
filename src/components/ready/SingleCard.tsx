import styled from 'styled-components';
import useRoom from '../../hooks/useRoom';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function SingleCard({ room }) {
  const { isLoading, error, data } = useRoom(room);
  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;
  return (
    <Container>
      <Header>
        <AvatarControl>
          <MyAvatar num={Number(data.moderator.avatar)} />
        </AvatarControl>
        <NameTag>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            방장
          </p>
          <p style={{ color: '#FCFCFD' }}>{data.moderator.nickname}</p>
        </NameTag>
      </Header>
      <Detail>
        <Title>
          <p
            style={{ fontWeight: '600', fontSize: '2.4rem', color: '#FCFCFD' }}
          >
            {data.title}
          </p>
          <p
            style={{ fontWeight: '400', fontSize: '1.4rem', color: '#777E91' }}
          >
            {data.details}
          </p>
        </Title>
        <Tags>
          {data.tags.map((myTag) => (
            <Tag key={myTag}>#{myTag}</Tag>
          ))}
        </Tags>
      </Detail>
    </Container>
  );
}

const Tags = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
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

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-family: IBMPlexSansKRRegular;
`;

const Detail = styled.div`
  margin-top: 4rem;
`;

const NameTag = styled.div`
  font-family: IBMPlexMonoRegular;
  font-size: 1.2rem;
  display: flex;
  gap: 0.2rem;
`;

const AvatarControl = styled.div`
  width: 4.4rem;
  svg {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  height: 4.4rem;
`;

const Container = styled.div`
  height: 33.6rem;
  width: 100%;
  padding: 3.2rem 2rem;
`;
