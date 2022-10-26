import React, { useMemo } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default React.memo(function YoutubeModalPlayer({
  playlist,
  nowPlaying,
  setNowPlaying,
}: {
  playlist: youtubeSearch[];
  nowPlaying: number;
  setNowPlaying: React.Dispatch<React.SetStateAction<number>>;
}) {
  const list = useMemo(
    () => playlist.map((item) => item.id.videoId),
    [playlist],
  );

  const onEnded = () => {
    setNowPlaying((nowPlaying + 1) % playlist.length);
  };

  if (playlist.length === 0) {
    return <Empty>플레이리스트가 비어있어요</Empty>;
  }

  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${list[nowPlaying]}`}
      playing
      controls
      loop={playlist.length === 1}
      width="58%"
      height="100%"
      pip
      volume={0.5}
      onEnded={onEnded}
    />
  );
});

const Empty = styled.div`
  width: 58%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  color: white;
  background-color: ${({ theme }) => theme.input};
`;
