import styled from 'styled-components';
import WhatIsModoco from './WhatIsModoco';
import Problems from './Problems';
import GiveWhat from './GiveWhat';

export default function LandingPage() {
  return (
    <Container>
      <WhatIsModoco />
      <Problems />
      <GiveWhat />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;
