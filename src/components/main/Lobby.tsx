import { useState } from 'react';
import styled from 'styled-components';
import ModalPortal from '../atoms/ModalPortal';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import SendChat from '../atoms/chatting/SendChat';

export default function Lobby({ toggleModal }: { toggleModal: () => void }) {
  const [isChat, setChat] = useState<boolean>(true);
  return (
    <ModalPortal>
      <Outside onClick={toggleModal}>
        <Container onClick={(e) => e.stopPropagation()}>
          <CanvasArea>Will be Canvas</CanvasArea>
          <ChatArea>
            <ExitButton onClick={toggleModal}>
              <X />
            </ExitButton>
            <ChatHeader>
              <ChatToggle onClick={() => setChat(true)} isChat={isChat}>
                채팅
              </ChatToggle>
              <ParticipantToggle onClick={() => setChat(false)} isChat={isChat}>
                참여자
              </ParticipantToggle>
            </ChatHeader>
            {isChat ? (
              <>
                <Chats>Place for real chat</Chats>
                <SendChat roomId="" uid={1} />
              </>
            ) : (
              <Participants>Place for real participants</Participants>
            )}
          </ChatArea>
        </Container>
      </Outside>
    </ModalPortal>
  );
}

const Participants = styled.div`
  width: 100%;
  height: calc(100% - 6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const Chats = styled.div`
  width: 100%;
  height: calc(100% - 13.8rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ChatToggle = styled.div<{ isChat: boolean }>`
  padding-right: 1rem;
  border-right: 2px solid #f9fafb;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.isChat ? 'color: #f9fafb;' : 'color: rgba(255, 255, 255, 0.5);'}
`;

const ParticipantToggle = styled.div<{ isChat: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) =>
    props.isChat ? 'color: rgba(255, 255, 255, 0.5);' : 'color: #f9fafb;'}
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  gap: 1rem;
  font-size: 1.6rem;
  color: #f9fafb;
`;

const ExitButton = styled.div`
  cursor: pointer;
  width: calc(100% - 1rem);
  height: 2rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const CanvasArea = styled.div`
  width: calc(100% - 30rem);
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ChatArea = styled.div`
  width: 30rem;
  height: 100%;
  background-color: #1e1e22;
  border-radius: 0 1rem 1rem 0;
  padding: 1rem;
  position: relative;
`;

const Outside = styled.div`
  z-index: 998;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  position: fixed;
  cursor: default;
  width: 90%;
  height: 80%;
  background-color: black;
  z-index: 999;
  border-radius: 1rem;
  background-color: #23262f;
  border: 0.5rem solid #3a3a3a;
  display: flex;
  justify-content: space-between;
`;
