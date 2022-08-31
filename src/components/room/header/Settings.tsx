import React from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { ReactComponent as MicOff } from '../../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../../assets/svg/MonitorOff.svg';
import { ReactComponent as VideoOff } from '../../../assets/svg/VideoOff.svg';
import { ReactComponent as Setting } from '../../../assets/svg/settings.svg';
import UserMediaStreamStore from '../../../stores/userMediaStreamStore';
import { useCreateMediaStream } from '../../../hooks/useCreateMediaStream';

export default function Settings({
  setSetting,
}: {
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      stopDisplayStream();
    } else {
      createDisplayStream();
    }
  };
  const setVideo = () => {
    toast.error('준비중입니닷!');
  };

  const toggleSetting = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSetting(true);
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
      <Button onClick={toggleSetting}>
        <Setting />
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
