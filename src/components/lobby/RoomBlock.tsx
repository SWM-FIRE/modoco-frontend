import styled from 'styled-components';
import oc from '../../styles/openColor';
import roomInterface from '../../room.interface';

export default function RoomBlock({ name, total, current }: roomInterface) {
  return (
    <Container>
      <RoomName>{name}</RoomName>
      <div>
        {current} / {total}
      </div>
    </Container>
  );
}

const RoomName = styled.div`
  font-size: 5rem;
`;

const Container = styled.div`
  text-align: center;
  width: 20rem;
  height: 10rem;
  background-color: ${oc.gray3};
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 2rem;
`;
