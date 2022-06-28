import { useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  useCalculateVideoLayout,
  useStartPeerSession,
} from '../componets/hooks';

export default function MainPage() {
  const { room } = useParams();
  const galleryRef = useRef(null);
  const localVideoRef = useRef(null);
  const mainRef = useRef(null);

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers, shareScreen, cancelScreenSharing, isScreenShared } =
    useStartPeerSession(room, userMediaStream, localVideoRef);

  useCalculateVideoLayout(galleryRef, connectedUsers.length + 1);

  return (
    <Main ref={mainRef}>
      <Gallery ref={galleryRef}>
        <Header>방번호</Header>
        <LocalVideo ref={localVideoRef} autoPlay playsInline muted />
        {connectedUsers.map((user) => (
          <RemoteVideo key={user} id={user} autoPlay playsInline />
        ))}
        <Button>화면 공유 ON</Button>
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

const Button = styled.button`
  color: white;
  cursor: pointer;
  padding: 2rem;
  width: 15rem;
  margin: 0 auto;
  font-size: 2rem;
  background-color: gray;
  border-radius: 1rem;
`;

const Gallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: calc(var(--width) * var(--cols));
`;
