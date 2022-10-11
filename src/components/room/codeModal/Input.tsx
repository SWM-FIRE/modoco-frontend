import React, { useRef } from 'react';
import styled from 'styled-components';
import codeChatStore from '../../../stores/room/codeChatStore';

export default function Input() {
  const { code, setCode } = codeChatStore();
  const inputRef = useRef(null);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setCode(event.target.value);
    autoGrow();
  };

  const autoGrow = () => {
    if (inputRef.current) {
      inputRef.current.style.height = '60rem';
      inputRef.current.style.height = inputRef.current.scrollHeight
        .toString()
        .concat('px');
    }
  };
  return <Component value={code} ref={inputRef} onChange={onChange} />;
}

const Component = styled.textarea`
  font-size: 1.3rem;
  background-color: #0f0f0f;
  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);
  min-height: 60rem;
  max-height: 60rem;
  padding: 1.3rem;
  margin-top: 1rem;
  ::-webkit-scrollbar {
    width: 0.3rem;
  }
  &:focus {
    outline: none;
  }
`;
