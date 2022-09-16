import styled from 'styled-components';
import MyAvatar from '../../assets/avatar/MyAvatar';

export default function Avatar({ avatar, onChangeAvatar }) {
  return (
    <Container data-cy="register-avatar">
      <Label>프로필 이미지</Label>
      <ProfileComponent>
        <MyAvatar num={avatar} />
        <SetupButton
          type="button"
          onClick={onChangeAvatar}
          data-cy="register-avatar-button"
        >
          아바타 재생성
        </SetupButton>
      </ProfileComponent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
`;

const ProfileComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  margin-top: 1.2rem;
  svg {
    width: 12rem;
    height: 12rem;
  }
`;

const Label = styled.label`
  color: #b0b8c1;
  font-size: 1.4rem;
`;

const SetupButton = styled.button`
  color: #f9fafb;
  font-size: 1.4rem;
  border: 1px solid #f9fafb;
  border-radius: 5rem;
  padding: 1.6rem 2.4rem;
  cursor: pointer;
`;
