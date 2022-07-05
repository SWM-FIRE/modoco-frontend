import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import roomInterface from '../../interface/room.interface';

interface Props {
  image: string;
}

export default function RoomBlock({
  name,
  total,
  current,
  image,
  id,
}: roomInterface) {
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
    <Button onClick={onSubmit} image={image}>
      <Information>
        <div>{name}</div>
        <div>
          {current} / {total}
        </div>
      </Information>
    </Button>
  );
}

const Information = styled.div`
  font-size: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem;
  height: 100%;
  color: white;
`;

const Button = styled.button<Props>`
  text-align: center;
  width: 22vw;
  height: 22vw;
  background-color: darkGray;
  background-image: url(${(props) => props.image});
  background-position: center;
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 3rem;
  @media screen and (max-width: 1200px) {
    width: 30vw;
    height: 30vw;
  }
  @media screen and (max-width: 900px) {
    width: 60vw;
    height: 60vw;
  }
`;
