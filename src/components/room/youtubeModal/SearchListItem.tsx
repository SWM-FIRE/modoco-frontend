import styled from 'styled-components';
import { ReactComponent as Check } from '../../../assets/svg/Check.svg';
import { ReactComponent as Plus } from '../../../assets/svg/Plus.svg';
import youtubeSearch from '../../../interface/youtubeSearch.interface';

export default function SearchListItem({
  item,
  isInPlaylist,
}: {
  item: youtubeSearch;
  isInPlaylist: (_item: youtubeSearch) => boolean;
}) {
  const isAdded = isInPlaylist(item);

  return (
    <VideoComponent isAdded={isAdded}>
      <TitleComponent>
        <Title>{item.snippet.title}</Title>
      </TitleComponent>
      <InnerComponent isAdded={isAdded} id={!isAdded ? 'addVideoButton' : ''}>
        <SvgComponent isAdded={isAdded}>
          {isAdded ? <Check /> : <Plus />}
        </SvgComponent>
      </InnerComponent>
      <Image src={item.snippet.thumbnails.medium.url} />
    </VideoComponent>
  );
}

const VideoComponent = styled.div<{ isAdded: boolean }>`
  position: relative;
  width: 100%;
  height: 12rem;
  background-color: ${({ isAdded }) =>
    isAdded ? 'rgba(55, 65, 81, 1)' : 'rgba(55, 65, 81, 0.5)'};
  &:hover {
    #addVideoButton {
      display: grid;
    }
  }
  #addVideoButton {
    cursor: pointer;
  }
`;

const InnerComponent = styled.div<{ isAdded: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ isAdded }) => (isAdded ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
`;

const SvgComponent = styled.div<{ isAdded: boolean }>`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isAdded }) => (isAdded ? '#00c113' : '#3C3C3C')};
  border-radius: 50%;
  svg {
    width: 60%;
    height: 60%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const TitleComponent = styled.div`
  position: absolute;
  background-color: #000000c6;
  bottom: 0rem;
  width: 100%;
`;

const Title = styled.div`
  color: white;
  font-size: 1rem;
`;
