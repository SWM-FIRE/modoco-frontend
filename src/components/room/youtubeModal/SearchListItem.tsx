import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Check } from '../../../assets/svg/Check.svg';
import { ReactComponent as Plus } from '../../../assets/svg/Plus.svg';
import youtubeSearch from '../../../interface/youtubeSearch.interface';
import { selectVideo } from '../../../adapters/youtubeSocket';

const calculateTitle = (title: string) => {
  if (title.length > 45) {
    return `${title.slice(0, 45)}...`;
  }
  return title;
};

export default React.memo(function SearchListItem({
  roomId,
  item,
  isInPlaylist,
}: {
  roomId: string;
  item: youtubeSearch;
  isInPlaylist: (_video: youtubeSearch) => boolean;
}) {
  const isAdded = isInPlaylist(item);
  const title = calculateTitle(item.snippet.title);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isAdded) {
      selectVideo(roomId, item);
    }
  };

  return (
    <Component>
      <VideoComponent isAdded={isAdded}>
        <InnerComponent
          isAdded={isAdded}
          id={!isAdded ? 'addVideoButton' : ''}
          onClick={onClick}
        >
          <SvgComponent isAdded={isAdded}>
            {isAdded ? <Check /> : <Plus />}
          </SvgComponent>
        </InnerComponent>
        <Image src={item.snippet.thumbnails.medium.url} />
      </VideoComponent>
      <TitleComponent>
        <Title>{title}</Title>
      </TitleComponent>
    </Component>
  );
});

const Component = styled.div`
  border-radius: 0.6rem;
`;

const VideoComponent = styled.div<{ isAdded: boolean }>`
  position: relative;
  width: 100%;
  height: 10rem;
  background-color: ${({ isAdded }) =>
    isAdded ? 'rgba(55, 65, 81, 1)' : 'rgba(55, 65, 81, 0.5)'};
  &:hover {
    #addVideoButton {
      display: flex;
    }
  }
  border-radius: 0.6rem 0.6rem 0 0;
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
  border-radius: 0.6rem 0.6rem 0 0;
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
  border-radius: 0.6rem 0.6rem 0 0;
`;

const TitleComponent = styled.div`
  background-color: #3b3a3a91;
  padding: 0.5rem;
  width: 100%;
  height: 4rem;
  border-radius: 0 0 0.6rem 0.6rem;
`;

const Title = styled.div`
  color: white;
  font-size: 1rem;
  word-break: break-all;
`;
