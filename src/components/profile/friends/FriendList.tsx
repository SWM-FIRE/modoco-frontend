import React from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';
import singleFriend from 'src/interface/singleFriend.interface';
import ChattingUtil from 'src/components/atoms/chattingModal/chattingUtil';
import { ReactComponent as SendImage } from '../../../assets/svg/MessageSend.svg';
import FriendIcon from './FriendIcon';

export default React.memo(function FriendList({
  friendList,
}: {
  friendList: singleFriend[];
}) {
  const { openChat } = ChattingUtil();
  return (
    <>
      {friendList.map((friend) => (
        <Component key={friend?.uid}>
          <FriendIcon friend={friend} />
          <SendMessage onClick={() => openChat(friend?.uid)}>
            <SendButton>
              <SendImage />
            </SendButton>
          </SendMessage>
        </Component>
      ))}
    </>
  );
});

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f9fafb;
  font-size: 1.5rem;
  margin-top: 2.8rem;
  max-width: 28rem;
  ${media.small} {
    font-size: 1.2rem;
    margin-top: 2rem;
    justify-content: space-between;
    width: 100%;
  }
`;

// const FriendStatus = styled.div`
//   font-size: 1.2rem;
//   font-family: IBMPlexSansKRRegular;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   background-color: rgba(248, 250, 252, 0.1);
//   border-radius: 5rem;
//   margin-top: 0.8rem;
//   padding: 0.2rem 0.8rem;
//   width: max-content;
//   ${media.small} {
//     margin-top: 0.3rem;
//   }
// `;

// const OnlineStatus = styled.div<{ isOnline: boolean }>`
//   width: 0.8rem;
//   height: 0.8rem;
//   border-radius: 50%;
//   background-color: ${(props) => (props.isOnline ? '#45B26B' : '#a5a5a5')};
// `;

const SendMessage = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
  cursor: pointer;
  ${media.small} {
    background-color: #232630;
    margin: 0;
  }
`;

const SendButton = styled.button`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  svg {
    width: 80%;
    height: 80%;
  }
`;
