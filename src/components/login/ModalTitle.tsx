import React from 'react';
import styled from 'styled-components';

export default function ModalTitle() {
  return (
    <Message>
      <TitleLogo>
        모여서 도란도란 코딩, <span>Modoco</span>
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
  font-size: 1.8rem;
  font-family: IBMPlexSansKRRegular;
  font-weight: 400;
  span {
    font-weight: 600;
  }
`;

const TitleStart = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-size: 4rem;
  margin-top: 1.6rem;
`;
