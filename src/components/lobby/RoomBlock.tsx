import styled from 'styled-components';
import oc from '../../styles/openColor';
import roomInterface from '../../room.interface';

export default function RoomBlock({ name, total, current }: roomInterface) {
  return (
    <Container>
      <div>{name}</div>
      <div>
        {current} / {total}
      </div>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  width: 10rem;
  height: 5rem;
  background-color: ${oc.gray2};
  margin-top: 1rem;
  border-radius: 2rem;
`;
