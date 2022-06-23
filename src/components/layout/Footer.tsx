import styled from 'styled-components';
import oc from '../../styles/openColor';

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <span>&copy; {new Date().getFullYear()} by FIRE </span>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  bottom: 0;
  background-color: ${oc.white};
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem;

  span {
    font-size: 1.5rem;
  }
`;
