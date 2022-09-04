import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as BottomArrow } from '../../../assets/svg/bottomArrow.svg';
import messageStore from '../../../stores/messagesStore';
import userStore from '../../../stores/userStore';

export default function NewMessage({ chatWindow }) {
  const { messages } = messageStore((state) => state);
  const [isVisible, setIsVisible] = useState(false);
  const { uid } = userStore((state) => state);

  const isCheckBottom = () => {
    if (
      chatWindow.current.scrollHeight - chatWindow.current.scrollTop <=
      chatWindow.current.clientHeight + 100
    ) {
      setIsVisible(false);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const isBottom = isCheckBottom();
    const lastUid = messages[messages.length - 1]?.uid;
    if (lastUid !== '' && lastUid !== uid && !isBottom) setIsVisible(true);
  }, [messages]);

  useEffect(() => {
    window.addEventListener('scroll', isCheckBottom, { capture: true });
    return () => {
      window.removeEventListener('scroll', isCheckBottom);
    };
  }, []);

  const onClick = () => {
    chatWindow.current.scrollTo({
      top: chatWindow.current.scrollHeight,
    });
  };

  return (
    <Component onClick={onClick} isVisible={isVisible}>
      새로운 메세지가 있습니다.
      <ButtonComponent>
        <BottomArrow />
      </ButtonComponent>
    </Component>
  );
}

const Component = styled.div<{ isVisible: boolean }>`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 36rem;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.newMessageAlarm};
  font-family: IBMPlexSansKRRegular;
  border-radius: 1rem;
  bottom: 6rem;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;

const ButtonComponent = styled.div`
  position: relative;
  width: 1.2rem;
  height: 0.6rem;
  right: -9rem;
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
