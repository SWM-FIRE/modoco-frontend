import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { ReactComponent as MicOff } from '../../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../../assets/svg/MonitorOff.svg';
import { ReactComponent as VideoOff } from '../../../assets/svg/VideoOff.svg';
import UserMediaStreamStore from '../../../stores/userMediaStreamStore';
import { useCreateMediaStream } from '../../../hooks/useCreateMediaStream';

export default function Settings() {
  const { roomId } = useParams();
  const { userMic, userVideo } = UserMediaStreamStore((state) => state);
  const { createDisplayStream, stopDisplayStream, emitAudioStateChange } =
    useCreateMediaStream();

  const setMic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    emitAudioStateChange(roomId, !userMic);
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
    toast.error('준비중입니닷!');
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
