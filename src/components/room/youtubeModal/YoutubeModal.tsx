import React, { useState } from 'react';
import styled from 'styled-components';
import YoutubeModalHeader from './YoutubeModalHeader';
import YoutubeModalInput from './YoutubeModalInput';

export default function YoutubeModal({ toggle }) {
  const [input, setInput] = useState('');
  console.log(input);

  return (
    <Component>
      <YoutubeModalHeader toggle={toggle} />
      <YoutubeModalInput setInput={setInput} />
      <Playing>
        <Video />
      </Playing>
      <PlayList>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </PlayList>
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

const Playing = styled.div`
  width: 100%;
  height: 30rem;
  border-top: 1px solid rgba(55, 65, 81, 1);
  padding-top: 1rem;
`;

const Video = styled.video`
  background-color: lightGray;
  width: 100%;
  height: 28rem;
`;

const PlayList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  flex-shrink: 1;
  overflow: scroll;
  margin-top: 1rem;
  video {
    height: 14rem;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
