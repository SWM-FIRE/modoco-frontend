import React from 'react';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import { filterData } from './filterData';
import Loading from '../atoms/Loading';
import TagStore from '../../stores/searchInputStore';

export default function Scrolls() {
  const { isLoading, error, data } = useRooms();
  const { searchInput } = TagStore();
  if (isLoading)
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );

  if (error) return <div>An error has occurred: </div>;

  const newData = filterData(data, searchInput);

  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {newData.map((data) => {
          return <Block key={data.itemId} isMain={false} data={data} />;
        })}
      </ScrollMenu>
    </Container>
  );
}

const LoadingContainer = styled.div`
  margin-top: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
