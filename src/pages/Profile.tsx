import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Contents from '../components/profile/Contents';

export default function Profile() {
  const { userId } = useParams();

  return (
    <Container>
      <Contents userId={Number(userId)} isModal={false} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
