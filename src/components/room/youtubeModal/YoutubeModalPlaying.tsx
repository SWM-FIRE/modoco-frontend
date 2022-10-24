import styled from 'styled-components';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default function YoutubeModalPlaying({
  playlist,
}: {
  playlist: youtubeSearch[];
}) {
  const list = playlist.map((item) => item.id.videoId);

  return (
    <Playing>
      <Video
        allowFullScreen
        src={
          `https://www.youtube.com/embed/${list[0]}?controls=1&autoplay=1&disablekb=1&enablejsapi=1` +
          `&playlist=${list.join(',')}`
        }
        allow="autoplay"
      />
      <Playlist>
        {playlist.map((item) => (
          <Item key={item.id.videoId}>{item.snippet.title}</Item>
        ))}
      </Playlist>
    </Playing>
  );
}
const Playing = styled.div`
  width: 100%;
  height: 20rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
  display: flex;
`;

const Video = styled.iframe`
  background-color: lightGray;
  width: 60%;
  height: 100%;
`;

const Playlist = styled.ul`
  width: 40%;
  height: 100%;
  overflow-y: scroll;
  padding: 0.1rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  display: inline-flex;
  color: white;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  width: 100%;
  overflow-y: scroll;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  ::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    background-color: #3b3a3a91;
  }
`;
