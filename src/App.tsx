import React from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserHistory } from 'history';
import jwtDecode from 'jwt-decode';
import './fonts/font.css';
import Layout from './components/layout/Layout';
import Room from './pages/Room';
import Ready from './pages/Ready';
import LandingPage from './pages/LandingPage';
import MyPage from './pages/MyPage';
import Main from './pages/Main';
import Test from './pages/Test';
import Error from './pages/Error';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function App() {
  const history = createBrowserHistory();

  history.listen(() => {
    const user = localStorage.getItem('access_token');
    if (user) {
      const decodedJwt = jwtDecode(user);
      console.log('[decodedJwt]', decodedJwt);
      // if (decodedJwt.exp * 1000 < Date.now()) {
      //   localStorage.removeItem('access_token');
      //   alert('로그인 시간이 만료되었습니다.');
      // }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/room">
            <Route path=":roomId" element={<Room />} />
          </Route>
          <Route path="/main" element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/profile" element={<Layout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/ready">
            <Route path=":roomId" element={<Ready />} />
          </Route>
          <Route path="/signUp" element={<Layout />}>
            <Route index element={<SignUp />} />
          </Route>
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </HistoryRouter>
    </QueryClientProvider>
  );
}

export default App;
