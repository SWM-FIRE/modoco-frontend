import styled from 'styled-components';
import media from 'src/styles/media';

export default function Tags({ tags }) {
  return (
    <TagContainer>
      {tags.map((myTag) => (
        <Tag key={Symbol(myTag).toString()}>#{myTag}</Tag>
      ))}
    </TagContainer>
  );
}

const TagContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
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
