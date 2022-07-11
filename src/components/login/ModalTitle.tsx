import React from 'react';
import styled from 'styled-components';

export default function ModalTitle() {
  return (
    <Message>
      <TitleLogo>
        모여서 도란도란 코딩,<span>Modoco</span>
      </TitleLogo>
      <TitleStart>시작하기</TitleStart>
    </Message>
  );
}

const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  z-index: 1001;
`;

const TitleLogo = styled.div`
  font-size: 18px;
  font-family: IBMPlexMonoRegular;
`;

const TitleStart = styled.div`
  font-family: PretendardRegular;
  font-weight: 500;
  font-size: 4rem;
  margin-top: 2rem;
`;
