import styled from 'styled-components';
import media from 'src/styles/media';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Avatar({ avatar, size }) {
  return (
    <AvatarContainer size={size}>
      <MyAvatar num={avatar} />
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ size }) => size}rem;
  width: ${({ size }) => size}rem;
  min-width: ${({ size }) => size}rem;
  svg {
    height: 100%;
    width: 100%;
  }
  ${media.small} {
    width: 8rem;
    min-width: 8rem;
  }
`;
