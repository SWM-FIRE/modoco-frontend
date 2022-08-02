import React from 'react';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import blockInterface from '../../interface/block.interface';
import TagStore from '../../stores/tagStore';

export default function Scrolls() {
  const { tag } = TagStore();
  const { isLoading, error, data } = useRooms();
  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data
          .filter((block) =>
            block.tags.some((blockTag) =>
              blockTag.toLowerCase().includes(tag.toLowerCase()),
            )
              ? block
              : null,
          )
          .map(
            ({ moderator, title, details, tags, itemId }: blockInterface) => {
              return (
                <Block
                  itemId={itemId}
                  key={moderator.nickname}
                  moderator={moderator}
                  title={title}
                  details={details}
                  tags={tags}
                  current={0}
                  total={0}
                  theme="바다"
                />
              );
            },
          )}
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
