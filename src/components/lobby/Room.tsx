import roomAPI from '../../rooms.json';
import RoomBlock from './RoomBlock';
import roomInterface from '../../room.interface';

export default function Room() {
  return (
    <>
      {roomAPI.map(({ name, total, current, id }: roomInterface) => {
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
