import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default function YoutubeModalPlayer({
  playlist,
  nowPlaying,
  setNowPlaying,
}: {
  playlist: youtubeSearch[];
  nowPlaying: number;
  setNowPlaying: React.Dispatch<React.SetStateAction<number>>;
}) {
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const list = playlist.map((item) => item.id.videoId);
  const onEnded = () => {
    setNowPlaying((nowPlaying + 1) % playlist.length);
    if (playerRef.current) {
      setVolume(playerRef.current.getInternalPlayer().getVolume() / 100);
    }
  };

  if (playlist.length === 0) {
    return <Empty>플레이리스트가 비어있어요</Empty>;
  }

  return (
    <ReactPlayer
      ref={playerRef}
      url={`https://www.youtube.com/watch?v=${list[nowPlaying]}`}
      playing
      // eslint-disable-next-line react/jsx-boolean-value
      controls
      loop={playlist.length === 1}
      width="62%"
      height="100%"
      volume={volume}
      onEnded={onEnded}
    />
  );
}

const Empty = styled.div`
  width: 62%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: white;
  background-color: ${({ theme }) => theme.input};
`;
