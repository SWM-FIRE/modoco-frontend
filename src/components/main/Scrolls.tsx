import React from 'react';
import styled from 'styled-components';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from './Arrow';
import Block from './Block';
import blockInterface from '../../interface/block.interface';
import blocksData from '../../blocks.json';
import TagStore from '../../stores/tagStore';

export default function Scrolls() {
  const { tag } = TagStore();
  const filteredData = blocksData.filter((block) =>
    block.tags.some((blockTag) =>
      blockTag.toLowerCase().includes(tag.toLowerCase()),
    )
      ? block
      : null,
  );
  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {filteredData.map(
          ({
            avatar,
            nickname,
            title,
            detail,
            tags,
            itemId,
          }: blockInterface) => {
            return (
              <Block
                itemId={itemId}
                key={nickname}
                nickname={nickname}
                avatar={avatar}
                title={title}
                detail={detail}
                tags={tags}
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
