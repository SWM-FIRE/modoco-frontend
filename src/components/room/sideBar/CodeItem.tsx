import { useEffect } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import roomModalStore from '../../../stores/room/roomModalStore';
import codeChatStore from '../../../stores/room/codeChatStore';

export default function CodeItem({ code, isMe, isLobby }) {
  const { setCode } = codeChatStore();
  const newCode = code.length > 100 ? code.slice(0, 100).concat('...') : code;
  const { toggleCodeModal } = roomModalStore();

  useEffect(() => {
    hljs.initHighlightingOnLoad();
    hljs.highlightAll();
    setCode(code);
  }, []);

  const onClick = () => {
    toggleCodeModal('READ');
    setCode(code);
  };

  return (
    <Component isMe={isMe} isLobby={isLobby} onClick={onClick}>
      <pre>
        <code>{newCode}</code>
      </pre>
      <Further id="further">코드 더보기</Further>
    </Component>
  );
}

const Component = styled.button<{ isMe: boolean; isLobby: boolean }>`
  font-size: 1.5rem;
  max-width: ${({ isLobby }) => (isLobby ? '100%' : '32rem')};
  border-radius: ${({ isMe }) =>
    isMe ? '0.8rem 0 0.8rem 0.8rem' : '0 0.8rem 0.8rem 0.8rem'};
  background-color: ${({ isMe, theme }) =>
    isMe ? theme.myChat : theme.otherChat};
  cursor: pointer;
  pre {
    margin: 0;
  }
  pre > code {
    ::-webkit-scrollbar {
      display: none;
    }
    padding: 1rem;
    font-size: 0.9em;
  }
  &:hover {
    #further {
      text-decoration: underline;
    }
  }
`;

const Further = styled.div`
  color: white;
  padding: 1rem 0;
  background-color: #58585870;
`;
