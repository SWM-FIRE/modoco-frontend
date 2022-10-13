import styled from 'styled-components';
import Ready from './Ready';

export default function Overall({ isMe }) {
  return (
    <Components>
      <Title>입장했던 방</Title>
      <Ready isMe={isMe} />
    </Components>
  );
}

const Components = styled.div`
  width: 100%;
  color: #f9fafb;
`;

const Title = styled.h1`
  font-size: 4rem;
`;
