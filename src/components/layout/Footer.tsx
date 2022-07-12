import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <div style={{ color: 'white' }}>
          {' '}
          &copy; {new Date().getFullYear()} by FIRE{' '}
        </div>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  bottom: 0;
  background-color: black;
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
