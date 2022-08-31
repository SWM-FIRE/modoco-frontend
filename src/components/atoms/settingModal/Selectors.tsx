import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Selector from './Selector';
import getDevice from './getDevice';

export default function Selectors() {
  const [audioInput, setAudioInput] = useState<MediaDeviceInfo[] | null>([]);
  const [audioOutput, setAudioOutput] = useState<MediaDeviceInfo[] | null>([]);
  const [videoInput, setVideoInput] = useState<MediaDeviceInfo[] | null>([]);
  useEffect(() => {
    getDevice(setAudioInput, setAudioOutput, setVideoInput);
  }, []);

  return (
    <Container>
      <SelectorContainer>
        <Selector select="camera" device={videoInput} />
        <Selector select="mic" device={audioInput} />
        <Selector select="speaker" device={audioOutput} />
      </SelectorContainer>
    </Container>
  );
}

const SelectorContainer = styled.div`
  height: 100%;
  width: 26.5rem;
  @media (max-width: 1200px) {
    width: 41.9rem;
  }
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Container = styled.div`
  width: calc(100% - 56.8rem);
  height: 36.8rem;
  @media (max-width: 1200px) {
    width: 100%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
