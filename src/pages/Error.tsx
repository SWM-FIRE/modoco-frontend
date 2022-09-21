import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Error() {
  const [getUrl] = useSearchParams();
  const myStatus = getUrl.get('statusCode');
  const msg = getUrl.get('message');
  const navigate = useNavigate();

  const backHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <ErrorImage>
        <Img title="403" src="https://embed.lottiefiles.com/animation/26474" />
      </ErrorImage>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
        }}
      >
        <White>{myStatus} Error</White>
        <White>
          {msg === 'Invalid Credential'}이미 해당 이메일로 가입 하시지는
          않으셨나요?
        </White>
        <Button onClick={backHome}>홈으로 돌아가기</Button>
      </div>
    </Container>
  );
}

const Img = styled.iframe`
  width: 30vw;
  height: 30vw;
  border: none;
`;

const ErrorImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

const White = styled.div`
  color: white;
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const Container = styled.div``;

const Button = styled.button`
  width: 30vw;
  height: 5vh;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: black;
  font-size: 1.5rem;
`;
