import styled from 'styled-components';
import youtubeSearch from '../../../interface/youtubeSearch.interface';
import SearchListItem from './SearchListItem';
import musicStore from '../../../stores/room/musicStore';

export default function YoutubeModalSearchList() {
  const { searchList, isInPlaylist, addPlaylist } = musicStore();

  return (
    <SearchList>
      {searchList.map((item: youtubeSearch) => (
        <SearchListItem
          key={item.id.videoId}
          item={item}
          isInPlaylist={isInPlaylist}
          addPlaylist={addPlaylist}
        />
      ))}
    </SearchList>
  );
}

const SearchList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 100%;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
