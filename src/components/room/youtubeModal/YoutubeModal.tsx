import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import YoutubeModalHeader from './YoutubeModalHeader';
import YoutubeModalInput from './YoutubeModalInput';
import YoutubeModalPlaying from './YoutubeModalPlaying';
import YoutubeModalSearchList from './YoutubeModalSearchList';
import {
  initSocketConnection,
  joinYoutube,
  leaveYoutube,
  addVideo,
  disconnectSocket,
} from '../../../adapters/youtubeSocket';
import MusicStore from '../../../stores/room/musicStore';

export default function YoutubeModal() {
  const { roomId } = useParams();
  const { setType, initPlaylist, initSearchList, addPlaylist } = MusicStore();

  useEffect(() => {
    initSocketConnection();
    const addVideoFunc = (data) => {
      data.playlist.map((item) => addPlaylist(item.video));
    };
    joinYoutube(roomId);
    addVideo(addVideoFunc);
    return () => {
      leaveYoutube(roomId);
      disconnectSocket();
      setType('theme');
      initPlaylist();
      initSearchList();
    };
  }, []);

  return (
    <Component>
      <YoutubeModalHeader />
      <YoutubeModalInput />
      <YoutubeModalPlaying />
      <YoutubeModalSearchList />
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
