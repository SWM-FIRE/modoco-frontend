import styled from 'styled-components';

export default function RoomDetail() {
  return (
    <Container>
      <Card />
      <EnterButton>입장하기 →</EnterButton>
    </Container>
  );
}

const Card = styled.div`
  width: 100%;
  height: 70%;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 3rem;
`;

const Container = styled.div`
  width: 40.6rem;
  height: 42.7rem;
  margin-top: 4rem;
`;

const EnterButton = styled.button`
  font-family: IBMPlexSansKRRegular;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 5rem;
  width: 100%;
  height: 5.5rem;
  cursor: pointer;
`;
