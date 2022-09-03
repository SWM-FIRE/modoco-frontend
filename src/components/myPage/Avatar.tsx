import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Avatar({ avatar, size }) {
  return (
    <AvatarContainer size={size}>
      <MyAvatar num={Number(avatar)} />
    </AvatarContainer>
  );
}

const AvatarContainer = styled.div<{ size: number }>`
  height: ${({ size }) => size}rem;
  width: ${({ size }) => size}rem;
  margin-left: 0.3rem;
  svg {
    height: 100%;
    width: 100%;
  }
`;
