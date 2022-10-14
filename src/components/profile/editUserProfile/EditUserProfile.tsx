/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import media from 'src/styles/media';
import useUser from 'src/hooks/useUser';
import EditAvatar from './EditAvatar';
import Badge from '../userProfile/Badge';
import EditGroup from './EditGroup';
import useChangeProfile from '../../../hooks/useChangeProfile';
import EditNickname from './EditNickname';
import EditDescription from './EditDescription';
import UserStore from '../../../stores/userStore';
import EditLinks from './EditLinks';
import lobbySocket, { deleteSocket } from '../../../adapters/lobbySocket';

export default function EditUserProfile({ setIsEdit, isModal }) {
  const navigate = useNavigate();
  const {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isDisable,
    onEnterGroup,
    initInputs,
  } = useChangeProfile();
  const { setClear, uid } = UserStore();

  const { data } = useUser(Number(uid));
  useEffect(() => {
    // setInput state
    if (data) initInputs({ data });
  }, [data]);

  const {
    avatar,
    nickname,
    status_quo,
    groups,
    github_link,
    blog_link,
    email,
    newGroup,
  } = inputs;

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
    <Form onSubmit={onSubmitForm} isModal={isModal}>
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
            groups={groups}
            onChange={onChange}
            onEnterGroup={onEnterGroup}
            newGroup={newGroup}
          />
        </ProfileDetail>
      </Profile>
      <EditDescription status_quo={status_quo} onChange={onChange} />
      <Badge />
      <Logout onClick={onLogOut} isModal={isModal} type="button">
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

const Form = styled.form<{ isModal: boolean }>`
  background-color: #23262f;
  width: ${(props) => (props.isModal ? '100%' : '70%')};
  border-radius: 2rem;
  position: relative;
  padding: 3.2rem;
  gap: 3rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
  ${media.small} {
    padding: 1.6rem;
    padding-bottom: 10rem;
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
  ${media.xlarge} {
    top: unset;
    bottom: 3.2rem;
    right: 3.2rem;
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

const Logout = styled.button<{ isModal: boolean }>`
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
  display: ${(props) => (props.isModal ? 'none' : 'block')};
  ${media.small} {
    position: absolute;
    top: unset;
    left: 2.5rem;
    bottom: 3.2rem;
  }
`;
