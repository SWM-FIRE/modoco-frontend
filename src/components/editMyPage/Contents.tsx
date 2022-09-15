import styled from 'styled-components';
import EditUserProfile from './EditUserProfile';
import Friends from '../profile/Friends';
import Statistics from '../profile/Statistics';
import Overall from '../profile/Overall';

export default function Contents() {
  const isMe = true;
  const isModal = false;
  return (
    <Container>
      <UserInformation>
        <EditUserProfile />
        <Friends isModal={isModal} />
      </UserInformation>
      <Statistics isMe={isMe} />
      <Overall isMe={isMe} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4.5rem;
  padding: 4.4rem 10rem;
  width: 100%;
`;

const UserInformation = styled.div`
  width: 100%;
  position: relative;
  @media (max-width: 1020px) {
    display: flex;
    flex-direction: column;
  }
  min-width: 55rem;
`;
