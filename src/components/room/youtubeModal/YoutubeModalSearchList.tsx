import styled from 'styled-components';
import youtubeSearch from '../../../interface/youtubeSearch.interface';
import SearchListItem from './SearchListItem';

export default function YoutubeModalSearchList({ searchList, isInPlaylist }) {
  return (
    <SearchList>
      {searchList.map((item: youtubeSearch) => (
        <SearchListItem
          key={item.id.videoId}
          item={item}
          isInPlaylist={isInPlaylist}
        />
      ))}
    </SearchList>
  );
}

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  flex-shrink: 1;
  overflow: scroll;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
