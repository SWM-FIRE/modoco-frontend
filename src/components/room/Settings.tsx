import styled from 'styled-components';
import { ReactComponent as MicOff } from '../../assets/svg/MicOff.svg';
import { ReactComponent as MonitorOn } from '../../assets/svg/MonitorOn.svg';
import { ReactComponent as VolumeOn } from '../../assets/svg/VolumeOn.svg';

export default function Settings() {
  return (
    <Component>
      <Button>
        <MonitorOn />
      </Button>
      <Button>
        <MicOff />
      </Button>
      <Button>
        <VolumeOn />
      </Button>
    </Component>
  );
}

const Component = styled.div`
  margin-left: 2.4rem;
  display: flex;
  gap: 2.4rem;
`;

const Button = styled.button`
  cursor: pointer;
`;
