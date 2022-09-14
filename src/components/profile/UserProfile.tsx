import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Avatar from '../atoms/Avatar';
import userStore from '../../stores/userStore';
import Group from './UserProfile/Group';
import Badge from './UserProfile/Badge';
import Edit from './UserProfile/Edit';
import { ReactComponent as SendMessageBlack } from '../../assets/svg/SendMessageBlack.svg';
import { ReactComponent as ShowFriendState } from '../../assets/svg/ShowFriendState.svg';

export default function UserProfile({ isMe }: { isMe: boolean }) {
  const { nickname, avatar, description } = userStore();
  const { userId } = useParams();
  let userNickname: string;
  let userAvatar: number;
  let userDescription: string;
  let isFriend = false;
  if (isMe) {
    userNickname = nickname;
    userAvatar = avatar;
    userDescription = description;
  } else {
    // TODO: get user info from server
    userNickname = '임시 닉네임';
    userAvatar = 10;
    userDescription = '임시 설명';
    isFriend = false;
  }
  const navigate = useNavigate();

  const onClickEditProfile = () => {
    navigate(`/editProfile/${userId}`);
  };

  const onLogOut = () => {
    localStorage.removeItem('access_token');
    navigate(`/`);
    toast.success('로그아웃 되었습니다');
  };

  return (
    <Components isMe={isMe}>
      <Avatar avatar={userAvatar} size={12} />
      <Contents>
        <NicknameComponent>
          <Nickname>{userNickname}</Nickname>
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
          !isMe && <Button>친구신청</Button>
        )}
      </Contents>
      {isMe && (
        <EditButton onClick={onClickEditProfile}>
          <Edit />
        </EditButton>
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
`;
