import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import media from 'src/styles/media';
import UserStore from '../../../stores/userStore';
import RoomDetail from '../../atoms/RoomDetail';
import BlockDetail from './BlockDetail';

export default function MyBlock({ data }) {
  const navigate = useNavigate();
  const { nickname } = UserStore();

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
  return (
    <Container>
      <BlockDetail data={data} />
      <Entering>
        <RoomDetail data={data} />
        <Enter onClick={enterRoom}>입장하기 →</Enter>
      </Entering>
    </Container>
  );
}

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
