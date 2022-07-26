import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from './Timer';
import Settings from './Settings';
import About from './About';
import { ReactComponent as X } from '../../assets/svg/X.svg';
import { emitLeaveChatRoom } from '../../adapters/chat/socketio';

export default function Header() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const onClick = () => {
    const result = window.confirm('정말 모도코를 종료하시겠습니까?');
    if (result) {
      emitLeaveChatRoom(roomId);
      navigate('/');
    }
  };

  return (
    <Component>
      <About />
      <Timer />
      <Settings />
      <Button onClick={onClick}>
        나가기 <X />
      </Button>
    </Component>
  );
}

const Component = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(30, 39, 69); */
  background-color: #29292e;
  width: 100%;
  height: 10rem;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
  font-size: 1.8rem;
`;

const Button = styled.button`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  right: 8.1rem;
  border: 1px solid #94a3b8;
  border-radius: 5rem;
  cursor: pointer;
  color: #f9fafb;
  font-family: IBMPlexSansKRRegular;
  padding: 1rem 2rem;
  font-size: 1.7rem;
  width: 11.7rem;
`;
