import { useState } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-hot-toast';
import RoomCards from '../components/main/RoomCards';
import MainTitle from '../components/main/MainTitle';
import CreateRoomModal from '../components/main/CreateRoomModal/CreateRoomModal';

export default function Main() {
  const [isCreateRoomModal, setIsCreateRoomModal] = useState(false);

  const openCreateRoom = () => {
    if (isMobile) {
      toast.error('모바일에서는 방을 만들 수 없습니다');
      return;
    }
    setIsCreateRoomModal(true);
  };
  const closeCreateRoom = () => {
    setIsCreateRoomModal(false);
  };

  return (
    <>
      <Container>
        <MainTitle />
        <RoomCards openCreateRoom={openCreateRoom} />
      </Container>
      {isCreateRoomModal && (
        <CreateRoomModal closeCreateRoom={closeCreateRoom} />
      )}
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
