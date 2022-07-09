import styled from 'styled-components';

export default function Main() {
  return (
    <Container>
      <Header>
        <Logo>modoco</Logo>
        <Profile />
      </Header>
      <TitleContainer>
        <Title>모여서 도란도란</Title>
        <Title>코딩해요</Title>
      </TitleContainer>
      <Search />
      <RandomEnter />
    </Container>
  );
}

const RandomEnter = styled.div`
  width: 16.1rem;
  height: 5.4rem;
  background-color: white;
  margin-top: 4rem;
  border-radius: 6.2rem;
`;

const Search = styled.div`
  width: 52.6rem;
  height: 5.6rem;
  margin-top: 2.4rem;
  background-color: transparent;
  border-radius: 10rem;
  background-color: lightgray;
  border: solid 0.1rem #374151;
`;

const TitleContainer = styled.div`
  margin-top: 6rem;
  width: 62rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: GmarketSansTTFBold;
  font-size: 7.2rem;
  align-self: center;
  color: #ffffff;
`;

const Logo = styled.div`
  font-size: 2.4rem;
  font-family: PretendardRegular, Arial;
  position: absolute;
  left: 4rem;
`;

const Profile = styled.div`
  background-color: gray;
  right: 4rem;
  position: absolute;
  height: 4rem;
  width: 9rem;
  border-radius: 4.8rem;
`;

const Header = styled.div`
  width: 100%;
  height: 10rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
