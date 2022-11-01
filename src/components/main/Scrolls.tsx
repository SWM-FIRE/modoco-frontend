import React from 'react';
import media from 'src/styles/media';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './block/Block';
import useRooms from '../../hooks/useRooms';
import { filterBlock } from './block/filterBlock';
import TagStore from '../../stores/searchInputStore';
import EmptyBlock from './block/EmptyBlock';

export default function Scrolls({ openLoginModal, openRoomPasswordModal }) {
  const { isLoading, error, data } = useRooms();
  const { searchInput } = TagStore();
  if (error) return <div>An error has occurred: </div>;
  const filteredBlock = filterBlock(data, searchInput);

  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {isLoading
          ? [...Array(3)].map((no, index) => (
              <EmptyBlock key={Symbol(index).toString()} isMain={false} />
            ))
          : filteredBlock.map((data) => {
              return (
                <Block
                  key={data.itemId}
                  isMain={false}
                  data={data}
                  openRoomPasswordModal={openRoomPasswordModal}
                  openLoginModal={openLoginModal}
                  setRoomId={null}
                />
              );
            })}
      </ScrollMenu>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 3.6rem;
  width: calc(100% - 10rem);
  overflow: hidden;
  align-self: start;
  margin-left: 10rem;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  ${media.xlarge} {
    margin-left: 5rem;
    width: calc(100% - 5rem);
  }
  ${media.small} {
    margin-left: 1rem;
    width: calc(100% - 2rem);
  }
`;
