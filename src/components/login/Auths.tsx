import styled from 'styled-components';
import media from 'src/styles/media';
import OAuthBox from './OAuthBox';

export default function Auths() {
  return (
    <Container>
      <OAuthBox auth="github" />
      <OAuthBox auth="kakao" />
      <OAuthBox auth="google" />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${media.small} {
    flex-direction: row;
    gap: 2rem;
  }
`;
