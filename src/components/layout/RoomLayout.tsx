import React from 'react';
import { ReactChannelIO } from 'react-channel-plugin';
import { Outlet } from 'react-router-dom';
import chattingModalStore from 'src/stores/chattingModalStore';
import ChattingModal from '../atoms/chattingModal/ChattingModal';
import userStore from '../../stores/userStore';

export default function RoomLayout() {
  const { uid, nickname } = userStore();
  const { isChattingModal } = chattingModalStore();
  const profile = uid
    ? {
        email: localStorage.getItem('email'),
        name: nickname,
      }
    : null;
  return (
    <>
      {isChattingModal && <ChattingModal />}
      <Outlet />
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
    </>
  );
}
