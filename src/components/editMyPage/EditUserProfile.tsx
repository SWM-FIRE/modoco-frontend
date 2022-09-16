import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditAvatar from './EditUserProfile/EditAvatar';
import Badge from '../profile/UserProfile/Badge';
import EditGroup from './EditUserProfile/EditGroup';
import useChangeProfile from '../../hooks/useChangeProfile';
import EditNickname from './EditUserProfile/EditNickname';
import EditDescription from './EditUserProfile/EditDescription';

export default function EditUserProfile() {
  const { userId } = useParams();
  const { inputs, onChange, onSubmit, onChangeAvatar, isDisable } =
    useChangeProfile();
  const { avatar, nickname, description } = inputs;

  const navigate = useNavigate();

  const onClickButton = () => {
    navigate(`/profile/${userId}`);
  };

  const onLogOut = () => {
    localStorage.removeItem('access_token');
    navigate(`/`);
    toast.success('로그아웃 되었습니다');
  };

  return (
    <Form onSubmit={onSubmit}>
      <EditAvatar avatar={avatar} onChangeAvatar={onChangeAvatar} />
      <Contents>
        <EditNickname nickname={nickname} onChange={onChange} />
        <OAuthId>@tempOAuth</OAuthId>
        <EditGroup />
        <EditDescription description={description} onChange={onChange} />
        <Badge />
        <Logout onClick={onLogOut}>로그아웃</Logout>
      </Contents>
      <Buttons>
        <Button onClick={onClickButton} type="button">
          취소
        </Button>
        <Button id="accept" disabled={isDisable()}>
          저장
        </Button>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  background-color: #23262f;
  width: 70%;
  border-radius: 2rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 3.2rem;
  gap: 5.6rem;
  min-width: 55rem;
  @media (max-width: 1200px) {
    gap: 3rem;
  }
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const Contents = styled.div`
  flex-grow: 1;
`;

const Buttons = styled.div`
  position: absolute;
  right: 3.2rem;
  top: 3.2rem;
  #accept {
    margin-left: 0.8rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  color: #f3f4f6;
  font-size: 1.5rem;
  border-radius: 5rem;
  border: 1px solid #f9fafb;
  padding: 0.8rem 1.6rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const OAuthId = styled.span`
  color: #f9fafb;
  font-family: IBMPlexMonoRegular;
  font-size: 1.4rem;
`;

const Logout = styled.button`
  color: #f9fafb;
  border-radius: 5rem;
  border: 1px solid #f9fafb;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  font-size: 1.5rem;
  margin-top: 2rem;
  width: 8.6rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
