import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as VolumeOn } from '../../assets/svg/VolumeOn.svg';
import { ReactComponent as VolumeOff } from '../../assets/svg/VolumeOff.svg';
import Fire from '../../assets/theme/fire.gif';
import UserMediaStreamStore from '../../stores/userMediaStreamStore';

export default function Theme() {
  const { userSpeaker, setUserSpeaker } = UserMediaStreamStore();
  const [volume, setVolume] = useState<number>(0.5);
  const setSpeaker = () => {
    setUserSpeaker();
  };
  return (
    <Container>
      <ThemeImage>
        <img src={Fire} alt="fire" />
      </ThemeImage>
      <Volume onClick={setSpeaker}>
        {userSpeaker && volume !== 0 ? <VolumeOn /> : <VolumeOff />}
      </Volume>
      <VolumeControl volume={volume * 100} speaker={userSpeaker}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
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
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  width: 6rem;

  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
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
  margin-left: 1.4rem;
`;

const Container = styled.div`
  display: flex;
  height: 3.2rem;
`;

const ThemeImage = styled.div`
  width: 3.2rem;
  height: 100%;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;