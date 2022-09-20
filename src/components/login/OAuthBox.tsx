/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import media from 'src/styles/media';
import { API } from '../../config';
import Kakao from '../../assets/img/oauth/kakao.png';
import Github from '../../assets/img/oauth/github.png';
import Google from '../../assets/img/oauth/google.png';

export default function OAuthBox({ auth }: { auth: string }) {
  const GithubURI = API.GITHUB;
  const KakaoURI = API.KAKAO;
  const GoogleURI = API.GOOGLE;
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/loading');
    window.location.href =
      auth === 'kakao' ? KakaoURI : auth === 'github' ? GithubURI : GoogleURI;
  };

  return (
    <Button onClick={handleLogin}>
      <Img
        src={auth === 'kakao' ? Kakao : auth === 'github' ? Github : Google}
        alt={auth}
      />
      <Text>{auth}로 계속하기</Text>
    </Button>
  );
}

const Text = styled.p`
  ${media.small} {
    display: none;
  }
`;

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
  ${media.small} {
    width: 6rem;
    height: 6rem;
    border-radius: 100%;
    background-color: #f3f4f6;
  }
`;
