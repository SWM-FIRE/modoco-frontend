import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './fonts/font.css';
import MainLayout from './components/layout/MainLayout';
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
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/room" element={<RoomLayout />}>
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="/main" element={<MainLayout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/profile" element={<MainLayout />}>
            <Route path=":userId" element={<Profile />} />
          </Route>
          <Route path="/editProfile" element={<MainLayout />}>
            <Route path=":userId" element={<EditMyPage />} />
          </Route>
          <Route path="/ready" element={<RoomLayout />}>
            <Route path=":roomId" element={<Ready />} />
          </Route>
          <Route path="/signUp" element={<MainLayout />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
