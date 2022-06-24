import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/lobby" element={<Layout />}>
          <Route index element={<Lobby />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
