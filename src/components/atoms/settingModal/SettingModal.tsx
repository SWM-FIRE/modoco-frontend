import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import audioFrequency from './audioFrequency';
import Selectors from './Selectors';
import VolumeBar from './VolumeBar';
import UserMediaStreamStore from '../../../stores/room/userMediaStreamStore';
import { useCreateMediaStream } from '../../../hooks/useCreateMediaStream';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import audioContext from '../audioContext';

export default function SettingModal({
  setting,
  toggle,
}: {
  setting: boolean;
  toggle: () => void;
}) {
  const { userMediaStream, userAudioInputDevice } = UserMediaStreamStore();
  const { replaceAudioStream } = useCreateMediaStream();
  const [vol, setVol] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    replaceAudioStream();
  }, [replaceAudioStream, userAudioInputDevice]);

  const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggle();
  };
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle();
  };

  useEffect(() => {
    let myInterval;
    const { analyser, bufferLength, dataArray } = audioContext(userMediaStream);
    if (setting) {
      myInterval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const vol = audioFrequency(dataArray, bufferLength);
        setVol(Math.floor((vol / 256) * 100));
      }, 30);
    }
    return () => clearInterval(myInterval);
  }, [setting]);

  useEffect(() => {
    videoRef.current.srcObject = userMediaStream;
  }, [videoRef, userMediaStream]);

  return (
    <Container onClick={closeModalBackground}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>
          기기설정
          <ExitButton onClick={closeModal}>
            <X />
          </ExitButton>
        </ModalTitle>
        <Main>
          <MyScreen>
            <Screen ref={videoRef} autoPlay playsInline muted />
            <VolumeBar volume={vol} />
          </MyScreen>
          <Selectors />
        </Main>
      </ModalBox>
    </Container>
  );
}

const MyScreen = styled.div`
  position: relative;
  width: 56.8rem;
  height: 36.8rem;
  @media (max-width: 1200px) {
    width: 41.9rem;
    height: 27.3rem;
  }
  border-radius: 0.5rem;
`;

const Screen = styled.video`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Main = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ExitButton = styled.button`
  cursor: pointer;
`;

const ModalTitle = styled.div`
  display: flex;
  color: #f9fafb;
  font-size: 2rem;
  line-height: 3rem;
  font-family: IBMPlexSansKRRegular;
  align-items: center;
  justify-content: space-between;
`;

const ModalBox = styled.div`
  width: calc(80rem + 10%);
  height: 52.8rem;
  @media (max-width: 1200px) {
    width: 90%;
    height: 81.6rem;
  }
  padding: 4.6rem 4rem 5.3rem 4rem;
  border-radius: 2rem;
  background-color: #23262f;
`;

const Container = styled.div`
  position: fixed;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(14, 14, 14, 0.8);
`;
