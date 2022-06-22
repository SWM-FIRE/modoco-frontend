import styled from 'styled-components';
import oc from '../styles/openColor';

export default function MainPage() {
  return <Container />;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${oc.indigo2};
`;
