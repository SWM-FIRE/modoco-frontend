import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as VolumeOn } from '../../assets/svg/VolumeOn.svg';
import { ReactComponent as VolumeOff } from '../../assets/svg/VolumeOff.svg';
import Fire from '../../assets/theme/fire.gif';
import UserMediaStreamStore from '../../stores/userMediaStreamStore';

export default function Theme() {
  const { userSpeaker, setUserSpeaker } = UserMediaStreamStore();
  const [volume, setVolume] = useState(0.5);
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
      <VolumeControl>
        <input
          type="range"
          min={0}
          max={1}
          color="gray"
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

const VolumeControl = styled.div`
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
      background: #ffffff;
      margin-top: -5px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: #bdbdbd;
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }

    &:hover::-webkit-slider-runnable-track {
      background: #ff6e40;
    }

    //FIREFOX
    &::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #ffffff;
      margin-top: -0.5rem;
      box-shadow: 1px 1px 2px rgba(#000, 0.5);
      cursor: pointer;
    }

    &::-moz-range-track {
      height: 0.6rem;
      background: #bdbdbd;
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: pointer;
    }
    &:hover::-moz-range-track {
      background: #ff6e40;
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
