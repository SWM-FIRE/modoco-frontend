import styled from 'styled-components';
import media from 'src/styles/media';

export default function EmptyBlock({ isMain }) {
  return (
    <Container main={isMain}>
      <AvatarContainer />
      <DetailContainer />
      <Enter />
    </Container>
  );
}

const Enter = styled.button`
  width: 12.6rem;
  height: 4.8rem;
  border-radius: 9rem;
  background-color: rgba(255, 255, 255, 0.1);
  ${media.small} {
    width: 8.6rem;
    height: 3.2rem;
    font-size: 1.2rem;
    margin: 1rem 0rem;
  }
`;

const DetailContainer = styled.div`
  height: 18.8rem;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1.6rem;
  gap: 2rem;
  ${media.small} {
    height: 8rem;
  }
`;

const AvatarContainer = styled.div`
  height: 11.4rem;
  width: 50%;
  border-radius: 1.6rem;
  background-color: rgba(255, 255, 255, 0.1);
  gap: 1.6rem;
  ${media.small} {
    height: 6rem;
  }
`;

const Container = styled.div<{ main: boolean }>`
  background-color: #23262f;
  border-radius: 2rem;
  width: 29.4rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;

  // margin
  margin: 1.4rem 2.8rem 1.4rem 0;
  ${media.xlarge} {
    width: 29.4rem;
  }
  ${media.medium} {
    width: 29.4rem;
  }
  ${media.small} {
    height: 26rem;
    width: 18rem;
    margin: 0.7rem 1.4rem 0.7rem 0;
    padding: 3rem 0.7rem;
  }
  ${media.xsmall} {
    height: 20rem;
    width: 12.8rem;
    padding: 2rem 0.7rem;
  }
`;
