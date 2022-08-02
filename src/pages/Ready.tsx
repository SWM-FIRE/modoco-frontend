import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as MicOff } from '../assets/svg/MicOff.svg';
import { ReactComponent as MicOn } from '../assets/svg/MicOn.svg';
import { ReactComponent as MonitorOn } from '../assets/svg/MonitorOn.svg';
import { ReactComponent as MonitorOff } from '../assets/svg/MonitorOff.svg';
import { useCreateMediaStream } from '../hooks/useCreateMediaStream';
import { ReactComponent as LeftArrow } from '../assets/svg/arrow-left.svg';
import UserMediaStreamStore from '../stores/userMediaStreamStore';
import SingleCard from '../components/ready/SingleCard';

export default function ReadyPage() {
  const navigate = useNavigate();
  const { userMic, setUserMic, userMediaStream } = UserMediaStreamStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { stopMediaStream, createMediaStream } = useCreateMediaStream();
  const { roomId } = useParams();

  useEffect(() => {
    createMediaStream();
  }, []);

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
  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userMediaStream;
    }
  }, [videoRef, userMediaStream]);

  return (
    <Container>
      <Header>
        <LeftArrowPosition>
          <LeftArrow />
        </LeftArrowPosition>
      </Header>
      <Message>코딩방 입장 전 화면과 오디오 상태를 체크하는 곳입니다</Message>
      <Main>
        <Screen>
          <MyScreen ref={videoRef} autoPlay playsInline muted />
          <Buttons>
            <Button onClick={setMediaStream}>
              {userMediaStream ? <MonitorOn /> : <MonitorOff />}
            </Button>
            <Button onClick={setMic}>{userMic ? <MicOn /> : <MicOff />}</Button>
          </Buttons>
        </Screen>
        <RoomDetail>
          <SingleCard room={roomId} />
          <EnterButton onClick={enterRoom}>입장하기 →</EnterButton>
        </RoomDetail>
      </Main>
    </Container>
  );
}

const EnterButton = styled.button`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 5rem;
  width: 100%;
  height: 5.5rem;
  cursor: pointer;
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

const Message = styled.div`
  font-family: IBMPlexSansKRRegular;
  color: #9ca3af;
  font-weight: 400;
  font-size: 2rem;
`;

const Screen = styled.div`
  width: 62.4rem;
  height: 100%;
`;

const RoomDetail = styled.div`
  width: 40.6rem;
  height: 42.7rem;
`;

const Main = styled.div`
  display: flex;
  width: 106rem;
  height: 56.8rem;
  margin-top: 1rem;
  justify-content: space-between;
`;

const LeftArrowPosition = styled.div`
  position: absolute;
  left: 8rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: #18181b;
  height: 100vh;
`;
