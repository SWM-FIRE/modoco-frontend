/* eslint-disable react/jsx-no-bind */
import { useRef } from 'react';
import styled from 'styled-components';
// import { useParams } from 'react-router-dom';
import {
  useStartPeerSession,
  useCreateMediaStream,
} from '../components/rtc/hooks';
import { LocalVideo, RemoteVideo } from '../components/rtc/components';

export default function MainPage() {
  // room에 useParams로 방 할당필요
  const room = 'test';
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainRef = useRef(null);

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers } = useStartPeerSession(
    room,
    userMediaStream,
    localVideoRef,
  );
  console.log('users', connectedUsers);

  return (
    <Main ref={mainRef}>
      <Gallery ref={galleryRef}>
        <Header>방번호</Header>
        <p>ME</p>
        <LocalVideo ref={localVideoRef} />
        {connectedUsers.map((user: string) => (
          <>
            <p>{user}</p>
            <RemoteVideo key={user} id={user} autoPlay playsInline />
          </>
        ))}
      </Gallery>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: white;
`;

const Header = styled.header`
  font-size: 5rem;
`;

const Gallery = styled.div`
  justify-content: center;
  max-width: calc(var(--width) * var(--cols));
`;
