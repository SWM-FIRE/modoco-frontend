import roomAPI from '../../rooms.json';
import RoomBlock from './RoomBlock';
import roomInterface from '../../room.interface';

export default function Room() {
  return (
    <>
      {roomAPI.map(({ name, total, current }: roomInterface) => {
        return (
          <RoomBlock key={name} name={name} total={total} current={current} />
        );
      })}
    </>
  );
}
