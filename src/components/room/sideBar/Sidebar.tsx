import styled from 'styled-components';
import Participants from './Participants';
import Chatting from './Chatting';
import Information from './Information';

export default function Sidebar() {
  return (
    <Component>
      <Information />
      <Participants />
      <Chatting />
    </Component>
  );
}

const Component = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.chatBackground};
  margin: 2rem 0 0 2rem;
  border-radius: 1rem;
  padding: 2.4rem 2rem;
  width: 40rem;
  right: 0;
  top: 0;
  height: calc(100vh - 14rem);
`;
