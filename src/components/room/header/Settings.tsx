import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MicOff } from '../../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../../assets/svg/MonitorOff.svg';
import { ReactComponent as VideoOff } from '../../../assets/svg/VideoOff.svg';
import UserMediaStreamStore from '../../../stores/userMediaStreamStore';
import { useCreateMediaStream } from '../../../hooks/useCreateMediaStream';

export default function Settings() {
  const { userMic, userVideo } = UserMediaStreamStore();
  const { createDisplayStream, stopDisplayStream, toggleMic } =
    useCreateMediaStream();

  const setMic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleMic();
  };

  const setMediaStream = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (userVideo) {
      console.log('removing display');
      stopDisplayStream();
    } else {
      createDisplayStream();
    }
  };
  const setVideo = () => {
    console.log('setVideo');
  };
  return (
    <Component>
      <Button onClick={setMediaStream}>
        {userVideo ? <MonitorOn /> : <MonitorOff />}
      </Button>
      <Button onClick={setMic}>{userMic ? <MicOn /> : <MicOff />}</Button>
      <Button onClick={setVideo}>
        <VideoOff />
      </Button>
    </Component>
  );
}

const Component = styled.div`
  margin-left: 2.4rem;
  display: flex;
  gap: 2.4rem;
`;

const Button = styled.button`
  cursor: pointer;
`;
