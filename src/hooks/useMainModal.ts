import { useState } from 'react';

export default function useMainModal() {
  const [modals, setModals] = useState({
    isOpenLoginModal: false,
    isOpenProfileModal: false,
    isOpenNoticeModal: false,
    isOpenRoomPasswordModal: false,
    isLobbyModal: false,
  });
  const {
    isOpenLoginModal,
    isOpenProfileModal,
    isOpenNoticeModal,
    isOpenRoomPasswordModal,
    isLobbyModal,
  } = modals;

  const setLoginModal = (type) => {
    setModals({
      ...modals,
      isOpenLoginModal: type,
    });
  };

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
    isOpenLoginModal,
    isOpenProfileModal,
    isOpenNoticeModal,
    isOpenRoomPasswordModal,
    isLobbyModal,
    setLoginModal,
    setProfileModal,
    setNoticeModal,
    setRoomPasswordModal,
    setLobbyModal,
  };
}
