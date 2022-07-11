import styled from 'styled-components';

import Block from './Block';
import blockInterface from '../../interface/block.interface';
import blocksData from '../../blocks.json';
import TagStore from '../../stores/tagStore';

export default function Blocks() {
  //   useEffect(() => {
  //     const API_URL: string = process.env.REACT_APP_SERVER as string;
  //     console.log(API_URL);
  //     fetch(API_URL, {
  //       headers: {
  //         accept: 'application/json',
  //       },
  //       method: 'GET',
  //     }).then((res) => res.json().then((data) => setRooms(data)));
  //   }, []);
  const { tag } = TagStore();
  const filteredData = blocksData.filter((block) =>
    block.tags.some((blockTag) =>
      blockTag.toLowerCase().includes(tag.toLowerCase()),
    )
      ? block
      : null,
  );
  return (
    <Component>
      {filteredData.map(
        ({ avatar, nickname, title, detail, tags, itemId }: blockInterface) => {
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
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
`;
