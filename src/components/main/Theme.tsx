import styled from 'styled-components';
import { ReactComponent as Fire } from '../../assets/svg/Room/Fire.svg';
import { ReactComponent as Astronaut } from '../../assets/svg/Room/Astronaut.svg';
import { ReactComponent as Camping } from '../../assets/svg/Room/Camping.svg';
import { ReactComponent as Sea } from '../../assets/svg/Room/Sea.svg';
import { ReactComponent as Travel } from '../../assets/svg/Room/Travel.svg';

export default function Theme({ theme }: { theme: string }) {
  switch (theme) {
    case 'fire':
      return (
        <Component>
          <Fire />
          <Name>모닥불</Name>
        </Component>
      );
    case 'astronaut':
      return (
        <Component>
          <Astronaut />
          <Name>우주인</Name>
        </Component>
      );
    case 'camping':
      return (
        <Component>
          <Camping />
          <Name>캠핑</Name>
        </Component>
      );
    case 'sea':
      return (
        <Component>
          <Sea />
          <Name>바다</Name>
        </Component>
      );
    case 'travel':
      return (
        <Component>
          <Travel />
          <Name>여행</Name>
        </Component>
      );
    default:
      return (
        <Component>
          <Fire />
          <Name>모닥불</Name>
        </Component>
      );
  }
}

const Component = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Name = styled.span`
  font-family: IBMPlexMonoRegular;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
`;
