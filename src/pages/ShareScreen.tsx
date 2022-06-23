import styled from 'styled-components';

export default function MainPage() {
  return <Container />;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(113deg, #9f9f9f 0%, #636363 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
