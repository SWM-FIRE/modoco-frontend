import styled from 'styled-components';
import media from 'src/styles/media';

export default function NoUser() {
  return <Text>존재하지 않는 유저입니다</Text>;
}

const Text = styled.p`
  font-size: 4rem;
  color: #f1f5f9;
  ${media.small} {
    font-size: 2rem;
  }
`;
