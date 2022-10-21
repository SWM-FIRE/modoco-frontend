import React from 'react';
import styled from 'styled-components';
import YoutubeModalHeader from './YoutubeModalHeader';
import YoutubeModalInput from './YoutubeModalInput';
import YoutubeModalPlaying from './YoutubeModalPlaying';
import YoutubeModalPlaylist from './YoutubeModalSearchList';

export default function YoutubeModal({
  toggle,
  searchList,
  setSearchList,
  isInPlaylist,
}) {
  console.log('youtubeModal');
  return (
    <Component>
      <YoutubeModalHeader toggle={toggle} />
      <YoutubeModalInput setSearchList={setSearchList} />
      <YoutubeModalPlaying />
      <YoutubeModalPlaylist
        searchList={searchList}
        isInPlaylist={isInPlaylist}
      />
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
  width: 40rem;
  left: 0;
  top: 0;
  height: calc(100vh - 14rem);
  z-index: 2;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
  font-family: IBMPlexSansKRRegular;
`;
