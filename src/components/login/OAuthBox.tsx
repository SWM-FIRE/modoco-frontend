/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Kakao from '../../assets/img/oauth/kakao.png';
import Github from '../../assets/img/oauth/github.png';
import Google from '../../assets/img/oauth/google.png';

export default function OAuthBox({ auth }: { auth: string }) {
  return (
    <Button>
      <Img
        src={auth === 'kakao' ? Kakao : auth === 'github' ? Github : Google}
        alt={auth}
      />
      {auth} 로그인
    </Button>
  );
}

const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.3rem;
  background-color: #f3f4f6;
  cursor: pointer;
  width: 100%;
  margin-top: 1.6rem;
  height: 5.5rem;
  border-radius: 1rem;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;
