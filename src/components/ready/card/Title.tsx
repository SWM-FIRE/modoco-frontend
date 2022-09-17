import styled from 'styled-components';

export default function Title({ data }) {
  return (
    <Container data-cy="ready-card-title">
      <MainTitle data-cy="ready-card-main-title">{data.title}</MainTitle>
      <DetailTitle data-cy="ready-card-detail-title">
        {data.details}
      </DetailTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-family: IBMPlexSansKRRegular;
`;

const DetailTitle = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  color: #777e91;
`;

const MainTitle = styled.p`
  font-weight: 600;
  font-size: 2.4rem;
  color: #fcfcfd;
`;
