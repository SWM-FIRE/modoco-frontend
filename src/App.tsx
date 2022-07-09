import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Room from './pages/Room';
import Main from './pages/Main';

function App() {
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
          <Route path=":roomId" element={<Room />} />
        </Route>
        <Route path="/main" element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
