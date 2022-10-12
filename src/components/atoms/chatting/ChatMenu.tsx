import styled from 'styled-components';
import { ReactComponent as Code } from '../../../assets/svg/Code.svg';
import roomModalStore from '../../../stores/room/roomModalStore';

export default function ChatMenu({ roomId }: { roomId: string }) {
  const { toggleCodeModal } = roomModalStore();
  return (
    <Component roomId={roomId}>
      <Icon type="button" onClick={() => toggleCodeModal('SEND')}>
        <Code />
      </Icon>
    </Component>
  );
}

const Component = styled.div<{ roomId: string }>`
  margin-top: 2rem;
  width: 100%;
  border-radius: 1rem 1rem 0 0;
  height: 6.3rem;
  display: flex;
  padding-left: 1rem;
  align-items: center;
  border-bottom: 1px solid #2f3136;
  background-color: ${(props) =>
    props.roomId !== 'lobby'
      ? ({ theme }) => theme.newMessageAlarm
      : '#313540'};
`;

const Icon = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    height: 65%;
    width: 65%;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
`;
