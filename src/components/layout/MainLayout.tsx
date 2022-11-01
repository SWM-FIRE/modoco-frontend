import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import chattingModalStore from 'src/stores/chattingModalStore';
import Header from './Header';
import useMainModal from '../../hooks/useMainModal';
import Footer from './Footer';
import userStore from '../../stores/userStore';
import NoticeModal from '../notice/NoticeModal';
import ChattingModal from '../atoms/chattingModal/ChattingModal';

export default function MainLayout() {
  const { uid, nickname } = userStore();
  const { isOpenNoticeModal } = useMainModal();
  const profile = uid
    ? {
        email: localStorage.getItem('email'),
        name: nickname,
      }
    : null;
  const { isChattingModal } = chattingModalStore();
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
      {isChattingModal && <ChattingModal />}
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
