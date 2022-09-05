import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import userStore from '../../stores/userStore';

export default function Layout() {
  const { uid, nickname } = userStore();
  const profile = uid
    ? {
        email: localStorage.getItem('email'),
        name: nickname,
      }
    : null;
  return (
    <>
      {uid ? (
        <ReactChannelIO
          pluginKey={process.env.REACT_APP_CHANNEL_IO_KEY}
          hideChannelButtonOnBoot={false}
          memberId={uid.toString()}
          language="ko"
          autoBoot
          autoBootTimeout={2000}
          profile={profile}
        />
      ) : (
        <ReactChannelIO
          pluginKey={process.env.REACT_APP_CHANNEL_IO_KEY}
          hideChannelButtonOnBoot={false}
          language="ko"
          autoBoot
          autoBootTimeout={2000}
        />
      )}
      <Outlet />
      <Footer />
    </>
  );
}

// const Container = styled.div`
//   width: 100vw;
//   height: 100vh;
// `;
