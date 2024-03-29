import React, { Dispatch, RefObject, SetStateAction } from 'react';
import styled from 'styled-components';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import Settings from './Setting';
import userMediaStreamStore from '../../stores/room/userMediaStreamStore';
import { ReactComponent as MicOff } from '../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../assets/svg/MonitorOff.svg';

export default function Screen({
  videoRef,
  setSetting,
}: {
  videoRef: RefObject<HTMLVideoElement>;
  setSetting: Dispatch<SetStateAction<boolean>>;
}) {
  const { userMic, userVideo } = userMediaStreamStore();
  const { stopDisplayStream, createDisplayStream, toggleAudioStream } =
    useCreateMediaStream();

  const setMic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleAudioStream(!userMic);
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

  return (
    <Container>
      <Settings setSetting={setSetting} />
      <MyScreen
        ref={videoRef}
        autoPlay
        playsInline
        muted
        data-cy="ready-screen"
      />
      <Buttons>
        <Button onClick={setMediaStream} data-cy="ready-screen-button">
          {userVideo ? <MonitorOn /> : <MonitorOff />}
        </Button>
        <Button onClick={setMic} data-cy="ready-mic-button">
          {userMic ? <MicOn /> : <MicOff />}
        </Button>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  width: 62.4rem;
  height: 100%;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const Button = styled.button`
  cursor: pointer;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 5rem;
  border: 0.15rem solid rgba(255, 255, 255, 0.4);
`;

const MyScreen = styled.video`
  margin-top: 2.5rem;
  width: 100%;
  height: 40.4rem;
  border-radius: 0.5rem;
`;
