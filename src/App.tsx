import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShareScreen from './pages/ShareScreen';
import Layout from './components/layout/Layout';
import Login from './pages/Login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/screens" element={<Layout />}>
          <Route index element={<ShareScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
