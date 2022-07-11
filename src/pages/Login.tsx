import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import vectors from '../components/atoms/Vectors';
import Blocks from '../components/lobby/Blocks';
import Search from '../components/lobby/Search';
import InputNickname from '../components/login/InputNickname';
import Modal from '../components/layout/Modal';

export default function Main() {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(true);
  const closeModalHandler = () => {
    setIsModal(false);
  };

  // const openModalHandler = () => {
  //   setIsModal(true);
  // };

  const randomEnter = () => {
    navigate(`/room/random`);
  };
  return (
    <Container>
      <Header>
        <Logo>modoco</Logo>
        <Profile />
      </Header>
      <TitleContainer>
        <Vector src={vectors.Circle} left={15} top={61} size={7} />
        <Vector src={vectors.Z} left={10} top={23} size={11} />
        <Vector src={vectors.Triangle} left={85} top={18} size={10} />
        <Vector src={vectors.Plus} left={84} top={58} size={11} />
        <TitleFlex>
          <Title color="ffffff">모여서</Title>
          <Title color="96CEB4">도란도란</Title>
        </TitleFlex>
        <Title color="ffffff">코딩해요</Title>
        <Search />
        <RandomEnter onClick={randomEnter}>랜덤 입장</RandomEnter>
      </TitleContainer>
      <ScrollContainer>
        <ScrollMenu>
          <Blocks />
        </ScrollMenu>
      </ScrollContainer>
      {isModal && (
        <Modal modalHandler={closeModalHandler}>
          <InputNickname modalHandler={closeModalHandler} />
        </Modal>
      )}
    </Container>
  );
}

interface Position {
  size?: number;
  left?: number;
  top: number;
  right?: number;
}

const TitleFlex = styled.div`
  display: flex;
  z-index: 999;
`;

const Vector = styled.img<Position>`
  position: absolute;
  width: ${(props) => props.size}rem;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
`;

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

const RandomEnter = styled.button`
  width: 16.1rem;
  height: 5.4rem;
  background-color: white;
  margin-top: 4rem;
  border-radius: 6.2rem;
  cursor: pointer;
  color: black;
  font-size: 1.8rem;
  font-family: JostRegular;
  font-weight: 700;
`;

const TitleContainer = styled.div`
  margin-top: 6rem;
  width: 62rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1<{ color: string }>`
  font-family: GmarketSansTTFBold;
  margin-left: 2rem;
  font-size: 7.2rem;
  align-self: center;
  color: #${(props) => props.color};
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
  width: 100vw;
  height: 140vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181b;
`;
