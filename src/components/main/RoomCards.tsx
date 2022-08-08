import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import TagStore from '../../stores/tagStore';
import CreateRoom from './CreateRoom';
import { filterData } from './filterData';

export default function RoomCards() {
  const { tag } = TagStore();
  const { isLoading, error, data } = useRooms();
  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, tag);

  return (
    <Container>
      <CreateRoom />
      {newData.map((data) => {
        return <Block key={data.itemId} isMain data={data} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  /* width: calc(100% - 10rem); */
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 10rem auto;
  row-gap: 7.6rem;
`;
