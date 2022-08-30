import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Selectors from './Selectors';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function SettingModal({
  setSetting,
  stream,
}: {
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  stream: MediaStream;
}) {
  const closeModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSetting(false);
  };
  const closeModalBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setSetting(false);
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

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
          <Screen ref={videoRef} autoPlay playsInline muted />
          <Selectors />
        </Main>
      </ModalBox>
    </Container>
  );
}

const Screen = styled.video`
  width: 56.8rem;
  height: 36.8rem;
  @media (max-width: 1080px) {
    width: 41.9rem;
    height: 27.3rem;
  }
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Main = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1080px) {
    flex-direction: column;
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
  @media (max-width: 1080px) {
    width: 90%;
    height: 81.6rem;
  }
  padding: 4.6rem 4rem 5.3rem 4rem;
  border-radius: 2rem;
  background-color: #23262f;
`;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(14, 14, 14, 0.8);
`;
