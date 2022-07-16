import styled from 'styled-components';
import { ReactComponent as DevelopingSocialNetwork } from '../../../assets/svg/DevelopingSocialNetwork.svg';

export default function WhatIsModoco() {
  return (
    <Container>
      <DevelopingSocialNetwork />
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
  width: 36.9rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12.7rem;
  margin-top: 15rem;
`;

const ModocoTitle = styled.div`
  font-size: 5.2rem;
  font-weight: 600;
  font-family: IBMPlexSansKRRegular;
`;