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
        console.log('setted good');
        console.log(resJson);
        setResponse(resJson);
      });
  }, []);

  return (
    <Container>
      <NotionRenderer blockMap={response} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 10%;
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
