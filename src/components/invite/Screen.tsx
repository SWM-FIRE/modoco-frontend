import styled from 'styled-components';
import { ReactComponent as MicOff } from '../../assets/svg/MicOff.svg';
import { ReactComponent as MonitorOff } from '../../assets/svg/MonitorOff.svg';

export default function Screen() {
  return (
    <Container>
      <Settings />
      <MyScreen />
      <Buttons>
        <Button>
          <MonitorOff />
        </Button>
        <Button>
          <MicOff />
        </Button>
      </Buttons>
    </Container>
  );
}

const Settings = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 62.4rem;
  height: 100%;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const Button = styled.button`
  cursor: pointer;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 5rem;
  border: 0.15rem solid rgba(255, 255, 255, 0.4);
`;

const MyScreen = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  height: 40.4rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
`;
