import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileModal from './ProfileModal';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import { ReactComponent as MicOn } from '../../../assets/svg/SmallMicOn.svg';
import { ReactComponent as MicOff } from '../../../assets/svg/SmallMicOff.svg';

export default function SingleParticipant({
  isMe,
  nickname,
  avatar,
  isAudioEnabled,
}: {
  isMe: boolean;
  nickname: string;
  avatar: string;
  isAudioEnabled: boolean;
}) {
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const toggleProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowProfile(!showProfile);
  };

  return (
    <Container>
      <AvatarContainer onClick={toggleProfile}>
        <MyAvatar num={Number(avatar)} />
        <MicContainer>{isAudioEnabled ? <MicOn /> : <MicOff />}</MicContainer>
      </AvatarContainer>
      <NameContainer isMe={isMe} nicknameLength={nickname.length}>
        {nickname}
      </NameContainer>
      {showProfile ? (
        <ProfileModal
          toggle={setShowProfile}
          nickname={nickname}
          avatar={avatar}
        />
      ) : null}
    </Container>
  );
}

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
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
  width: 4.3rem;
  svg {
    width: 100%;
    height: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
`;

const NameContainer = styled.div<{ nicknameLength: number; isMe: boolean }>`
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
