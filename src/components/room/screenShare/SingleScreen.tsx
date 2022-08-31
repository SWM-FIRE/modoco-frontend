import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import controlModal from '../../../stores/controlModal';
import messageStore from '../../../stores/messagesStore';
import userStore from '../../../stores/userStore';
import UserMediaStreamStore from '../../../stores/userMediaStreamStore';

export default function SingleScreen({ connectedUser, stream }) {
  const { messages } = messageStore();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { toggleModal, setNickname, setAvatar, setUid, setSid } =
    controlModal();
  const { uid } = userStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { userAudioOutputDevice } = UserMediaStreamStore();

  const OpenModal = () => {
    setNickname(connectedUser.nickname);
    setAvatar(connectedUser.avatar);
    setUid(connectedUser.uid);
    if (uid !== connectedUser.uid) setSid(connectedUser.socketId);
    toggleModal();
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
    <Container onClick={OpenModal}>
      {uid === connectedUser.uid ? (
        <Video ref={videoRef} autoPlay playsInline muted />
      ) : (
        <Video ref={videoRef} autoPlay playsInline />
      )}
      <ControlBar>
        <ChatContainer>
          <ChatInner>
            {newMessages.map((message) => (
              <Chats key={message.createdAt}>{message.message}</Chats>
            ))}
          </ChatInner>
        </ChatContainer>
        <AvatarPosition>
          <TalkingShadow />
          <MyAvatar num={Number(connectedUser.avatar)} />
          <NameContainer isMe={uid === connectedUser.uid}>
            {connectedUser.nickname}
          </NameContainer>
        </AvatarPosition>
      </ControlBar>
    </Container>
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

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TalkingShadow = styled.div`
  position: absolute;
  width: 8rem;
  height: 8rem;
  top: 0;
  border-radius: 50%;
  box-shadow: #84cc16 0px 2px 10px 0px, #84cc16 0px 2px 16px 0px;
  animation: ${boxFade} 2s 1s infinite linear alternate;
`;
