import { useRef } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function Tags({ tags }) {
  const ref = useRef(null);
  const isOverflow = ref.current?.clientWidth < ref.current?.scrollWidth;

  return (
    <TagContainer ref={ref} isOverflow={isOverflow}>
      {tags.map((myTag) => (
        <Tag key={Symbol(myTag).toString()}>#{myTag}</Tag>
      ))}
    </TagContainer>
  );
}

const TagContainer = styled.div<{ isOverflow: boolean }>`
  display: flex;
  gap: 1rem;
  justify-content: ${({ isOverflow }) =>
    isOverflow ? 'flex-start' : 'center'};
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 3.1rem;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.small} {
    display: none;
  }
`;

const Tag = styled.div`
  padding: 0 1rem;
  height: 3.1rem;
  color: #45b26b;
  background-color: rgba(69, 178, 107, 0.1);
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.small} {
    padding: 0 0.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;
