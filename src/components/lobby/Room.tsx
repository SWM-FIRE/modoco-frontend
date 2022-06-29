import { useEffect, useState } from 'react';
import RoomBlock from './RoomBlock';
import roomInterface from '../../room.interface';

export default function Room() {
  const [rooms, setRooms] = useState([
    {
      id: 'init',
      name: 'initName',
      total: 5,
      current: 3,
    },
  ]);
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
    <>
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
    </>
  );
}
