import styled from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';

export default function Header({ data }) {
  return (
    <Container data-cy="ready-card-header">
      <AvatarControl>
        <MyAvatar num={Number(data?.moderator.avatar)} />
      </AvatarControl>
      <NameTag data-cy="ready-card-name">
        <Moderator isModerator={1}>방장</Moderator>
        <Moderator isModerator={0}>{data?.moderator.nickname}</Moderator>
      </NameTag>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  height: 4.4rem;
`;

const NameTag = styled.div`
  font-family: IBMPlexMonoRegular;
  font-size: 1.2rem;
  display: flex;
  gap: 0.2rem;
`;

const AvatarControl = styled.div`
  width: 4.4rem;
  svg {
    width: 100%;
  }
`;

const Moderator = styled.p<{ isModerator: number }>`
  color: ${(props) =>
    props.isModerator ? 'rgba(255, 255, 255, 0.5)' : '#fcfcfd'};
`;
