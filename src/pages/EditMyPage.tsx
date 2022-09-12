import styled from 'styled-components';
import Contents from '../components/EditPage/Contents';

export default function EditMyPage() {
  return (
    <Container>
      <Contents />
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
