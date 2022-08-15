import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from './Timer';
import Settings from './Settings';
import { ReactComponent as X } from '../../../assets/svg/X.svg';
import Theme from '../Theme';
import roomSocket from '../../../adapters/roomSocket';
import connectedUsersStore from '../../../stores/connectedUsersStore';
import messageStore from '../../../stores/messagesStore';
import { useCreateMediaStream } from '../../../hooks/useCreateMediaStream';
import userPcStore from '../../../stores/userPcStore';

export default function Header({ theme }) {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { setUsers } = connectedUsersStore();
  const { stopMediaStream } = useCreateMediaStream();
  const { setMessages } = messageStore();
  const { emptyPc } = userPcStore();

  const onClick = () => {
    const result = window.confirm('정말 모도코를 종료하시겠습니까?');
    if (result) {
      roomSocket.emit('leaveRoom', roomId);
      setUsers([]);
      emptyPc();
      setMessages([]);
      stopMediaStream();
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <Component>
      <Theme theme={theme} />
      <Center>
        <Timer />
        <Settings />
      </Center>
      <Button onClick={onClick}>
        나가기 <X />
      </Button>
    </Component>
  );
}

const Center = styled.div`
  display: flex;
`;

const Component = styled.div`
  padding-right: 8rem;
  padding-left: 8rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.header};
  width: 100%;
  height: 10rem;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
  font-size: 1.8rem;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 5rem;
  cursor: pointer;
  color: #f9fafb;
  font-family: IBMPlexSansKRRegular;
  padding: 1rem 2rem;
  font-size: 1.7rem;
  min-width: 11.7rem;
`;
