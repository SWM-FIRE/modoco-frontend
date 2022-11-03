import styled from 'styled-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import useRoom from '../../../hooks/useRoom';
import { ReactComponent as RightTwoArrows } from '../../../assets/svg/Room/RightTwoArrows.svg';
import { ReactComponent as Chatting } from '../../../assets/svg/Room/Chatting.svg';
import { ReactComponent as LongBar } from '../../../assets/svg/Room/LongBar.svg';
import roomModalStore from '../../../stores/room/roomModalStore';

export default function Information() {
  const { roomId } = useParams();
  const { data } = useRoom(roomId);
  const { toggleSidebarModal, toggleInviteModal } = roomModalStore();

  const onControlSidebarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleSidebarModal();
  };

  const onControlInviteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggleInviteModal();
  };

  return (
    <Component>
      <InformationComponent>
        <ControlSidebar onClick={onControlSidebarClick}>
          <RightTwoArrows />
          <Chatting />
        </ControlSidebar>
        <RoomTitle>{data.title}</RoomTitle>
        <LongBar />
        <Number>
          {data.current} / {data.total}
        </Number>
      </InformationComponent>
      <InviteButton onClick={onControlInviteClick}>초대링크</InviteButton>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  color: #f9fafb;
  font-size: 1.8rem;
  font-family: IBMPlexSansKRRegular;
`;

const InformationComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const InviteButton = styled.button`
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  &:hover {
    text-decoration: underline;
  }
`;

const ControlSidebar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  cursor: pointer;
  z-index: 999;
  &:hover {
    opacity: 0.7;
  }
`;

const RoomTitle = styled.div`
  padding-left: 0.3rem;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

// const Current = styled.span``;

// const Total = styled.span``;
