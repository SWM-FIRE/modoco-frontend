import styled from 'styled-components';
import ReactPlayer from 'react-player/youtube';
import musicStore from '../../../stores/room/musicStore';

export default function YoutubeModalPlayer() {
  const { playlist, nowPlaying, setNowPlaying } = musicStore();
  const list = playlist.map((item) => item.id.videoId);

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
      width="58%"
      height="100%"
      pip
      onEnded={onEnded}
    />
  );
}

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
