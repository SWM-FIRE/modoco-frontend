import styled from 'styled-components';
import Level from './Level';

export default function Badge() {
  return (
    <Components>
      <Level level={1} lowerLevel={1} />
      <Level level={2} lowerLevel={2} />
      <Level level={3} lowerLevel={3} />
      <Level level={4} lowerLevel={4} />
      {/* <Level level={5} lowerLevel={5} /> */}
    </Components>
  );
}

const Components = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3.2rem;
`;
