import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';

export default function ProfileModalHeader({
  profileToggle,
}: {
  profileToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const closeProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    profileToggle(false);
  };

  return (
    <Container>
      <Close onClick={closeProfile}>
        <X />
      </Close>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2.4rem;
`;

const Close = styled.button`
  cursor: pointer;
`;
