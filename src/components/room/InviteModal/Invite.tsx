import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../../../config';

import roomModalStore from '../../../stores/room/roomModalStore';

export default function Invite() {
  const { inviteCode, setInviteCode } = roomModalStore();
  const { roomId } = useParams();

  useEffect(() => {
    axios.get((API.INVITE as string) + roomId).then((res) => {
      setInviteCode(`${process.env.REACT_APP_LAMBDA_INVITE}/${res.data}`);
    });
  }, []);

  const code =
    inviteCode.length > 20 ? inviteCode.slice(0, 20).concat('...') : inviteCode;

  return (
    <Component>
      초대링크
      <Code>{code}</Code>
      <CopyToClipboard
        text={inviteCode}
        onCopy={() => toast.success(`초대 링크가 복사되었습니다.`)}
      >
        <Button>복사</Button>
      </CopyToClipboard>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0 5rem;
  height: 50%;
  width: 100%;
  color: white;
  font-size: 2rem;
  gap: 1rem;
`;

const Button = styled.button`
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 1.4rem;
`;

const Code = styled.div`
  color: #eadc4d;
  flex-grow: 1;
`;
