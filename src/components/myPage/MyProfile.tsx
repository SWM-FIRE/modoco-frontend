import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Avatar from './Avatar';
import UserStore from '../../stores/userStore';
import Group from './MyProfile/Group';
import Badge from './MyProfile/Badge';
import Edit from './MyProfile/Edit';

export default function MyProfile() {
  const { nickname, avatar } = UserStore((state) => state);
  const navigate = useNavigate();

  const onClickEditProfile = () => {
    navigate('/editProfile');
  };

  const onLogOut = () => {
    localStorage.removeItem('access_token');
    navigate(`/`);
    toast.success('로그아웃 되었습니다');
  };

  return (
    <Components>
      <EditButton onClick={onClickEditProfile}>
        <Edit />
      </EditButton>
      <Avatar avatar={avatar} size={12} />
      <Contents>
        <Nickname>{nickname}</Nickname>
        <Group />
        <Description>자기소개</Description>
        <Badge />
        <Logout onClick={onLogOut}>로그아웃</Logout>
      </Contents>
    </Components>
  );
}

const Components = styled.div`
  background-color: #23262f;
  width: 92.5rem;
  border-radius: 2rem;
  position: relative;
  display: flex;
  padding: 3.2rem;
  gap: 5.6rem;
  /* @media screen and (max-width: 96rem) {
    width: 100%;
    min-width: 63.6rem;
  } */
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const EditButton = styled.button`
  cursor: pointer;
`;

const Nickname = styled.h1`
  font-size: 4rem;
  font-family: IBMPlexMonoRegular;
  color: #f1f5f9;
`;

const Description = styled.p`
  color: #e2e8f0;
  font-size: 1.4rem;
  font-weight: 400;
  padding-top: 2rem;
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
`;
