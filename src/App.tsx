import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestContainer />} />
        <Route path="/test2" element={<TestContainer2 />} />
        <Route path="/test3" element={<TestContainer3 />} />
      </Routes>
    </BrowserRouter>
  );
}

const TestContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightcyan;
`;
const TestContainer2 = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgreen;
`;

const TestContainer3 = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightsalmon;
`;

export default Router;
