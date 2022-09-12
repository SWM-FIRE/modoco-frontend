import styled from 'styled-components';
import MyPageForm from '../components/signUp/MyPageForm';

export default function MyPage() {
  return (
    <>
      <Component />
      <MyPageForm />
    </>
  );
}

const Component = styled.div`
  background-color: #18181b;
  width: 100vw;
  margin: 0;
  padding: 0;
`;
