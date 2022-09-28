import styled from 'styled-components';
import media from '../../styles/media';

export default function ModocoLogo({ event }: { event: () => void }) {
  const left = '<';
  const right = '/>';
  return (
    <LogoContainer onClick={event} data-cy="modoco-logo">
      <Logo>{left}</Logo>
      <LogoColor>modoco</LogoColor>
      <Logo>{right}</Logo>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  display: flex;
  font-size: 3.2rem;
  font-family: IBMPlexSansKRRegular, Arial;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 700;
  gap: 0.4rem;
`;

const Logo = styled.h1`
  color: rgba(255, 255, 255, 0.6);
  ${media.small} {
    font-size: 2.4rem;
  }
`;

const LogoColor = styled.h1`
  color: white;
  ${media.small} {
    font-size: 2.4rem;
  }
`;
