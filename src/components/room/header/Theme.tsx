import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as MusicOn } from '../../../assets/svg/MusicOn.svg';
import { ReactComponent as MusicOff } from '../../../assets/svg/MusicOff.svg';
import ThemeSound from './ThemeSound';

export default function Theme({ theme, youtubeModal }) {
  const [volume, setVolume] = useState<number>(0.5);
  const volumeRef = useRef<HTMLAudioElement>(null);

  const onClickVolumeButton = () => {
    if (youtubeModal) return;
    setVolume(volume === 0 ? 0.5 : 0);
  };

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (youtubeModal) return;
    setVolume(Number(e.target.value));
  };

  useEffect(() => {
    if (youtubeModal) {
      volumeRef.current.volume = 0;
      return;
    }
    if (volumeRef.current) {
      volumeRef.current.volume = volume;
    }
  }, [volume, youtubeModal]);

  return (
    <Container>
      <ThemeSound volumeRef={volumeRef} theme={theme} />
      <Volume onClick={onClickVolumeButton} youtubeModal={youtubeModal}>
        {volume !== 0 && !youtubeModal ? <MusicOn /> : <MusicOff />}
      </Volume>
      <VolumeControl volume={volume * 100} youtubeModal={youtubeModal}>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={onChangeVolume}
        />
      </VolumeControl>
    </Container>
  );
}

const VolumeControl = styled.div<{ volume: number; youtubeModal: boolean }>`
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
      background: ${(props) =>
        props.volume && !props.youtubeModal ? '#d9d9d9' : '#E5E7EB'};
      margin-top: -5px;
      cursor: ${(props) => (props.youtubeModal ? 'default' : 'pointer')};
    }

    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume && !props.youtubeModal
          ? `linear-gradient(to right, #D9D9D9 ${props.volume}%, rgba(229, 231, 235, 0.5)
 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) =>
        props.volume && !props.youtubeModal ? '1' : '0.5'};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: ${(props) => (props.youtubeModal ? 'default' : 'pointer')};
    }

    //FIREFOX
    &::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: ${(props) => (props.volume ? '#d9d9d9' : '#E5E7EB')};
      margin-top: -0.5rem;
      box-shadow: 1px 1px 2px rgba(#000, 0.5);
      cursor: ${(props) => (props.youtubeModal ? 'default' : 'pointer')};
    }

    &::-moz-range-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right, #D9D9D9 ${props.volume}%, rgba(229, 231, 235, 0.5)
 ${props.volume}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume ? '1' : '0.5')};
      border-radius: 3rem;
      transition: all 0.5s;
      cursor: ${(props) => (props.youtubeModal ? 'default' : 'pointer')};
    }
  }
`;

const Volume = styled.button<{ youtubeModal: boolean }>`
  cursor: ${(props) => (props.youtubeModal ? 'default' : 'pointer')};
  margin-left: 1.4rem;
  &:hover {
    svg {
      opacity: 0.7;
    }
  }
`;

const Container = styled.div`
  display: flex;
  height: 4rem;
  margin-left: 1rem;
`;
