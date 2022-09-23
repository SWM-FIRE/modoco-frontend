import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import UserMediaStreamStore from '../stores/room/userMediaStreamStore';
import SettingModal from '../components/atoms/settingModal/SettingModal';
import Header from '../components/ready/Header';
import RoomDetail from '../components/ready/RoomDetail';
import Screen from '../components/ready/Screen';
import roomSocket, { generateSocket } from '../adapters/roomSocket';
import useSetSelf from '../hooks/useSetSelf';

export default function ReadyPage() {
  const { createAll } = useCreateMediaStream();
  const { userMediaStream } = UserMediaStreamStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('invitedId')) {
      localStorage.removeItem('invitedId');
    }
    if (localStorage.getItem('access_token') && !userMediaStream) {
      createAll();
    } else {
      navigate('/');
      window.location.reload();
    }
    if (!roomSocket.socket) {
      generateSocket();
    }
  }, []);

  useSetSelf();

  const toggleSetting = () => {
    setIsSetting(!isSetting);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userMediaStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <>
      {isSetting ? (
        <SettingModal setting={isSetting} toggle={toggleSetting} />
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
