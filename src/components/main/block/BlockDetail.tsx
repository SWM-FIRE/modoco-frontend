import styled from 'styled-components';
import media from 'src/styles/media';
// import RoomDetail from '../../atoms/RoomDetail';
import Tags from './Tags';

export default function BlockDetail({ data }) {
  return (
    <DetailContainer data-cy="main-room-detail">
      <TitleContainer>
        <Title>{data.title}</Title>
      </TitleContainer>
      <DescriptionContainer>
        <Description>{data.details}</Description>
      </DescriptionContainer>
      <Tags tags={data.tags} />
    </DetailContainer>
  );
}

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 12rem;
  justify-content: space-between;
  gap: 2rem;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.small} {
    display: none;
  }
`;

const Description = styled.div`
  color: #777e90;
  font-size: 1.4rem;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #fcfcfd;
  font-size: 2.4rem;
  ${media.small} {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.6rem;
  }
`;
