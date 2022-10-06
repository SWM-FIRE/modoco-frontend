import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import Block from './block/Block';
import useRooms from '../../hooks/useRooms';
import { filterData } from './filterData';
import searchInputStore from '../../stores/searchInputStore';
import EmptyBlock from './block/EmptyBlock';
import { filterMyData } from './filterMyData';
import MyBlock from './block/MyBlock';
import CreateRoom from './CreateRoom';

export default function RoomCards({
  openCreateRoom,
}: {
  openCreateRoom: () => void;
}) {
  const { searchInput } = searchInputStore();
  const { isLoading, error, data } = useRooms();

  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, searchInput);
  const newMyData = filterMyData(data);

  return (
    <Container>
      <Title>내가 만든 모도코</Title>
      <MyRoomContainer>
        {isLoading
          ? [...Array(3)].map((no, index) => (
              <EmptyBlock key={Symbol(index).toString()} isMain={false} />
            ))
          : newMyData.map((data) => {
              return (
                <MyBlock
                  key={data.itemId.toString().concat('my')}
                  data={data}
                />
              );
            })}
        <CreateRoom openCreateRoom={openCreateRoom} />
      </MyRoomContainer>
      <Title>공개</Title>
      <BlockContainer>
        {isLoading
          ? [...Array(3)].map((no, index) => (
              <EmptyBlock key={Symbol(index).toString()} isMain={false} />
            ))
          : newData.map((data) => {
              return <Block key={data.itemId} isMain data={data} />;
            })}
      </BlockContainer>
    </Container>
  );
}

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
  display: flex;
  gap: 2.8rem;
  width: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  ${media.medium} {
    gap: 2.8rem;
  }
  ${media.small} {
    gap: 1.3rem;
  }
`;

const Title = styled.h2`
  color: #fcfcfd;
  font-size: 2rem;
  font-family: IBMPlexSansKRRegular, Arial;
  margin: 5rem 0 2rem 0;
`;
