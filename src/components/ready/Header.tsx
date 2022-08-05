import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCreateMediaStream } from '../../hooks/useCreateMediaStream';
import { ReactComponent as LeftArrow } from '../../assets/svg/arrow-left.svg';
import UserMediaStreamStore from '../../stores/userMediaStreamStore';

export default function Header() {
  const { stopMediaStream } = useCreateMediaStream();
  const { userMediaStream } = UserMediaStreamStore();
  const navigate = useNavigate();

  const backToMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (userMediaStream) {
      stopMediaStream();
    }
    navigate(`/`);
  };
  return (
    <Container>
      <LeftArrowPosition onClick={backToMain}>
        <LeftArrow />
      </LeftArrowPosition>
    </Container>
  );
}

const LeftArrowPosition = styled.button`
  cursor: pointer;
  position: absolute;
  left: 8rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 10rem;
`;
