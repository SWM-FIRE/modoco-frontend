import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import media from 'src/styles/media';
import useDeleteRoom from 'src/hooks/useDeleteRoom';
import UserStore from '../../../stores/userStore';
import RoomDetail from '../../atoms/RoomDetail';
import BlockDetail from './BlockDetail';
import { ReactComponent as VerticalMenu } from '../../../assets/svg/verticalMenu.svg';

export default function MyBlock({ data }) {
  const navigate = useNavigate();
  const { nickname } = UserStore();
  const [isDelete, setIsDelete] = useState(false);

  const { mutate, isLoading, isError, isSuccess } = useDeleteRoom(data?.itemId);

  if (isLoading) {
    return <>loading</>;
  }
  if (isError) return <>error</>;

  const toggleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDelete(!isDelete);
  };

  const enterRoom = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!nickname) {
      toast.error('로그인이 필요합니다');
      return;
    }
    if (isMobile) {
      toast.error('모바일에서는 접속이 불가능합니다');
      return;
    }
    if (data.current === data.total) {
      toast.error('방이 이미 가득 찼습니다');
      return;
    }
    navigate(`/ready/${data.itemId}`);
  };

  const deleteRoom = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    mutate();
    if (isSuccess) {
      console.log('successfully deleted room');
    }
  };

  return (
    <Container onClick={() => setIsDelete(false)}>
      {isDelete && <Delete onClick={deleteRoom}>방 삭제하기</Delete>}
      <Menu onClick={toggleDelete}>
        <VerticalMenu />
      </Menu>
      <BlockDetail data={data} />
      <Entering>
        <RoomDetail data={data} />
        <Enter onClick={enterRoom}>입장하기 →</Enter>
      </Entering>
    </Container>
  );
}

const Delete = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  padding: 1rem 3rem;
  background-color: #191f28;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  color: #fcfcfd;
  &:hover {
    cursor: pointer;
    background-color: #2f3a4b;
  }
`;

const Menu = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
    fill: #fcfcfd;
    &:hover {
      fill: rgba(255, 255, 255, 0.6);
    }
  }
`;

const Entering = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${media.small} {
    gap: 0.5rem;
  }
`;

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  font-size: 1.6rem;
  font-family: SFProDisplayRegular;
  color: #fcfcfd;
  border: solid 0.2rem #777e90;
  border-radius: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.02);
  }
  ${media.small} {
    width: 8.6rem;
    height: 3.2rem;
    font-size: 1.2rem;
    margin: 0.3rem 0rem;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #23262f;
  border-radius: 2rem;
  width: 29.4rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;
  box-sizing: border-box;
  ${media.xlarge} {
    width: 29.4rem;
  }
  ${media.medium} {
    width: 29.4rem;
  }
  ${media.small} {
    height: 18rem;
    width: 17rem;
    padding: 3rem 0.7rem;
  }
  ${media.xsmall} {
    height: 13rem;
    width: 12rem;
    padding: 2rem 0.7rem;
  }
  ${media.xxsmall} {
    width: 11rem;
  }
`;
