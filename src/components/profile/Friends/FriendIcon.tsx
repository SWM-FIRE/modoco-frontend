import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import useEnterProfile from 'src/components/main/useEnterProfile';
import mainModalStore from 'src/stores/mainModalStore';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import singleFriend from '../../../interface/singleFriend.interface';

export default function FriendIcon({ friend }: { friend: singleFriend }) {
  const { enterProfile } = useEnterProfile(friend.uid);
  const { closeProfileModal } = mainModalStore();

  const onFriendProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    enterProfile();
    closeProfileModal();
  };

  return (
    <Container onClick={onFriendProfile}>
      <AvatarContainer>
        <MyAvatar num={friend.avatar} />
      </AvatarContainer>
      <Information>
        <Nickname>{friend.nickname}</Nickname>
        {/* <FriendStatus>
              <OnlineStatus isOnline={friend.state !== ''} />
              {friend.state !== '' ? friend.state : '오프라인'}
            </FriendStatus> */}
      </Information>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #f9fafb;
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

const Nickname = styled.p`
  font-size: 1.5rem;
  width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  ${media.small} {
    font-size: 1.5rem;
    width: 5rem;
  }
`;

const Information = styled.div`
  margin-left: 1rem;
  flex-grow: 1;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  svg {
    height: 100%;
    width: 100%;
  }
  ${media.small} {
    display: none;
  }
`;
