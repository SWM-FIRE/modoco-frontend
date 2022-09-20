import styled from 'styled-components';
import media from 'src/styles/media';
import { ReactComponent as DevelopingSocialNetwork } from '../../../assets/svg/DevelopingSocialNetwork.svg';

export default function WhatIsModoco() {
  return (
    <Container data-cy="landing-whatIsModoco">
      <SvgContainer>
        <DevelopingSocialNetwork />
      </SvgContainer>
      <ModocoContainer>
        <ModocoTitle>모도코란?</ModocoTitle>
        <Explain>
          모도코(모여서 도란도란 코딩)는
          <br />
          모각코를 하고 싶은 사람들이 모여
          <br />
          도란도란 코딩할 수 있게 해주는 플랫폼입니다.
        </Explain>
      </ModocoContainer>
    </Container>
  );
}

const Explain = styled.div`
  font-family: IBMPlexSansKRRegular;
  font-weight: 500;
  font-size: 2rem;
`;

const ModocoContainer = styled.div`
  color: #fcfcf9;
  display: flex;
  flex-direction: column;
  @media (max-width: 1440px) {
    margin-right: 20%;
  }
  ${media.small} {
    margin-right: 0;
  }
`;

const Container = styled.div`
  display: flex;
  @media (max-width: 1440px) {
    flex-direction: column-reverse;
    gap: 0rem;
  }
  justify-content: center;
  align-items: center;
  gap: 12.7rem;
  margin-top: 15rem;
  ${media.small} {
    margin-top: 5rem;
    padding: 10%;
  }
`;

const ModocoTitle = styled.div`
  font-size: 5.2rem;
  font-weight: 600;
  font-family: IBMPlexSansKRRegular;
`;

const SvgContainer = styled.div`
  @media (max-width: 1440px) {
    margin-left: 20%;
  }
  ${media.small} {
    width: 70vw;
    height: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
