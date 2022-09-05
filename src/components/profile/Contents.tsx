import styled from 'styled-components';
import UserProfile from './UserProfile';
import Friends from './Friends';
import Statistics from './Statistics';
import Overall from './Overall';

export default function Contents({ isMe }: { isMe: boolean }) {
  return (
    <Container>
      <UserInformation>
        <UserProfile isMe={isMe} />
        <Statistics />
        <Overall />
      </UserInformation>
      {isMe && <Friends />}
    </Container>
  );
}

const Container = styled.div`
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
