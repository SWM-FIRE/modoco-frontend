import axios from 'axios';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { API } from '../config';

export default function Invite() {
  const [isInvited, setIsInvited] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const onClickInviteButton = () => {
    const roomId = '123';
    axios.get((API.INVITE as string) + roomId).then((res) => {
      console.log(res);
      setIsInvited(true);
      setInviteCode(`${process.env.REACT_APP_LAMBDA_INVITE}/${res.data}`);
    });
  };

  const code = inviteCode.slice(0, 10);

  return (
    <Component>
      <Toaster />
      <CodeComponent>
        {!isInvited ? (
          <Button type="button" onClick={onClickInviteButton}>
            초대하기
          </Button>
        ) : (
          <>
            초대링크
            <Code>{code}</Code>
            <CopyToClipboard
              text={inviteCode}
              onCopy={() => toast.success(`복사되었습니다. ${inviteCode}`)}
            >
              <Button>복사</Button>
            </CopyToClipboard>
            <Button onClick={() => setIsInvited(false)}>이전</Button>
          </>
        )}
      </CodeComponent>
    </Component>
  );
}

const Component = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 1.4rem;
  &:hover {
    color: #ffe2e2;
  }
`;

const CodeComponent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  top: 50rem;
  width: fit-content;
  margin: 0 auto;
  font-size: 2rem;
  background-color: #646464;
  padding: 1rem;
  border-radius: 2rem;
  color: white;
`;

const Code = styled.div`
  color: #eadc4d;
`;
