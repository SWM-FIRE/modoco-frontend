import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from 'src/hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import media from 'src/styles/media';
import useSingleFriend from 'src/hooks/friend/useSingleFriend';
import useRequestFriend from 'src/hooks/friend/useRequestFriend';
import useDeleteFriendRequest from 'src/hooks/friend/useDeleteFriendRequest';
import userStore from 'src/stores/userStore';
import Avatar from '../atoms/Avatar';
import Group from './UserProfile/Group';
import Badge from './UserProfile/Badge';
import Pending from './UserProfile/Pending';
import { ReactComponent as Github } from '../../assets/svg/Github.svg';
import { ReactComponent as Mail } from '../../assets/svg/Mail.svg';
import { ReactComponent as Globe } from '../../assets/svg/Globe.svg';
import { ReactComponent as SendMessageBlack } from '../../assets/svg/SendMessageBlack.svg';
import { ReactComponent as ShowFriendState } from '../../assets/svg/ShowFriendState.svg';
import lobbySocket, { deleteSocket } from '../../adapters/lobbySocket';
import SkeletonProfile from './SkeletonProfile';
import userAPI from './UserAPI.json';

export default function UserProfile({ isMe, setIsEdit }) {
  const { setClear } = userStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, refetch, data } = useUser(Number(userId));

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
    console.log('error occured');
    return <SkeletonProfile />;
  }

  const onClickEditProfile = () => {
    setIsEdit(true);
    // navigate(`/editProfile/${userId}`);
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
    lobbySocket.socket?.emit('leaveLobby');
    deleteSocket();
    localStorage.removeItem('access_token');
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  const onGithub = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`https://github.com/${userAPI.github_link}`).focus();
  };

  const onMail = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`mailto:${userAPI.email}`, '_self');
  };

  const onBlog = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    window.open(`${userAPI.blog_link}`).focus();
  };

  return (
    <Components isMe={isMe}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Avatar avatar={data?.avatar} size={12} />
          <Contents>
            <NicknameComponent>
              <Nickname>{data?.nickname}</Nickname>
              {isFriend && (
                <FriendComponent>
                  <ShowFriendState />
                  나와 친구입니다
                </FriendComponent>
              )}
            </NicknameComponent>
            <Links>
              <MyLink onClick={onMail}>
                <Mail />
              </MyLink>
              {userAPI.github_link && (
                <MyLink onClick={onGithub}>
                  <Github style={{ width: '90%', height: '90%' }} />
                </MyLink>
              )}
              {userAPI.blog_link && (
                <MyLink onClick={onBlog}>
                  <Globe />
                </MyLink>
              )}
            </Links>
            <Group groups={userAPI.group} />
            <Description>{userAPI.description}</Description>
          </Contents>
        </div>
        <Badge />
        {isMe && <Logout onClick={onLogOut}>로그아웃</Logout>}
        {isFriend ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button>
              <SendMessageBlack />
              채팅하기
            </Button>
            <DeleteFriend onClick={onDelete}>친구 삭제</DeleteFriend>
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
          <Button onClick={sendRequest}>친구요청</Button>
        )}
        {isMe && (
          <EditButton onClick={onClickEditProfile}>프로필 수정</EditButton>
        )}
      </div>
    </Components>
  );
}

const Components = styled.div<{ isMe: boolean }>`
  background-color: #23262f;
  width: ${(props) => (props.isMe ? '70%' : '100%')};
  border-radius: 2rem;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: 3.2rem;
  gap: 5.6rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
  ${media.small} {
    padding: 1.6rem;
  }
`;

const EditButton = styled.button`
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
  ${media.small} {
    top: unset;
    right: 1.6rem;
    bottom: 1.6rem;
    padding: 0.8rem 1.6rem;
  }
`;

const Contents = styled.div`
  margin-left: 4rem;
  width: 100%;
  ${media.small} {
    margin-left: 1rem;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  margin-top: 0.4rem;
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

const FriendComponent = styled.div`
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
  ${media.small} {
    display: none;
  }
`;

const Nickname = styled.h1`
  font-size: 4rem;
  font-family: IBMPlexMonoRegular;
  color: #f1f5f9;
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

const Button = styled.button`
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
  ${media.small} {
    padding: 0.8rem 1.2rem;
  }
`;

const DeleteFriend = styled.button`
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
  ${media.small} {
    padding: 1.6rem 2.7rem;
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
`;
