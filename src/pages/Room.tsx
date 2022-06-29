import { useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  useCalculateVideoLayout,
  useStartPeerSession,
  useCreateMediaStream,
} from '../components/hooks';
import {
  LocalVideo,
  RemoteVideo,
  VideoControls,
} from '../components/room/video';

export default function MainPage() {
  const { room } = useParams();
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainRef = useRef(null);

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers, shareScreen, cancelScreenSharing, isScreenShared } =
    useStartPeerSession(room, userMediaStream, localVideoRef);

  useCalculateVideoLayout(galleryRef, connectedUsers.length + 1);

  async function handleScreenSharing(share) {
    if (share) {
      await shareScreen();
    } else {
      await cancelScreenSharing();
    }
  }

  function handleFullscreen(fullscreen) {
    toggleFullscreen(fullscreen, mainRef.current);
  }

  return (
    <Main ref={mainRef}>
      <Gallery ref={galleryRef}>
        <Header>방번호</Header>
        <LocalVideo ref={localVideoRef} />
        {connectedUsers.map((user: any) => (
          <RemoteVideo key={user} id={user} autoPlay playsInline />
        ))}
        <Button>화면 공유 ON</Button>
      </Gallery>
      <VideoControls
        isScreenShared={isScreenShared}
        onScreenShare={handleScreenSharing}
        onToggleFullscreen={handleFullscreen}
      />
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
