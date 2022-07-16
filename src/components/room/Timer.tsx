import styled from 'styled-components';
import { ReactComponent as Divide } from '../../assets/svg/Divide.svg';

export default function Timer() {
  return (
    <Component>
      <Status />
      <Hour>03</Hour> : <Minute>17</Minute>
      <Divide />
    </Component>
  );
}

const Component = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Status = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  background-color: #ef4444;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.8rem;
`;

const Hour = styled.span`
  margin-right: 0.3rem; ;
`;

const Minute = styled.span`
  margin: 0 2.2rem 0 0.3rem;
`;
