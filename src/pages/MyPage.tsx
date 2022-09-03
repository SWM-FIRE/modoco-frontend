import styled from 'styled-components';
import Header from '../components/main/Header';
import MyProfile from '../components/myPage/MyProfile';
import Friends from '../components/myPage/Friends';
import Statistics from '../components/myPage/Statistics';
import Overall from '../components/myPage/Overall';

export default function MyPage() {
  return (
    <Container>
      <Header />
      <Contents>
        <MyInformation>
          <MyProfile />
          <Statistics />
          <Overall />
        </MyInformation>
        <Friends />
      </Contents>
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

const Contents = styled.div`
  display: flex;
  gap: 4.5rem;
  padding: 4.4rem 10rem;
`;

const MyInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  align-items: center;
  /* @media (max-width: 96rem) {
    flex-direction: column;
    padding: 0 4rem;
  } */
`;
