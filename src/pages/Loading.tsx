import styled from 'styled-components';
import { ReactComponent as Loader } from '../assets/svg/loader.svg';

export default function Loading() {
  return (
    <Container>
      <SvgContainer>
        <Loader />
      </SvgContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #181818;
  justify-content: center;
`;

const SvgContainer = styled.div`
  width: 30%;
  height: 30%;
  background-color: #181818;
`;
