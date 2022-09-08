import styled from 'styled-components';
import UserProfile from './UserProfile';
import Friends from './Friends';
import Statistics from './Statistics';
import Overall from './Overall';
import roomModalStore from '../../stores/room/roomModalStore';

export default function Contents({ isMe }: { isMe: boolean }) {
  const { profileModal } = roomModalStore();
  return (
    <Container isMe={isMe}>
      <UserInformation isModal={profileModal}>
        <UserProfile isMe={isMe} />
        {isMe && <Friends isModal={profileModal} />}
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

const UserInformation = styled.div<{ isModal: boolean }>`
  width: 100%;
  position: relative;
  @media (max-width: ${(props) => (props.isModal ? '1700px ' : '1020px')}) {
    display: flex;
    flex-direction: column;
  }
  min-width: 55rem;
`;
