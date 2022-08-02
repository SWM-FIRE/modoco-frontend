import React from 'react';
import styled from 'styled-components';
import Block from './Block';
import useRooms from '../../hooks/useRooms';
import blockInterface from '../../interface/block.interface';
import TagStore from '../../stores/tagStore';
import CreateRoom from './CreateRoom';

export default function RoomCards() {
  const { tag } = TagStore();
  const { isLoading, error, data } = useRooms();
  if (isLoading)
    return <div style={{ color: 'white', fontSize: '5rem' }}>loading....</div>;

  if (error) return <div>An error has occurred: </div>;

  return (
    <Container>
      <CreateRoom />
      {data
        .filter((block) =>
          block.tags.some((blockTag) =>
            blockTag.toLowerCase().includes(tag.toLowerCase()),
          )
            ? block
            : null,
        )
        .map(
          ({
            moderator,
            title,
            details,
            tags,
            itemId,
            current,
            total,
            theme,
          }: blockInterface) => {
            return (
              <Block
                isMain
                itemId={itemId}
                key={moderator.nickname}
                moderator={moderator}
                title={title}
                details={details}
                tags={tags}
                current={current}
                total={total}
                theme={theme}
              />
            );
          },
        )}
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
