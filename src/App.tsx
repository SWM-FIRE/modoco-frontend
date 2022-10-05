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
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import Auth from './pages/Auth';
import Loading from './pages/Loading';
import NoExist from './pages/NoExist';
import Invite from './pages/Invite';
import Error from './pages/Error';
import Terms from './components/support/Terms';
import Privacy from './components/support/Privacy';

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
          <Route path="/ready" element={<RoomLayout />}>
            <Route path=":roomId" element={<Ready />} />
          </Route>
          <Route path="/signUp" element={<MainLayout />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="/auth">
            <Route index element={<Auth />} />
          </Route>
          <Route path="/invite">
            <Route path=":inviteId" element={<Invite />} />
          </Route>
          <Route path="/loading">
            <Route index element={<Loading />} />
          </Route>
          <Route path="/support" element={<MainLayout />}>
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
          </Route>
          <Route path="/error">
            <Route index element={<Error />} />
          </Route>
          <Route path="*" element={<NoExist />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
