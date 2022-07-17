import styled from 'styled-components';
import Participants from './Participants';
import Chatting from './Chatting';

export default function Sidebar() {
  return (
    <Component>
      <Participants />
      <Chatting />
    </Component>
  );
}

const Component = styled.div`
  position: absolute;
  /* background-color: rgba(22, 29, 52, 1); */
  background-color: #29292e;
  margin: 2rem 2rem 2rem 2rem;
  border-radius: 1rem;
  padding: 3rem 2rem;
  width: 40rem;
  margin: 2rem;
  right: 0;
  top: 0;
  height: -webkit-fill-available;
`;
