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
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: ${(props) => (props.main ? '20%' : '22.5rem')};
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4.3rem 1rem;
  min-width: 29.4rem;
  ${media.small} {
    padding: 2.3rem 0.5rem;
    height: 26rem;
    min-width: 14rem;
    width: 14rem;
    margin-right: ${(props) => (props.main ? '0rem' : '1rem')};
  }
`;
