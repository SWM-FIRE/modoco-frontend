import { useState } from 'react';
import styled from 'styled-components';
import Scrolls from '../components/main/Scrolls';
import Header from '../components/main/Header';
import Title from '../components/main/TitleContainer';
import Modal from '../components/atoms/Modal';
import InputNickname from '../components/login/InputNickname';

export default function Main() {
  const [isModal, setIsModal] = useState(true);
  const modalHandler = () => {
    setIsModal(false);
  };
  return (
    <>
      <Container>
        <Header />
        <Title />
        <Scrolls />
      </Container>
      {isModal && (
        <Modal modalHandler={modalHandler}>
          <InputNickname />
        </Modal>
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 140vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
