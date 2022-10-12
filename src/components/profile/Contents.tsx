import { useState } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import UserProfile from './UserProfile/UserProfile';
import Friends from './Friends';
import Statistics from './Statistics';
import Overall from './Overall';
import roomModalStore from '../../stores/room/roomModalStore';
import EditUserProfile from './EditUserProfile/EditUserProfile';

export default function Contents({ isMe }: { isMe: boolean }) {
  const { profileModal } = roomModalStore();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Container isMe={isMe}>
      <UserInformation isModal={profileModal}>
        {isEdit && isMe ? (
          <EditUserProfile setIsEdit={setIsEdit} />
        ) : (
          <UserProfile isMe={isMe} setIsEdit={setIsEdit} />
        )}
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
  width: 100%;
  ${media.small} {
    padding: 4.4rem 2rem;
  }
`;

const UserInformation = styled.div<{ isModal: boolean }>`
  width: 100%;
  position: relative;
  @media (max-width: ${(props) => (props.isModal ? '1700px ' : '1020px')}) {
    display: flex;
    flex-direction: column;
  }
`;
