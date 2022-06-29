import styled from 'styled-components';
import screenAPI from '../../screens.json';
import Screen from './Screen';
import screenInterface from '../../interface/screen.interface';

export default function Screens() {
  return (
    <Container>
      {screenAPI.map(({ name, id }: screenInterface) => {
        return <Screen key={id} name={name} id={id} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;
  margin: 0 auto;
  width: 86%;
  height: 86%;
`;
