import React from 'react';
import styled from 'styled-components';
import SingleParticipant from './SingleParticipant';
import connectedUsersStore from '../../../stores/room/connectedUsersStore';
import UserStore from '../../../stores/userStore';
import userMediaStreamStore from '../../../stores/room/userMediaStreamStore';

export default function Participants({ moderator }: { moderator: number }) {
  const { connectedUsers } = connectedUsersStore();
  const { uid, nickname, avatar } = UserStore();
  const { userMediaStream } = userMediaStreamStore();
  const getAudioTrack = (stream: MediaStream) => {
    return stream?.getAudioTracks().length > 0;
  };
  const me = {
    nickname,
    uid,
    avatar,
    sid: '',
    enabledVideo: true,
    enabledAudio: getAudioTrack(userMediaStream)
      ? userMediaStream.getAudioTracks()[0].enabled
      : false,
    isAlreadyEntered: true,
    volume: 0.5,
  };
  return (
    <Component>
      <Title>참여자 목록</Title>
      <UserList>
        <SingleParticipant isMe moderator={moderator} user={me} />
        {connectedUsers.map((user) => (
          <SingleParticipant
            key={user.uid}
            isMe={false}
            moderator={moderator}
            user={user}
          />
        ))}
      </UserList>
    </Component>
  );
}

const Component = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  border-bottom: 1px solid rgba(55, 65, 81, 1);
  padding-bottom: 2.2rem;
  color: #9ca3af;
  max-height: 12.8rem;
  /* flex-shrink: 1; */
`;

const Title = styled.div``;

const UserList = styled.div`
  margin-top: 0.8rem;
  margin-right: 1.9rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 3.3rem;
`;
