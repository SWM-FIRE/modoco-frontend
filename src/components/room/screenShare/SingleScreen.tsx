import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import roomModalStore from '../../../stores/room/roomModalStore';
import messageStore from '../../../stores/room/messagesStore';
import userStore from '../../../stores/userStore';
import UserMediaStreamStore from '../../../stores/room/userMediaStreamStore';
import AudioTracking from './AudioTracking';
import NewUserAlarm from './NewUserAlarm';

export default function SingleScreen({ connectedUser, stream }) {
  const { messages } = messageStore();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { setScreenUid, toggleScreenModal } = roomModalStore();
  const { uid } = userStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const volumeRef = useRef<HTMLAudioElement>(null);

  const { userAudioOutputDevice } = UserMediaStreamStore();

  const openScreenModal = () => {
    setScreenUid(connectedUser.uid);
    toggleScreenModal();
  };

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
    const newRef = videoRef.current;
    (newRef as any).setSinkId(userAudioOutputDevice?.deviceId);
  }, [stream, videoRef, userAudioOutputDevice]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const newMessages = messages.filter(
    (message) =>
      message.uid === connectedUser.uid &&
      new Date(message.createdAt).getTime() > currentTime.getTime() - 5000,
  );

  return (
    <>
      {connectedUser.uid !== uid && <NewUserAlarm volumeRef={volumeRef} />}
      <Container onClick={openScreenModal}>
        {uid === connectedUser.uid ? (
          <Video ref={videoRef} autoPlay playsInline muted />
        ) : (
          <Video ref={videoRef} autoPlay playsInline />
        )}
        <ControlBar>
          <ChatContainer>
            <ChatInner>
              {newMessages.map((message) => (
                <Chats key={message.uid + message.createdAt}>
                  {message.message}
                </Chats>
              ))}
            </ChatInner>
          </ChatContainer>
          <AvatarPosition>
            <AudioTracking stream={stream} />
            <MyAvatar num={Number(connectedUser.avatar)} />
            <NameContainer isMe={uid === connectedUser.uid}>
              {connectedUser.nickname}
            </NameContainer>
          </AvatarPosition>
        </ControlBar>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #4a4a4a;
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 48%;
  height: 0;
  border-radius: 1rem;
  padding-bottom: 28%;
  position: relative;
`;

const ControlBar = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  gap: 1rem;
`;

const ChatContainer = styled.div`
  width: calc(100% - 3rem);
  height: calc(95% - 3rem);
  position: absolute;
  bottom: calc(5% + 3rem);
  overflow: hidden;
  margin-left: 1.2rem;
`;

const Chats = styled.div`
  align-self: flex-start;
  padding: 1.6rem;
  background-color: rgba(53, 69, 122, 0.8);
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  border-radius: 0.8rem;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
`;

const NameContainer = styled.div<{ isMe: boolean }>`
  padding: 1%;
  font-size: 1.6rem;
  font-family: IBMPlexSansKRRegular;
  color: ${(props) => (props.isMe ? '#A7F3D0' : '#f9fafb')};
`;

const AvatarPosition = styled.div`
  width: 100%;
  position: absolute;
  bottom: calc(-5% - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const Video = styled.video`
  z-index: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: absolute;
`;
