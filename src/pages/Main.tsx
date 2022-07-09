import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

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
      <ScrollContainer>
        <ScrollMenu>
          <Block />
          <Block />
          <Block />
          <Block />
        </ScrollMenu>
      </ScrollContainer>
    </Container>
  );
}

const ScrollContainer = styled.div`
  margin-top: 3.6rem;
  width: calc(100% - 10rem);
  overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  align-self: start;
  margin-left: 10rem;
`;

const Block = styled.div`
  background-color: gray;
  margin-right: 2.4rem;
  border-radius: 2rem;
  width: 34rem;
  height: 50rem;
`;

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
  position: absolute;
  width: 9.2rem;
  height: 2.2rem;
  font-family: PretendardRegular, Arial;
  color: white;
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
  width: 100vw;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid #2b2e41 0.1rem;
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: calc(100vw - 20px);
  height: 140vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
