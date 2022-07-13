import React from 'react';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useQuery } from 'react-query';
import axios from 'axios';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './Block';
import blockInterface from '../../interface/block.interface';
import TagStore from '../../stores/tagStore';

export default function Scrolls() {
  const { tag } = TagStore();

  const { isLoading, error, data } = useQuery('roomData', async () => {
    const { data } = await axios.get('https://xn--hq1br4kwqt.com/api/v1/rooms');
    return data;
  });

  if (isLoading)
    return <div style={{ color: 'white', fontSize: '10rem' }}>loading....</div>;

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
