import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../components/main/Header';
import Contents from '../components/profile/Contents';
import userStore from '../stores/userStore';

export default function Profile() {
  const { userId } = useParams();
  const { uid } = userStore((state) => state);

  const isMe = Number(userId) === uid;

  return (
    <Container>
      <Header />
      <Contents isMe={isMe} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
