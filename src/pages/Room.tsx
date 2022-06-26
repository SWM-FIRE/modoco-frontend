import styled from 'styled-components';
import Screens from '../components/room/Screens';

export default function MainPage() {
  return (
    <Component>
      <Header>방번호</Header>
      <Screens />
      <Button>화면 공유 ON</Button>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: white;
`;

const Header = styled.header`
  font-size: 5rem;
`;

const Button = styled.button`
  color: white;
  cursor: pointer;
  padding: 2rem;
  width: 15rem;
  margin: 0 auto;
  font-size: 2rem;
  background-color: gray;
  border-radius: 1rem;
`;
