import React from 'react';
import styled from 'styled-components';
import { ReactComponent as WhiteYoutube } from '../../../assets/svg/WhiteYoutube.svg';

export default function YoutubeModalHeader() {
  return (
    <Header>
      <SvgComponent>
        <WhiteYoutube />
      </SvgComponent>
      <Title>유튜브 목록</Title>
    </Header>
  );
}

const Header = styled.div`
  position: relative;
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const Title = styled.div`
  color: #f9fafb;
  font-size: 1.6rem;
`;

const SvgComponent = styled.div`
  width: 3.4rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
  }
`;
