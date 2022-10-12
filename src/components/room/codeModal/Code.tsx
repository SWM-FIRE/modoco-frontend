import React, { useEffect } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import codeChatStore from '../../../stores/room/codeChatStore';

export default function Code({ codeModalType }: { codeModalType: string }) {
  const { code } = codeChatStore();

  useEffect(() => {
    hljs.initHighlightingOnLoad();
    hljs.highlightAll();
  }, []);

  return (
    <Component codeModalType={codeModalType}>
      <pre>
        <code>{code}</code>
      </pre>
    </Component>
  );
}

const Component = styled.div<{ codeModalType: string }>`
  font-size: 1.3rem;
  background-color: #0f0f0f;

  font-family: IBMPlexSansKRRegular;
  color: rgba(255, 255, 255, 1);
  min-height: ${(props) =>
    props.codeModalType === 'READ' ? '75rem' : '60rem'};
  max-height: ${(props) =>
    props.codeModalType === 'READ' ? '75rem' : '60rem'};
  white-space: pre;
  overflow: auto;
  margin-top: 1rem;

  ::-webkit-scrollbar {
    width: 0.3rem;
  }
  pre {
    margin: 0;
  }
`;
