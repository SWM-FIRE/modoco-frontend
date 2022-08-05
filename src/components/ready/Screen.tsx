import React from 'react';
import styled from 'styled-components';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import userMediaStreamStore from '../../stores/userMediaStreamStore';
import { ReactComponent as MicOff } from '../../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../../assets/svg/MonitorOff.svg';

export default function Screen({ video: videoRef }) {
  const { userMediaStream, userMic, setUserMic } = userMediaStreamStore();
  const { stopMediaStream, createMediaStream } = useCreateMediaStream();

  const setMic = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUserMic();
  };

  const setMediaStream = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (userMediaStream) {
      stopMediaStream();
    } else {
      createMediaStream();
    }
  };
  return (
    <Container>
      <MyScreen ref={videoRef} autoPlay playsInline muted />
      <Buttons>
        <Button onClick={setMediaStream}>
          {userMediaStream ? <MonitorOn /> : <MonitorOff />}
        </Button>
        <Button onClick={setMic}>{userMic ? <MicOn /> : <MicOff />}</Button>
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
  width: 100%;
  height: 40.4rem;
`;
