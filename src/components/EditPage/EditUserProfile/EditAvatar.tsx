import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';

export default function EditAvatar({ avatar, onChangeAvatar }) {
  return (
    <Component>
      <Avatar avatar={avatar} size={12} />
      <SetupButton type="button" onClick={onChangeAvatar}>
        아바타 <br /> 재생성
      </SetupButton>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  @media (max-width: 1070px) {
    width: 15%;
    svg {
      width: 70%;
      height: 70%;
    }
  }
`;

const SetupButton = styled.button`
  color: #f9fafb;
  font-size: 1.4rem;
  border: 1px solid #f9fafb;
  border-radius: 5rem;
  padding: 1.6rem 2.4rem;
  cursor: pointer;
  @media (max-width: 1070px) {
    padding: 1rem 1.4rem;
  }
`;
