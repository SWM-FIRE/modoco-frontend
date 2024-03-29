import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import media from 'src/styles/media';
import Block from './block/Block';
import useRooms from '../../hooks/useRooms';
import { filterBlock } from './block/filterBlock';
import { ReactComponent as LeftArrow } from '../../assets/svg/Left.svg';
import { ReactComponent as RightArrow } from '../../assets/svg/Right.svg';
import EmptyBlock from './block/EmptyBlock';
import { filterMyBlock } from './block/filterMyBlock';
import MyBlock from './block/MyBlock';
import CreateRoom from './CreateRoom';
import MyEmptyBlock from './block/MyEmptyBlock';

export default React.memo(function RoomCards({
  openCreateRoom,
  openLoginModal,
  openRoomPasswordModal,
  searchInput,
  setRoomId,
}: {
  openCreateRoom: () => void;
  openLoginModal: () => void;
  openRoomPasswordModal: () => void;
  searchInput: string;
  setRoomId: (_id: number) => void;
}) {
  const { isLoading, error, data } = useRooms();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numOfCards, setNumOfCards] = useState(4);
  const [gutter, setGutter] = useState(28);

  const resize = () => {
    const width = window.innerWidth;
    if (width < 300) {
      setNumOfCards(1);
      setGutter(0);
    } else if (width < 500) {
      setNumOfCards(2);
      setGutter(13);
    } else if (width < 768) {
      setGutter(13);
      setNumOfCards(2);
    } else if (width < 1024) {
      setNumOfCards(2);
    } else if (width < 1300) {
      setNumOfCards(3);
    } else {
      setNumOfCards(4);
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  if (error) return <div>An error has occurred: </div>;

  const sortedBlock = filterBlock(data, searchInput);
  const sortedMyBlock = filterMyBlock(data);
  const TRUE = true;

  return (
    <Container>
      <Title>내가 만든 모도코</Title>
      <MyRoomContainer>
        <ItemsCarousel
          chevronWidth={50}
          gutter={gutter}
          numberOfCards={numOfCards}
          slidesToScroll={numOfCards}
          outsideChevron={TRUE}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={(value) => setActiveItemIndex(value)}
          rightChevron={
            <Button type="button">
              <RightArrow />
            </Button>
          }
          leftChevron={
            <Button type="button">
              <LeftArrow />
            </Button>
          }
        >
          {isLoading
            ? [...Array(1)].map((no, index) => (
                <MyEmptyBlock key={Symbol(index).toString()} />
              ))
            : sortedMyBlock.map((data) => {
                return (
                  <MyBlock
                    key={data.itemId.toString().concat('my')}
                    data={data}
                    openRoomPasswordModal={openRoomPasswordModal}
                    setRoomId={setRoomId}
                  />
                );
              })}
          <CreateRoom openCreateRoom={openCreateRoom} />
        </ItemsCarousel>
      </MyRoomContainer>
      <Title>공개</Title>
      <BlockContainer>
        {isLoading
          ? [...Array(3)].map((no, index) => (
              <EmptyBlock key={Symbol(index).toString()} isMain={false} />
            ))
          : sortedBlock.map((data) => {
              return (
                <Block
                  key={data.itemId}
                  isMain
                  data={data}
                  openLoginModal={openLoginModal}
                  openRoomPasswordModal={openRoomPasswordModal}
                  setRoomId={setRoomId}
                />
              );
            })}
      </BlockContainer>
    </Container>
  );
});

const Container = styled.div`
  width: 1260px;
  display: flex;
  flex-direction: column;
  margin: 0 auto 10rem auto;
  ${media.large} {
    width: 940px;
  }
  ${media.medium} {
    width: 618px;
  }
  ${media.small} {
    margin: 3rem 0;
    width: 360px;
  }
  ${media.xsmall} {
    width: 256px;
  }
  ${media.xxsmall} {
    width: 115px;
  }
`;

const BlockContainer = styled.div`
  display: flex;
  margin: -1.4rem;
  flex-wrap: wrap;
  row-gap: 5rem;
  ${media.large} {
    row-gap: 2rem;
  }
`;

const MyRoomContainer = styled.div`
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h2`
  color: #fcfcfd;
  font-size: 2rem;
  font-family: IBMPlexSansKRRegular, Arial;
  margin: 5rem 0 2rem 0;
`;

const Button = styled.button`
  background-color: #23262f9b;
  color: white;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #23262f;
  }
  svg {
    width: 70%;
    height: 70%;
  }
`;
