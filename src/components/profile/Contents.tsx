import { useState } from 'react';
import styled from 'styled-components';
import userStore from 'src/stores/userStore';
import media from 'src/styles/media';
import UserProfile from './userProfile/UserProfile';
import Friends from './Friends';
// import Statistics from './Statistics';
// import Overall from './Overall';
import roomModalStore from '../../stores/room/roomModalStore';
import EditUserProfile from './editUserProfile/EditUserProfile';

export default function Contents({
  userId,
  isModal,
}: {
  userId: number;
  isModal: boolean;
}) {
  const { profileModal } = roomModalStore();
  const [isEdit, setIsEdit] = useState(false);
  const { uid } = userStore();
  const isMe = userId === uid;

  return (
    <Container isMe={isMe} isModal={isModal}>
      <UserInformation isModal={profileModal}>
        {isEdit && isMe ? (
          <EditUserProfile setIsEdit={setIsEdit} isModal={isModal} />
        ) : (
          <UserProfile
            userId={userId}
            isMe={isMe}
            setIsEdit={setIsEdit}
            isModal={isModal}
          />
        )}
        {isMe && <Friends isModal={profileModal} />}
      </UserInformation>
      {/* <Statistics isMe={isMe} />
      <Overall isMe={isMe} /> */}
    </Container>
  );
}

const Container = styled.div<{ isMe: boolean; isModal: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4.5rem;
  padding: 4.4rem 10rem;
  width: 100%;
  ${media.large} {
    padding: ${(props) => (props.isModal ? '4.4rem 5rem' : '4.4rem 10rem')};
  }
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
