import styled from 'styled-components';
import Participants from './Participants';
import { Chatting } from './Chatting';

export default function Sidebar({ messages }) {
  return (
    <Component>
      <Participants />
      <Chatting messages={messages} />
    </Component>
  );
}

const Component = styled.div`
  position: absolute;
  background-color: #29292e;
  margin: 2rem 2rem 2rem 2rem;
  border-radius: 1rem;
  padding: 3rem 2rem;
  width: 40rem;
  right: 0;
  top: 0;
  height: calc(100vh - 14rem);
`;
