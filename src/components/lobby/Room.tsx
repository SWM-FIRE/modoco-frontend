import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RoomBlock from './RoomBlock';
import roomInterface from '../../interface/room.interface';
import roomsData from '../../rooms.json';

export default function Room() {
  const [rooms, setRooms] = useState(roomsData);
  useEffect(() => {
    const API_URL: string = process.env.REACT_APP_SERVER as string;
    console.log(API_URL);
    fetch(API_URL, {
      headers: {
        accept: 'application/json',
      },
      method: 'GET',
    }).then((res) => res.json().then((data) => setRooms(data)));
  }, []);

  return (
    <Component>
      {rooms.map(({ id, name, total, current }: roomInterface) => {
        return (
          <RoomBlock
            key={id}
            name={name}
            total={total}
            current={current}
            id={id}
          />
        );
      })}
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 5rem 15rem;
`;
