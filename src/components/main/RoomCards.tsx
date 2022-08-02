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
        .map(({ moderator, title, details, tags, itemId }: blockInterface) => {
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
  /* margin: 10rem 10rem 14.4rem 10rem; */
  margin: 10rem auto;
  row-gap: 7.6rem;
`;
