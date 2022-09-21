import styled from 'styled-components';

export default function LoadingSkeleton() {
  return (
    <Container>
      <Header />
      <Title />
      <Desc />
      <Tags>
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </Tags>
      <Desc />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 3.2rem 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  height: 4.4rem;
  width: 15rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Tags = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Tag = styled.div`
  padding: 0 1rem;
  height: 3.1rem;
  width: 6rem;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Title = styled.div`
  margin-top: 4rem;
  width: 10rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
`;

const Desc = styled.div`
  margin-top: 1.65rem;
  width: 20rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
`;
