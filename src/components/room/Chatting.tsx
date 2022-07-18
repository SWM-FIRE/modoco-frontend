import styled from 'styled-components';
import { ReactComponent as MessageSend } from '../../assets/svg/MessageSend.svg';
import ChattingItem from './ChattingItem';

export default function Chatting() {
  return (
    <Component>
      <Title>채팅</Title>
      <ChattingList>
        <ChattingItem user="you" />
      </ChattingList>
      <NewMessage>
        <Input placeholder="Write your message...." />
        <Button>
          <MessageSend />
        </Button>
      </NewMessage>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  font-family: IBMPlexSansKRRegular;
  font-size: 1.3rem;
  color: #6b7280;
`;

const Title = styled.div`
  margin-top: 2.4rem;
`;

const ChattingList = styled.ul`
  flex-grow: 1;
`;

const NewMessage = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  font-size: 1.3rem;
  border-radius: 1rem;
  padding: 1.6rem 2rem;
  /* background-color: rgba(30, 39, 69, 1); */
  background-color: #1b1b1e;
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  cursor: pointer;
  right: 1.8rem;
  top: 50%;
  transform: translateY(-50%);
`;
