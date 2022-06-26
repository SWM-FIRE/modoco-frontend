import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Room from './pages/Room';

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
        <Route path="/room" element={<Layout />}>
          <Route index element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
