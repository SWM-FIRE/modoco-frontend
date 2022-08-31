import styled from 'styled-components';
import { ReactComponent as MicOn } from '../../../assets/svg/MicOn.svg';

export default function VolumeBar({ volume }: { volume: number }) {
  const n = 8;
  return (
    <Container>
      <Bars>
        {[...Array(n)].map((no, index) => (
          <Bar key={Symbol(index).toString()} volume={volume} no={index} />
        ))}
      </Bars>
      <MicIcon>
        <MicOn />
      </MicIcon>
    </Container>
  );
}

const MicIcon = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  background-color: rgba(31, 41, 55, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
`;

const Bars = styled.div`
  width: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;

const Bar = styled.div<{ volume: number; no: number }>`
  width: 100%;
  height: 1.6rem;
  background-color: ${(props) =>
    props.volume / 8 > 7 - props.no ? '#4ADE80' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 5rem;
`;

const Container = styled.div`
  position: absolute;
  left: 5%;
  bottom: 7%;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
