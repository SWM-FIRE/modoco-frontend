import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import SettingModal from '../components/ready/modal/SettingModal';
import Header from '../components/ready/Header';
import RoomDetail from '../components/ready/RoomDetail';
import Screen from '../components/ready/Screen';
import userStore from '../stores/userStore';
import roomSocket, { generateSocket } from '../adapters/roomSocket';

export default function ReadyPage() {
  const { createAll } = useCreateMediaStream();
  const { uid } = userStore();
  const { userMediaStream } = UserMediaStreamStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (uid && localStorage.getItem('access_token') && !userMediaStream) {
      createAll();
    } else {
      navigate('/');
      window.location.reload();
    }
    if (!roomSocket.socket) {
      generateSocket();
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userMediaStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <>
      {isSetting ? (
        <SettingModal setSetting={setIsSetting} stream={userMediaStream} />
      ) : null}
      <Container>
        <Header />
        <Main>
          <Screen videoRef={videoRef} setSetting={setIsSetting} />
          <RoomDetail roomNo={roomId} />
        </Main>
      </Container>
    </>
  );
}

const Main = styled.div`
  display: flex;
  width: 106rem;
  height: 56.8rem;
  margin-top: 1rem;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: #18181b;
  height: 100vh;
`;
