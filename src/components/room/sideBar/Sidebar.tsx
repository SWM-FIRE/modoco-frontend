import React, { useEffect } from 'react';
import styled from 'styled-components';
import Participants from './Participants';
import Chatting from './Chatting';
import Information from './Information';
import ModalPortal from '../../atoms/ModalPortal';
import receiveNewMessageStore from '../../../stores/room/receiveNewMessageStore';

export default function SidebarMemo({ moderator }: { moderator: number }) {
  const { setIsReceiveNewMessage } = receiveNewMessageStore();
  useEffect(() => {
    setIsReceiveNewMessage(false);
  }, []);
  return (
    <ModalPortal>
      <Component>
        <Information />
        <Participants moderator={moderator} />
        <Chatting />
      </Component>
    </ModalPortal>
  );
}

export const Sidebar = React.memo(SidebarMemo);

const Component = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.chatBackground};
  margin: 1.6rem 0 2rem 2rem;
  border-radius: 1rem 0 0 1rem;
  padding: 2rem 1.4rem;
  width: 40rem;
  right: 0;
  top: 10rem;
  height: calc(100vh - 14rem);
  z-index: 2;
  box-shadow: 0px 4px 59px rgba(50, 50, 71, 0.3);
`;
