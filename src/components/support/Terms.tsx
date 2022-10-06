import React, { useState, useEffect } from 'react';
import { NotionRenderer } from 'react-notion';
import styled from 'styled-components';
import openColor from 'src/styles/openColor';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

function PrivacyPolicy() {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const NOTION_PAGE_ID = 'Terms-88ee4697e836439b9e75af45a69e7de7';
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
