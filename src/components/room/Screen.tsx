import styled from 'styled-components';
import screenInterface from '../../interface/screen.interface';

export default function RoomBlock({ name, id }: screenInterface) {
  return (
    <Container>
      <div>{name}</div>
      <div>{id}</div>
    </Container>
  );
}

const Container = styled.video`
  border: 3px solid red;
  height: 46%;
  width: 46%;
`;
