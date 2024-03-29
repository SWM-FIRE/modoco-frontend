import { useState, useEffect } from 'react';
import styled from 'styled-components';
import audioContext from '../../atoms/audioContext';
import audioFrequency from '../../atoms/settingModal/audioFrequency';

export default function AudioTracking({ stream }) {
  const [vol, setVol] = useState<number>(0);

  useEffect(() => {
    let myInterval: ReturnType<typeof setInterval>;
    if (stream && stream.getAudioTracks().length > 0) {
      const { analyser, bufferLength, dataArray } = audioContext(stream);
      myInterval = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const vol = audioFrequency(dataArray, bufferLength);
        setVol(Math.floor((vol / 256) * 150));
      }, 30);
    }
    return () => clearInterval(myInterval);
  }, [stream]);

  return (
    <TalkingShadow vol={vol}>
      <InnerShadow vol={vol} />
    </TalkingShadow>
  );
}

const InnerShadow = styled.div<{ vol: number }>`
  position: absolute;
  width: ${(props) => (props.vol > 15 ? '7.4rem' : '0rem')};
  height: ${(props) => (props.vol > 15 ? '7.4rem' : '0rem')};
  top: -0.1rem;
  left: -0.1rem;
  border-radius: 50%;
  border: ${(props) =>
    props.vol > 15 ? '0.2rem solid rgba(14, 14, 14, 0.8)' : 'none'};
`;

const TalkingShadow = styled.div<{ vol: number }>`
  position: absolute;
  width: ${(props) => (props.vol > 15 ? '8rem' : '0rem')};
  height: ${(props) => (props.vol > 15 ? '8rem' : '0rem')};
  top: 0rem;
  border-radius: 50%;
  border: ${(props) => (props.vol > 15 ? '0.4rem solid #01ab07' : 'none')};
`;
