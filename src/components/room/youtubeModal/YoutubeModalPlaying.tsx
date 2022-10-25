import styled from 'styled-components';
import musicStore from '../../../stores/room/musicStore';
import YoutubeModalPlayer from './YoutubeModalPlayer';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function YoutubeModalPlaylist() {
  const { playlist, removePlaylist, nowPlaying, setNowPlaying } = musicStore();

  const removeItem = (index: number) => {
    removePlaylist(playlist[index]);
    if (index <= nowPlaying && nowPlaying !== 0) {
      setNowPlaying(nowPlaying - 1);
    }
  };

  return (
    <Playing>
      <YoutubeModalPlayer />
      <Playlist>
        {playlist.map((item, index) => (
          <Item key={Symbol(item.id.videoId).toString()}>
            <Title>{item.snippet.title}</Title>
            <DeleteItem type="button" onClick={() => removeItem(index)}>
              <X />
            </DeleteItem>
          </Item>
        ))}
      </Playlist>
    </Playing>
  );
}
const Playing = styled.div`
  width: 100%;
  height: 21rem;
  min-height: 21rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
  display: flex;
`;

const Playlist = styled.ul`
  width: 42%;
  height: 100%;
  overflow-y: scroll;
  padding: 0.1rem;
  margin-left: 0.3rem;
  border: 1px dotted rgba(55, 65, 81, 1);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
  padding: 0.3rem 0.5rem;
  &:hover {
    background-color: #3b3a3a91;
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow-y: scroll;
  flex-grow: 1;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DeleteItem = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.4rem;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: #3b3a3a91;
  }
`;
