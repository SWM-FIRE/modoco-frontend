import React from 'react';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import { filterData } from './filterData';
import TagStore from '../../stores/searchInputStore';
import EmptyBlock from './EmptyBlock';

export default function Scrolls() {
  const { isLoading, error, data } = useRooms();
  const { searchInput } = TagStore();
  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, searchInput);

  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {isLoading
          ? [...Array(3)].map((no, index) => (
              <EmptyBlock key={Symbol(index).toString()} isMain={false} />
            ))
          : newData.map((data) => {
              return <Block key={data.itemId} isMain={false} data={data} />;
            })}
      </ScrollMenu>
    </Container>
  );
}

const Container = styled.div`
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
