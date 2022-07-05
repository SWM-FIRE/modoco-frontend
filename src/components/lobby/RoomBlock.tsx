import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import roomInterface from '../../interface/room.interface';
import oc from '../../styles/openColor';

export default function RoomBlock({ name, total, current, id }: roomInterface) {
  /*
  socket.emit('ENTER_ROOM', payload, (confirmRoomId) => {
    navigate(`room/${confirmRoomId}`);
  });
  */
  const navigate = useNavigate();
  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('test');
    navigate(`/room/${id}`);
  };
  return (
    <Button onClick={onSubmit}>
      <RoomName>{name}</RoomName>
      <div>
        {current} / {total}
      </div>
    </Button>
  );
}

const RoomName = styled.div`
  font-size: 5rem;
`;

const Button = styled.button`
  text-align: center;
  width: 22vw;
  height: 22vw;
  background-color: ${oc.gray3};
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 2rem;
  @media screen and (max-width: 1200px) {
    width: 30vw;
    height: 30vw;
  }
  @media screen and (max-width: 900px) {
    width: 60vw;
    height: 60vw;
  }
`;
