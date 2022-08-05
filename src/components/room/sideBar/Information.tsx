import styled from 'styled-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../../../hooks/useRoom';
import { ReactComponent as RightTwoArrows } from '../../../assets/svg/Room/RightTwoArrows.svg';
import { ReactComponent as Chatting } from '../../../assets/svg/Room/Chatting.svg';
import { ReactComponent as LongBar } from '../../../assets/svg/Room/LongBar.svg';

import controlSidebar from '../../../stores/controlSidebar';

export default function Information() {
  const { roomId } = useParams();
  const { data } = useRoom(roomId);
  const { closeSidebar } = controlSidebar();

  const onCotrolSidebarClick = () => {
    closeSidebar();
  };

  return (
    <Component>
      <ControlSidebar onClick={onCotrolSidebarClick}>
        <RightTwoArrows />
        <Chatting />
      </ControlSidebar>
      <RoomTitle>{data.title}</RoomTitle>
      <LongBar />
      <Number>
        <Current>{data.current}</Current>/<Total>{data.total}</Total>
      </Number>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  color: #f9fafb;
  font-size: 1.8rem;
  gap: 0.8rem;
`;

const ControlSidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  cursor: pointer;
`;

const RoomTitle = styled.div`
  padding-left: 0.3rem;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Current = styled.span``;

const Total = styled.span``;
