import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import mainModalStore from 'src/stores/mainModalStore';
import Header from './Header';
import Footer from './Footer';
import userStore from '../../stores/userStore';
import NoticeModal from '../notice/NoticeModal';

export default function MainLayout() {
  const { uid, nickname } = userStore();
  const { isOpenNoticeModal } = mainModalStore();
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
      {isOpenNoticeModal && <NoticeModal />}
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
