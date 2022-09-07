import React from 'react';
import styled from 'styled-components';
import ProfileModalHeader from './SideProfileModalHeader';
import UserInfo from './UserInfo';
import Buttons from './Buttons';
import FriendButtons from './FriendButtons';

export default function SideProfileModal({
  toggle,
  nickname,
  avatar,
  isMe,
  isFriend,
  moderator,
  uid,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  avatar: number;
  isMe: boolean;
  isFriend: boolean;
  moderator: number;
  uid: number;
}) {
  const toggleModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle(false);
  };

  return (
    <>
      <Screen onClick={toggleModal} />
      <Container>
        <Inner>
          <ProfileModalHeader profileToggle={toggle} />
          <Body>
            <UserInfo
              avatarNo={avatar}
              nickname={nickname}
              toggle={toggle}
              uid={uid}
            />
            {isFriend ? (
              <FriendButtons />
            ) : (
              <Buttons isMe={isMe} moderator={moderator} uid={uid} />
            )}
          </Body>
        </Inner>
      </Container>
    </>
  );
}

const Screen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
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
  top: 8rem;
  left: -30rem;
  z-index: 1;
  padding: 2rem 2.4rem 3.2rem 2.4rem;
  border-radius: 2rem;
`;
