/* eslint-disable react/jsx-no-bind */
import { useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
  useStartPeerSession,
  useCreateMediaStream,
} from '../components/rtc/hooks';
import { LocalVideo, RemoteVideo } from '../components/rtc/components';

export default function MainPage() {
  const room = useParams().roomId;
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainRef = useRef(null);

  /**
   * @brief RTC Connection 순서
   *
   * @useCreateMediaStream - 사용자의 미디어 스트림을 생성하는 함수
   * @useStartPeerSession - 사용자의 미디어 스트림을 생성하고 상대방에게 연결을 시작하는 함수
   * @param room - 방 아이디
   * @param userMediaStream - 사용자의 미디어 스트림
   * @param localVideoRef - 사용자의 미디어 스트림을 보여주는 요소
   */

  const userMediaStream = useCreateMediaStream(localVideoRef);
  const { connectedUsers } = useStartPeerSession(
    room,
    userMediaStream,
    // localVideoRef,
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
            <p>USER : {user}</p>
            <RemoteVideo key={user} id={user} autoPlay playsInline muted />
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
`;
