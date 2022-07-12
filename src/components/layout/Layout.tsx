import React from 'react';
import { Outlet } from 'react-router-dom';
// import styled from 'styled-components';
import Footer from './Footer';

export default function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
// `;
