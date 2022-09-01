import React from 'react';
import styled from 'styled-components';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import { ReactComponent as RightArrow } from '../../../assets/svg/rightArrow.svg';
import MyAvatar from '../../../assets/avatar/MyAvatar';

export default function ProfileModal({
  toggle,
  nickname,
  avatar,
}: {
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  avatar: string;
}) {
  const closeProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toggle(false);
  };
  return (
    <Container>
      <Inner>
        <Header>
          <Close onClick={closeProfile}>
            <X />
          </Close>
        </Header>
        <Body>
          <UserInfo>
            <AvatarContainer>
              <MyAvatar num={Number(avatar)} />
            </AvatarContainer>
            {nickname}
            <ArrowContainer>
              <RightArrow />
            </ArrowContainer>
          </UserInfo>
          <Buttons>HI</Buttons>
        </Body>
      </Inner>
    </Container>
  );
}

const Buttons = styled.div`
  height: 4.4rem;
`;

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
`;

const UserInfo = styled.div`
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

const Body = styled.div`
  display: flex;
  height: calc(100% - 2.4rem);
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 2.4rem;
`;

const Close = styled.button`
  cursor: pointer;
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  position: absolute;
  width: 32rem;
  height: 18.4rem;
  background-color: #23262f;
  top: 8rem;
  left: -30rem;
  z-index: 1;
  padding: 2rem 2.4rem 3.2rem 2.4rem;
  border-radius: 2rem;
`;
