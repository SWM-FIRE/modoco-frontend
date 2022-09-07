import React from 'react';
import styled from 'styled-components';
import MyAvatar from '../../../assets/avatar/MyAvatar';
import roomModalStore from '../../../stores/room/roomModalStore';
import { ReactComponent as RightArrow } from '../../../assets/svg/rightArrow.svg';

export default function UserInfo({
  avatarNo,
  nickname,
  uid,
  toggle,
}: {
  avatarNo: number;
  nickname: string;
  uid: number;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toggleProfileModal, setProfileUid } = roomModalStore();

  const toggleProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggle(false);
    toggleProfileModal();
    setProfileUid(uid);
  };

  return (
    <Container onClick={toggleProfile}>
      <AvatarContainer>
        <MyAvatar num={avatarNo} />
      </AvatarContainer>
      {nickname}
      <ArrowContainer>
        <RightArrow />
      </ArrowContainer>
    </Container>
  );
}

const ArrowContainer = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  cursor: pointer;
  height: 4.8rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 3.6rem;
  color: #f9fafb;
`;
