import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
        </Route>
        <Route path="/test2" element={<TestContainer2 />} />
        <Route path="/test3" element={<TestContainer3 />} />
      </Routes>
    </BrowserRouter>
  );
}

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
