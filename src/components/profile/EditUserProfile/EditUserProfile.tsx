/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import media from 'src/styles/media';
import EditAvatar from './EditAvatar';
import Badge from '../UserProfile/Badge';
import EditGroup from './EditGroup';
import useChangeProfile from '../../../hooks/useChangeProfile';
import EditNickname from './EditNickname';
import EditDescription from './EditDescription';
import UserStore from '../../../stores/userStore';
import EditLinks from './EditLinks';
import lobbySocket, { deleteSocket } from '../../../adapters/lobbySocket';

export default function EditUserProfile({ setIsEdit }) {
  const {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
    onEnterGroup,
  } = useChangeProfile();
  const {
    avatar,
    nickname,
    description,
    group,
    github_link,
    blog_link,
    email,
    newGroup,
  } = inputs;
  const { setClear } = UserStore();

  const navigate = useNavigate();

  const onClickButton = () => {
    setIsEdit(false);
  };

  const onLogOut = () => {
    lobbySocket.socket?.emit('leaveLobby');
    deleteSocket();
    localStorage.removeItem('access_token');
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    onSubmit(event);
    setIsEdit(false);
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Profile>
        <EditAvatar avatar={avatar} onChangeAvatar={onChangeAvatar} />
        <ProfileDetail>
          <EditNickname nickname={nickname} onChange={onChange} />
          <EditLinks
            email={email}
            github_link={github_link}
            blog_link={blog_link}
            onChange={onChange}
          />
          <EditGroup
            group={group}
            onChange={onChange}
            onEnterGroup={onEnterGroup}
            newGroup={newGroup}
          />
        </ProfileDetail>
      </Profile>
      <EditDescription description={description} onChange={onChange} />
      <Badge />
      <Logout onClick={onLogOut} type="button">
        로그아웃
      </Logout>
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
  padding: 3.2rem;
  gap: 3rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
  ${media.small} {
    padding-bottom: 10rem;
    padding: 1.6rem;
  }
`;

const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 12rem);
  ${media.small} {
    width: 100%;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4rem;
  ${media.small} {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Buttons = styled.div`
  position: absolute;
  right: 3.2rem;
  top: 3.2rem;
  #accept {
    margin-left: 0.8rem;
  }
  ${media.small} {
    top: unset;
    left: 2.5rem;
    bottom: 3.2rem;
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
  ${media.small} {
    position: absolute;
    bottom: 3.2rem;
    right: 3.2rem;
  }
`;
