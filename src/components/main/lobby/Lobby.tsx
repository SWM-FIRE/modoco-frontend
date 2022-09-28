import styled from 'styled-components';
import ModalPortal from '../../atoms/ModalPortal';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import Participants from './Participants';
import Chatting from './Chatting';

export default function Lobby({ toggleModal }: { toggleModal: () => void }) {
  return (
    <ModalPortal>
      <Outside onClick={toggleModal}>
        <Container onClick={(e) => e.stopPropagation()}>
          <ExitButton onClick={toggleModal}>
            <X />
          </ExitButton>
          <MainArea>
            <ChattingArea>
              <Chatting />
            </ChattingArea>
            <ParticipantsArea>
              실시간 참여자들
              <Participants />
            </ParticipantsArea>
          </MainArea>
        </Container>
      </Outside>
    </ModalPortal>
  );
}

const ParticipantsArea = styled.div`
  width: 25%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 4rem;
  font-size: 1.6rem;
  color: white;
`;

const ChattingArea = styled.div`
  width: 74%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1rem;
`;

const MainArea = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ExitButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: calc(100% - 1rem);
  height: 2rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Outside = styled.div`
  z-index: 998;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  touch-action: none;
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
`;
