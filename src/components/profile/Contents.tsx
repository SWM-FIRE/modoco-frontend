import styled from 'styled-components';
import UserProfile from './UserProfile';
import Friends from './Friends';
import Statistics from './Statistics';
import Overall from './Overall';

export default function Contents({ isMe }: { isMe: boolean }) {
  return (
    <Container isMe={isMe}>
      <UserInformation>
        <UserProfile isMe={isMe} />
        {isMe && <Friends />}
      </UserInformation>
      <Statistics isMe={isMe} />
      <Overall isMe={isMe} />
    </Container>
  );
}

const Container = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4.5rem;
  padding: 4.4rem 10rem;
  width: ${(props) => (props.isMe ? '100%' : '80%')};
`;

const UserInformation = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 102rem) {
    display: flex;
    flex-direction: column;
  }
`;
