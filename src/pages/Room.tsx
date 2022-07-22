import styled from 'styled-components';
import { useEffect } from 'react';
import Header from '../components/room/Header';
import ScreenShare from '../components/room/ScreenShare';
import Sidebar from '../components/room/Sidebar';
import ScreenShareModal from '../components/room/ScreenModal';
import controlModal from '../stores/controlModal';
import usePreventLeave from '../hooks/usePreventLeave';

export default function Room() {
  const { isOpen } = controlModal();
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useEffect(() => {
    enablePrevent();
    return disablePrevent;
  }, []);

  return (
    <>
      <Component>
        <Header />
        <Contents>
          <ScreenShare />
          <Sidebar />
        </Contents>
      </Component>
      {isOpen && <ScreenShareModal />}
    </>
  );
}

const Component = styled.div`
  height: 100vh;
`;

const Contents = styled.div`
  background-color: #18181b;
  height: calc(100% - 10rem);
  display: flex;
  position: relative;
`;
