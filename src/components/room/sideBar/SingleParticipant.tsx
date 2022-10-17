import React, { useState } from 'react';
import styled from 'styled-components';
import SideProfileModal from '../sideProfileModal/SideProfileModal';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import { ReactComponent as MicOn } from '../../../assets/svg/SmallMicOn.svg';
import { ReactComponent as MicOff } from '../../../assets/svg/SmallMicOff.svg';
import { ReactComponent as Crown } from '../../../assets/svg/Crown.svg';
import VideoUserInterface from '../../../interface/VideoUser.interface';

export default function SingleParticipant({
  isMe,
  moderator,
  user,
}: {
  isMe: boolean;
  moderator: number;
  user: VideoUserInterface;
}) {
  const [showSideProfile, setShowSideProfile] = useState<boolean>(false);

  const toggleProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowSideProfile(!showSideProfile);
  };

  return (
    <>
      {showSideProfile ? (
        <SideProfileModal
          toggle={setShowSideProfile}
          isMe={isMe}
          user={user}
          moderator={moderator}
        />
      ) : null}
      <Container>
        <AvatarContainer onClick={toggleProfile}>
          <MyAvatar num={user.avatar} />
          <MicContainer>
            {user.enabledAudio ? <MicOn /> : <MicOff />}
          </MicContainer>
        </AvatarContainer>
        <NameContainer isMe={isMe} nicknameLength={user.nickname?.length}>
          {user.nickname}
          {moderator === user.uid && <Crown />}
        </NameContainer>
      </Container>
    </>
  );
}

const AvatarContainer = styled.div`
  position: relative;
  width: 4.3rem;
  height: 4.3rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const MicContainer = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 100%;
  background-color: #1f2937;
  position: absolute;
  bottom: -0.3rem;
  right: -1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  &:hover {
    // underline font
    text-decoration: underline;
  }
`;

// const CrownContainer = styled.div``;

const NameContainer = styled.div<{ nicknameLength: number; isMe: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  word-break: break-all;
  font-size: 1.6rem;
  font-size: calc(
    1.6rem -
      ${(props) =>
        props.nicknameLength < 4 ? 0 : props.nicknameLength * 0.05}rem
  );
  color: ${(props) => (props.isMe ? '#A7F3D0' : '#f9fafb')};
`;
