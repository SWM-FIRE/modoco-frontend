import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { message } from '../../../interface/directMessage.interface';

interface target {
  uid: number;
  nickname: string;
  avatar: number;
}

export default function SingleDirectChat({
  singleChat,
  me,
  target,
}: {
  singleChat: message;
  me: number;
  target: target;
}) {
  const isMe = singleChat.from === me;

  const msgRef = useRef(null);
  const onCheckUrl = (message: string, loc: string) => {
    const urlReg =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    if (loc === 'url') return message.split(urlReg)[1];
    if (loc === 'front') return message.split(urlReg)[0];
    if (loc === 'back') return message.split(urlReg)[3];
    return null;
  };

  useEffect(() => {
    if (msgRef.current) {
      const url = onCheckUrl(singleChat.message, 'url');
      if (url) {
        const front = onCheckUrl(singleChat.message, 'front');
        const back = onCheckUrl(singleChat.message, 'back');
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.innerText = url;
        msgRef.current.innerHTML = `${front}${a.outerHTML}${back}`;
      } else {
        msgRef.current.innerText = singleChat.message;
      }
    }
  }, [singleChat.message]);

  return (
    <Container isMe={isMe}>
      <MessageComponent isMe={isMe}>
        <Nickname>{isMe ? '나' : `${target.nickname}`}</Nickname>
        <MessageBox isMe={isMe}>
          <Message isMe={isMe} ref={msgRef} />
          {/* <Time>{moment(time).format('LT')}</Time>} */}
        </MessageBox>
      </MessageComponent>
    </Container>
  );
}

const Container = styled.li<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  gap: 1rem;
  margin-top: 2rem;
  padding-right: 1rem;
  color: rgb(255, 255, 255);
`;

const MessageComponent = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
`;

const Nickname = styled.div`
  color: #9ca3af;
`;

const MessageBox = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: ${({ isMe }) => (isMe ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin-top: 0.2rem;
  width: 100%;
  gap: 0.2rem;
  word-break: break-all;
`;

const Message = styled.div<{ isMe: boolean }>`
  font-size: 1.5rem;
  padding: 1rem;
  max-width: '32rem';
  border-radius: ${({ isMe }) =>
    isMe ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  background-color: ${({ isMe }) => (isMe ? '#353741' : '#1F2331')};
  a {
    color: #2992e3;
  }
`;

// const Time = styled.div`
//   font-size: 0.8rem;
//   margin-top: 0.2rem;
//   flex-shrink: 0;
// `;
