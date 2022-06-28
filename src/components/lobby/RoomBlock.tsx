import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import roomInterface from '../../room.interface';
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
  width: 20rem;
  height: 10rem;
  background-color: ${oc.gray3};
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 2rem;
`;
