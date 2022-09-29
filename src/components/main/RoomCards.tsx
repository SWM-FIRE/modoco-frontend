import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import Block from './block/Block';
import useRooms from '../../hooks/useRooms';
import CreateRoom from './CreateRoom';
import { filterData } from './filterData';
import searchInputStore from '../../stores/searchInputStore';
import EmptyBlock from './block/EmptyBlock';

export default function RoomCards({
  openCreateRoom,
}: {
  openCreateRoom: () => void;
}) {
  const { searchInput } = searchInputStore();
  const { isLoading, error, data } = useRooms();

  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, searchInput);

  return (
    <Container>
      <BlockContainer>
        <CreateRoom openCreateRoom={openCreateRoom} />
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
  margin: 10rem auto;
  ${media.large} {
    width: 940px;
  }
  ${media.medium} {
    width: 618px;
  }
  ${media.small} {
    margin: 3rem 0;
    align-items: center;
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
  row-gap: 7rem;
  ${media.large} {
    row-gap: 2rem;
  }
`;
