import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/screens" element={<TestContainer2 />} />
      </Routes>
    </BrowserRouter>
  );
}

const TestContainer2 = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightslategray;
`;

export default Router;
