import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as MessageSend } from '../../../assets/svg/MessageSend.svg';

export default function SendChat({ uid }: { uid: number }) {
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef(null);

  const onMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setNewMessage(() => event.target.value);
    autoGrow();
  };

  const autoGrow = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '2rem';
      inputRef.current.style.height = inputRef.current.scrollHeight
        .toString()
        .concat('px');
      console.log(inputRef.current.style.height);
    }
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;
    console.log('send to', uid, newMessage);
    // emit
    setNewMessage(() => '');
    if (inputRef.current) {
      inputRef.current.style.height = '2rem';
    }
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmit(event);
      }
    }
  };

  return (
    <SubmitMessage>
      <Input
        placeholder="Write your message...."
        value={newMessage}
        ref={inputRef}
        rows={1}
        onChange={onMessageChange}
        onKeyPress={onKeyPress}
      />
      <Button onClick={onSubmit}>
        <MessageSend />
      </Button>
    </SubmitMessage>
  );
}

const SubmitMessage = styled.form`
  width: 100%;
  max-height: 19rem;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  background-color: #313540;
  z-index: 999;
`;

const Input = styled.textarea`
  width: calc(100% - 2.7rem);
  font-size: 1.3rem;
  background-color: #313540;
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);
  min-height: 2rem;
  max-height: 13rem;
  resize: none;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  cursor: pointer;
  float: right;
  svg {
    width: 2rem;
    height: 2rem;
  }
`;
