import { useRef } from 'react';
import ChattingAlarm from '../sideBar/ChattingAlarm';
import receiveNewMessageStore from '../../../stores/room/receiveNewMessageStore';
import { ReactComponent as LeftTwoArrows } from '../../../assets/svg/Room/LeftTwoArrows.svg';
import { ReactComponent as Chatting } from '../../../assets/svg/Room/Chatting.svg';
import { ReactComponent as NewChatting } from '../../../assets/svg/Room/NewChatting.svg';

export default function ChattingContents() {
  const { isReceiveNewMessage, isAlarmToggle } = receiveNewMessageStore();
  const volumeRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <LeftTwoArrows />
      {isReceiveNewMessage ? (
        <>
          <ChattingAlarm volumeRef={volumeRef} isAlarmToggle={isAlarmToggle} />
          <NewChatting />
        </>
      ) : (
        <Chatting />
      )}
    </>
  );
}
