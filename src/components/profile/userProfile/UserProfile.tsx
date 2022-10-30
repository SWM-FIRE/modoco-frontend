/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from 'src/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import media from 'src/styles/media';
import useSingleFriend from 'src/hooks/friend/useSingleFriend';
import useRequestFriend from 'src/hooks/friend/useRequestFriend';
import useDeleteFriendRequest from 'src/hooks/friend/useDeleteFriendRequest';
import userStore from 'src/stores/userStore';
import ChattingUtil from 'src/components/atoms/chattingModal/chattingUtil';
import Avatar from '../../atoms/Avatar';
import Group from './Group';
import Badge from './Badge';
import Pending from './Pending';
import { ReactComponent as Github } from '../../../assets/svg/Github.svg';
import { ReactComponent as Mail } from '../../../assets/svg/Mail.svg';
import { ReactComponent as Globe } from '../../../assets/svg/Globe.svg';
import { ReactComponent as SendMessageBlack } from '../../../assets/svg/SendMessageBlack.svg';
import { ReactComponent as ShowFriendState } from '../../../assets/svg/ShowFriendState.svg';
import SkeletonProfile from '../SkeletonProfile';
import NoUser from './NoUser';
import { leaveLobby } from '../../../adapters/lobbySocket';

export default function UserProfile({ isMe, setIsEdit, userId, isModal }) {
  const { setClear } = userStore();
  const navigate = useNavigate();
  const { isLoading, error, refetch, data } = useUser(Number(userId));
  const { openChat } = ChattingUtil();

  const {
    isLoading: friendLoading,
    error: friendError,
    data: friendData,
  } = useSingleFriend(Number(userId));
  const {
    mutate: requestMutate,
    isLoading: requestLoading,
    isError: requestError,
    isSuccess: requestSuccess,
  } = useRequestFriend(Number(userId));
  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteFriendRequest(Number(userId));

  useEffect(() => {
    refetch();
    if (!isMe) setIsEdit(false);
  }, [refetch, isMe]);

  const isFriend = friendData?.status === 'ACCEPTED';
  const isPending = friendData?.status === 'PENDING';

  if (isLoading || friendLoading || requestLoading || deleteLoading) {
    return <SkeletonProfile />;
  }
  if (error || friendError || requestError || deleteError) {
    console.log('error occurred');
    return <SkeletonProfile />;
  }

  if (!data) {
    return <NoUser />;
  }

  const onClickEditProfile = () => {
    setIsEdit(true);
  };

  const sendRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    requestMutate();
    if (requestSuccess) {
      console.log('request success');
    }
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteMutate();
    if (deleteSuccess) {
      console.log('delete success');
    }
  };

  const onLogOut = () => {
    leaveLobby();
    localStorage.removeItem('access_token');
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  const onGithub = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`${data.github_link}`).focus();
  };

  const onMail = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`mailto:${data.email}`, '_self');
  };

  const onBlog = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`${data.blog_link}`).focus();
  };

  const githubId = data.github_link.split('github.com/').pop();

  return (
    <Components isMe={isMe} isModal={isModal}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Avatar avatar={data?.avatar} size={12} />
          <Contents isModal={isModal}>
            <NicknameComponent>
              <Nickname isModal={isModal}>{data?.nickname}</Nickname>
              {isFriend && (
                <FriendComponent isModal={isModal}>
                  <ShowFriendState />
                  나와 친구입니다
                </FriendComponent>
              )}
            </NicknameComponent>
            <Links isModal={isModal}>
              <MyLink onClick={onMail}>
                <Mail />
              </MyLink>
              {githubId && (
                <MyLink onClick={onGithub}>
                  <Github style={{ width: '90%', height: '90%' }} />
                </MyLink>
              )}
              {data.blog_link && (
                <MyLink onClick={onBlog}>
                  <Globe />
                </MyLink>
              )}
            </Links>
            <Group groups={data.groups} />
            <Description>{data.status_quo}</Description>
          </Contents>
        </div>
        <Badge />
        {isMe && (
          <Logout onClick={onLogOut} isModal={isModal}>
            로그아웃
          </Logout>
        )}
        {isFriend ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button isModal={isModal} onClick={() => openChat(data.uid)}>
              <SendMessageBlack />
              채팅하기
            </Button>
            <DeleteFriend onClick={onDelete} isModal={isModal}>
              친구 삭제
            </DeleteFriend>
          </div>
        ) : (
          !isMe &&
          isPending && (
            <Pending
              friendId={Number(userId)}
              friend={friendData}
              refetch={refetch}
            />
          )
        )}
        {!isMe && !isFriend && !isPending && (
          <Button onClick={sendRequest} isModal={isModal}>
            친구요청
          </Button>
        )}
        {isMe && (
          <EditButton onClick={onClickEditProfile} isModal={isModal}>
            프로필 수정
          </EditButton>
        )}
      </div>
    </Components>
  );
}

const Components = styled.div<{ isMe: boolean; isModal: boolean }>`
  background-color: #23262f;
  width: ${(props) => (props.isModal ? '100%' : props.isMe ? '70%' : '100%')};
  border-radius: 2rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 3.2rem;
  gap: 5.6rem;
  ${media.large} {
    padding: ${(props) => (props.isModal ? '1.6rem' : '3.2rem')};
  }
  ${media.medium} {
    width: 100%;
    padding: ${(props) => (props.isModal ? '1.6rem' : '3.2rem')};
  }
  ${media.small} {
    padding: 1.6rem;
  }
`;

const EditButton = styled.button<{ isModal: boolean }>`
  cursor: pointer;
  position: absolute;
  right: 3.2rem;
  top: 4.4rem;
  color: #f9fafb;
  font-size: 1.5rem;
  border-radius: 5rem;
  border: 1px solid #f9fafb;
  padding: 0.8rem 1.6rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.large} {
    top: ${(props) => (props.isModal ? 'unset' : '4.4rem')};
    right: ${(props) => (props.isModal ? '1.6rem' : '3.2rem')};
    bottom: ${(props) => (props.isModal ? '1.6rem' : 'unset')};
  }
  ${media.small} {
    top: unset;
    right: 1.6rem;
    bottom: 1.6rem;
  }
`;

const Contents = styled.div<{ isModal: boolean }>`
  margin-left: 4rem;
  width: 100%;
  ${media.large} {
    margin-left: ${(props) => (props.isModal ? '1.6rem' : '4rem')};
  }
  ${media.small} {
    margin-left: 1rem;
  }
`;

const Links = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-top: 0.4rem;
  ${media.large} {
    margin-top: ${(props) => (props.isModal ? '0.4rem' : '0.8rem')};
    gap: ${(props) => (props.isModal ? '0.8rem' : '1.6rem')};
  }
  ${media.small} {
    margin-top: 0.2rem;
    gap: 0.8rem;
  }
`;

const MyLink = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
  }
  border-radius: 0.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const NicknameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FriendComponent = styled.div<{ isModal: boolean }>`
  color: #f3f4f6;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  padding: 1.2rem 2rem;
  font-size: 1.3rem;
  font-family: IBMPlexSansKRRegular;
  gap: 1rem;
  height: 4.4rem;
  ${media.large} {
    display: ${(props) => (props.isModal ? 'none' : 'flex')};
  }
  ${media.small} {
    display: none;
  }
`;

const Nickname = styled.h1<{ isModal: boolean }>`
  font-size: 4rem;
  font-family: IBMPlexMonoRegular;
  color: #f1f5f9;
  ${media.large} {
    font-size: ${(props) => (props.isModal ? '2.4rem' : '4rem')};
  }
  ${media.small} {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: #e2e8f0;
  font-size: 1.4rem;
  font-weight: 400;
  padding-top: 2rem;
`;

const Button = styled.button<{ isModal: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 5rem;
  padding: 1.6rem 5.7rem;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  cursor: pointer;
  gap: 0.4rem;
  margin-top: 2rem;
  max-width: 20rem;
  ${media.large} {
    padding: ${(props) => (props.isModal ? '0.8rem 1.2rem' : '1.6rem 5.7rem')};
  }
  ${media.small} {
    padding: 0.8rem 1.2rem;
  }
`;

const DeleteFriend = styled.button<{ isModal: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fb7185;
  color: #fb7185;
  border-radius: 5rem;
  padding: 1.6rem 5.7rem;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  cursor: pointer;
  gap: 0.4rem;
  margin-top: 2rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  ${media.large} {
    padding: ${(props) => (props.isModal ? '1.6rem 2.7rem' : '1.6rem 5.7rem')};
  }
  ${media.small} {
    padding: 1.6rem 2.7rem;
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
  display: ${(props) => (props.isModal ? 'none' : 'block')};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
