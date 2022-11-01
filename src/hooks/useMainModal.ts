import { useState } from 'react';

export default function useMainModal() {
  const [modals, setModals] = useState({
    isOpenProfileModal: false,
    isOpenNoticeModal: false,
    isOpenRoomPasswordModal: false,
    isLobbyModal: false,
  });
  const {
    isOpenProfileModal,
    isOpenNoticeModal,
    isOpenRoomPasswordModal,
    isLobbyModal,
  } = modals;

  const setProfileModal = (type) => {
    setModals({
      ...modals,
      isOpenProfileModal: type,
    });
  };

  const setNoticeModal = (type) => {
    setModals({
      ...modals,
      isOpenNoticeModal: type,
    });
  };

  const setRoomPasswordModal = (type) => {
    setModals({
      ...modals,
      isOpenRoomPasswordModal: type,
    });
  };

  const setLobbyModal = (type) => {
    setModals({
      ...modals,
      isLobbyModal: type,
    });
  };

  return {
    isOpenProfileModal,
    isOpenNoticeModal,
    isOpenRoomPasswordModal,
    isLobbyModal,
    setProfileModal,
    setNoticeModal,
    setRoomPasswordModal,
    setLobbyModal,
  };
}
