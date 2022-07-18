import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './fonts/font.css';
import Layout from './components/layout/Layout';
import Room from './pages/Room';
import Main from './pages/Main';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
          </Route>
          {/* <Route path="/room" element={<Layout />}> */}
          <Route path="/room/*" element={<Room />} />
          {/* </Route> */}
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
