import styled from 'styled-components';
import { ReactComponent as Divide } from '../../assets/svg/Divide.svg';

export default function About() {
  return (
    <Component>
      <RoomName>파이어캠프 코딩</RoomName>
      <Divide />
      <Num>2 / 4</Num>
    </Component>
  );
}

const Component = styled.div`
  position: absolute;
  left: 8.1rem;
  display: flex;
  align-items: center;
`;

const RoomName = styled.span`
  margin-right: 0.8rem;
`;

const Num = styled.span`
  margin-left: 0.8rem;
`;
