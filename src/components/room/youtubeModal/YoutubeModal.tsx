import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import YoutubeModalHeader from './YoutubeModalHeader';
import YoutubeModalInput from './YoutubeModalInput';
import YoutubeModalPlayer from './YoutubeModalPlayer';
import youtubeSearch from '../../../interface/youtubeSearch.interface';
import SearchListItem from './SearchListItem';
import PlaylistItem from './PlaylistItem';
import {
  initSocketConnection,
  joinYoutube,
  leaveYoutube,
  addVideo,
  disconnectSocket,
} from '../../../adapters/youtubeSocket';

export default function YoutubeModal({ roomId }: { roomId: string }) {
  const [playlist, setPlaylist] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [nowPlaying, setNowPlaying] = useState<number>(0);

  const isInPlaylist = (video: youtubeSearch) => {
    return playlist.some((item) => item.id.videoId === video.id.videoId);
  };

  const removeItem = (index: number) => {
    setPlaylist(playlist.filter((_, i) => i !== index));
    if (index <= nowPlaying && nowPlaying !== 0) {
      setNowPlaying(nowPlaying - 1);
    }
  };

  useEffect(() => {
    initSocketConnection();
    joinYoutube(roomId);
    const addVideoFunc = (data) => {
      console.log(data);
      data.playlist.map((item) =>
        setPlaylist((playlist) => [...playlist, item.video]),
      );
      toast.success(`🎵 ${data.playlist[0].video.snippet.title}`);
    };
    addVideo(addVideoFunc);
    return () => {
      leaveYoutube(roomId);
      disconnectSocket();
    };
  }, [roomId]);

  return (
    <Component>
      <YoutubeModalHeader />
      <YoutubeModalInput setSearchList={setSearchList} />
      <Playing>
        <YoutubeModalPlayer
          playlist={playlist}
          nowPlaying={nowPlaying}
          setNowPlaying={setNowPlaying}
        />
        <Playlist>
          {playlist.map((item, index) => (
            <PlaylistItem
              key={Symbol(item.id.videoId).toString()}
              item={item}
              index={index}
              removeItem={removeItem}
            />
          ))}
        </Playlist>
      </Playing>
      <SearchList>
        {searchList.map((item: youtubeSearch) => (
          <SearchListItem
            key={item.id.videoId}
            item={item}
            roomId={roomId}
            isInPlaylist={isInPlaylist}
          />
        ))}
      </SearchList>
    </Component>
  );
}

const Component = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.chatBackground};
  margin: 1.6rem 2rem 2rem 0;
  border-radius: 0 1rem 1rem 0;
  padding: 2rem 1.4rem;
  width: 60rem;
  left: -55rem;
  top: 0;
  height: calc(100vh - 14rem);
  z-index: 2;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
  font-family: IBMPlexSansKRRegular;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: translateX(55rem);
  }
`;

const Playing = styled.div`
  width: 100%;
  height: 21rem;
  min-height: 21rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
  display: flex;
`;

const Playlist = styled.ul`
  width: 38%;
  height: 100%;
  overflow-y: scroll;
  padding: 0.1rem;
  margin-left: 0.3rem;
  border: 1px dotted rgba(55, 65, 81, 1);
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 100%;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
