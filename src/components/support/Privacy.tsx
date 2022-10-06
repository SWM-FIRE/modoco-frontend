import React, { useState, useEffect } from 'react';
import { NotionRenderer } from 'react-notion';
import styled from 'styled-components';
import openColor from 'src/styles/openColor';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

function PrivacyPolicy() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const NOTION_PAGE_ID = 'ee81d6e524fb4c58ae42a4832d1c7cc2';
    fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then((res) => res.json())
      .then((resJson) => {
        setResponse(resJson);
      });
  }, []);

  return (
    <Container>
      <Background>
        <NotionRenderer blockMap={response} />
      </Background>
    </Container>
  );
}

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 4% 5%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3% 5%;
  p,
  li,
  li::marker,
  span,
  b {
    color: ${openColor.gray1};
  }
  a {
    color: ${openColor.blue2};
  }
`;

export default PrivacyPolicy;
