import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as VolumeOn } from '../../../assets/svg/VolumeOn.svg';
import { ReactComponent as VolumeOff } from '../../../assets/svg/VolumeOff.svg';

export default function ControlVolume({ uid }: { uid: number }) {
  const [userSpeaker, setSpeaker] = useState(true);
  const [volume, setVolume] = useState<number>(0.5);

  console.log(uid);
  const onClickVolume = () => {
    setSpeaker((prev) => !prev);
  };

  return (
    <Container>
      <Volume onClick={onClickVolume}>
        {userSpeaker && volume !== 0 ? <VolumeOn /> : <VolumeOff />}
      </Volume>
      <VolumeControl volume={volume * 100} speaker={userSpeaker}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.03}
          value={volume}
          onChange={(event) => {
            setVolume(event.target.valueAsNumber);
          }}
        />
      </VolumeControl>
    </Container>
  );
}

const VolumeControl = styled.div<{ volume: number; speaker: boolean }>`
  display: flex;

  align-items: center;
  margin-left: 1rem;
  flex-grow: 1;
  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    width: 80%;
    background: transparent;

    &:focus {
      outline: none;
    }

    //WEBKIT
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? '#d9d9d9' : '#E5E7EB')};
      margin-top: -5px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right, #D9D9D9 ${props.volume}%, rgba(229, 231, 235, 0.5)
 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.5')};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }

    //FIREFOX
    &::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? '#d9d9d9' : '#E5E7EB')};
      margin-top: -0.5rem;
      box-shadow: 1px 1px 2px rgba(#000, 0.5);
      cursor: pointer;
    }

    &::-moz-range-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right, #D9D9D9 ${props.volume}%, rgba(229, 231, 235, 0.5)
 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume && props.speaker ? '1' : '0.5')};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`;

const Volume = styled.button`
  cursor: pointer;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1.6rem;
`;
