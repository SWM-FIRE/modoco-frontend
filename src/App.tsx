import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './fonts/font.css';
import Layout from './components/layout/Layout';
import RoomLayout from './components/layout/RoomLayout';
import Room from './pages/Room';
import Ready from './pages/Ready';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import EditMyPage from './pages/EditMyPage';
import Main from './pages/Main';
import Error from './pages/Error';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/room" element={<RoomLayout />}>
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="/main" element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/profile" element={<Layout />}>
            <Route path=":userId" element={<Profile />} />
          </Route>
          <Route path="/editProfile" element={<Layout />}>
            <Route index element={<EditMyPage />} />
          </Route>
          <Route path="/ready" element={<RoomLayout />}>
            <Route path=":roomId" element={<Ready />} />
          </Route>
          <Route path="/signUp" element={<Layout />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
