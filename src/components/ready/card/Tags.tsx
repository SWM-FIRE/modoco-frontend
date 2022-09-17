import styled from 'styled-components';

export default function Tags({ data }) {
  return (
    <Container>
      {data.tags.map((myTag: string) => (
        <Tag key={myTag} data-cy="ready-card-tag">
          #{myTag}
        </Tag>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
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
`;
