import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useSingleFriend from 'src/hooks/friend/useSingleFriend';
import userStore from 'src/stores/userStore';
import useKickUser from './useKickUser';
import ProfileModalHeader from './SideProfileModalHeader';
import UserInfo from './UserInfo';
import Buttons from './Buttons';
import FriendButtons from './FriendButtons';
import ControlVolume from './ControlVolume';
import VideoUserInterface from '../../../interface/VideoUser.interface';

export default function SideProfileModal({
  toggle,
  isMe,
  user,
  moderator,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  isMe: boolean;
  user: VideoUserInterface;
  moderator: number;
}) {
  const { roomId } = useParams();
  const { kickUser } = useKickUser({
    roomId,
    targetUid: user?.uid,
  });
  const { uid: myUID } = userStore();
  const isModerator = moderator === myUID;

  const toggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle(false);
  };

  const { isLoading, error, data } = useSingleFriend(user?.uid);
  if (isLoading) return <>loading</>;
  if (error) return <>error</>;

  const isFriend = !(
    Object.keys(data).length === 0 && data.constructor === Object
  );

  return (
    <>
      <Screen onClick={toggleModal} />
      <Container>
        <Inner>
          <ProfileModalHeader profileToggle={toggle} />
          <Body>
            <UserInfo
              avatarNo={user?.avatar}
              nickname={user?.nickname}
              toggle={toggle}
              uid={user?.uid}
            />
            {!isMe && <ControlVolume user={user} />}
            {isFriend ? (
              <FriendButtons data={data} toggle={toggle} />
            ) : (
              <Buttons isMe={isMe} toggle={toggle} uid={user.uid} />
            )}
            {!isMe && isModerator && <Kick onClick={kickUser}>내보내기</Kick>}
          </Body>
        </Inner>
      </Container>
    </>
  );
}

const Screen = styled.div`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1;
`;

const Body = styled.div`
  display: flex;
  height: calc(100% - 2.4rem);
  flex-direction: column;
  justify-content: space-between;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  width: 32rem;
  background-color: #23262f;
  top: 20rem;

  z-index: 2;
  padding: 2rem 2.4rem 3.2rem 2.4rem;
  border-radius: 2rem;
  box-shadow: 0px 4px 103px rgba(50, 50, 71, 0.4);
`;

const Kick = styled.button`
  margin-top: 1.2rem;
  width: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid #fb7185;
  color: #fb7185;
`;
