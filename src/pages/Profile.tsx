import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../components/main/Header';
import UserProfile from '../components/profile/UserProfile';
import Friends from '../components/profile/Friends';
import Statistics from '../components/profile/Statistics';
import Overall from '../components/profile/Overall';
import userStore from '../stores/userStore';

export default function Profile() {
  const { userId } = useParams();
  const { uid } = userStore((state) => state);

  const isMe = Number(userId) === uid;

  return (
    <Container>
      <Header />
      <Contents>
        <UserInformation>
          <UserProfile isMe={isMe} />
          <Statistics />
          <Overall />
        </UserInformation>
        {isMe && <Friends />}
      </Contents>
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

const Contents = styled.div`
  display: flex;
  gap: 4.5rem;
  padding: 4.4rem 10rem;
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  align-items: center;
  /* @media (max-width: 96rem) {
    flex-direction: column;
    padding: 0 4rem;
  } */
`;
