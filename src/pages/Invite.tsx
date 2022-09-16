import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { API } from '../config';

export default function Invite() {
  const [isInvited, setIsInvited] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const onClickInviteButton = () => {
    const roomId = '1';
    axios.get((API.INVITE as string) + roomId).then((res) => {
      console.log(res);
      setIsInvited(true);
      setInviteCode(res.data);
    });
  };

  return (
    <Component>
      {!isInvited && (
        <Button type="button" onClick={onClickInviteButton}>
          초대하기
        </Button>
      )}
      {isInvited && (
        <Button onClick={() => setIsInvited(false)}>
          링크
          {inviteCode && <Code>{inviteCode}</Code>}
        </Button>
      )}
    </Component>
  );
}

const Component = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin: 0 auto;
  top: 50rem;
  cursor: pointer;
  background-color: #646464;
  padding: 1rem;
  border-radius: 2rem;
`;

const Code = styled.div`
  color: #eadc4d;
  margin-left: 1rem;
`;
