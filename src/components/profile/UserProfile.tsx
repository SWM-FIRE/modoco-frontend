import React, { useEffect } from 'react';
import styled from 'styled-components';
import useUser from 'src/hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useSingleFriend from 'src/hooks/friend/useSingleFriend';
import useRequestFriend from 'src/hooks/friend/useRequestFriend';
import userStore from 'src/stores/userStore';
import Avatar from '../atoms/Avatar';
import Group from './UserProfile/Group';
import Badge from './UserProfile/Badge';
import Pending from './UserProfile/Pending';
import { ReactComponent as SendMessageBlack } from '../../assets/svg/SendMessageBlack.svg';
import { ReactComponent as ShowFriendState } from '../../assets/svg/ShowFriendState.svg';
import lobbySocket, { deleteSocket } from '../../adapters/lobbySocket';

export default function UserProfile({ isMe, setIsEdit }) {
  const { setClear } = userStore();
  const { userId } = useParams();
  const navigate = useNavigate();
  const userDescription = '임시 설명입니다! 추후에 수정 예정';
  const { isLoading, error, data, refetch } = useUser(Number(userId));

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

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  const isFriend = friendData?.status === 'ACCEPTED';
  const isPending = friendData?.status === 'PENDING';

  if (isLoading || friendLoading || requestLoading) {
    return <>loading</>;
  }
  if (error || friendError || requestError) return <>error</>;

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

  const onLogOut = () => {
    lobbySocket.socket?.emit('leaveLobby');
    deleteSocket();
    localStorage.removeItem('access_token');
    setClear();
    toast.success('로그아웃 되었습니다');
    navigate(`/`);
  };

  return (
    <Components isMe={isMe}>
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
        <OAuthId>@tempOAuth</OAuthId>
        <Group />
        <Description>{userDescription}</Description>
        <Badge />
        {isMe && <Logout onClick={onLogOut}>로그아웃</Logout>}
        {isFriend ? (
          <Button>
            <SendMessageBlack />
            채팅하기
          </Button>
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
      </Contents>
      {isMe && (
        <EditButton onClick={onClickEditProfile}>프로필 수정</EditButton>
      )}
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
  min-width: 55rem;
  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const Contents = styled.div`
  flex-grow: 1;
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
`;

const OAuthId = styled.span`
  color: #f9fafb;
  font-family: IBMPlexMonoRegular;
  font-size: 1.4rem;
`;

const NicknameComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
