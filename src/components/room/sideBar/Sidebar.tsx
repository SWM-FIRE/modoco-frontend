import styled from 'styled-components';
import Participants from './Participants';
import Chatting from './Chatting';
import Information from './Information';
import ModalPortal from '../../atoms/ModalPortal';

export default function Sidebar() {
  return (
    <ModalPortal>
      <Component>
        <Information />
        <Participants />
        <Chatting />
      </Component>
    </ModalPortal>
  );
}

const Component = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.chatBackground};
  margin: 2rem 0 2rem 2rem;
  border-radius: 1rem 0 0 1rem;
  padding: 2.4rem 2rem;
  width: 40rem;
  right: 0;
  top: 10rem;
  height: calc(100vh - 14rem);
  z-index: 999;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
`;
