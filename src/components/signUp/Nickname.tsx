import { useRef } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function Nickname({ nickname, onChange }) {
  const errorMsg = useRef(null);
  const onBlur = () => {
    if (!nickname) {
      errorMsg.current.style.display = 'block';
      errorMsg.current.innerText = '필수 정보 입니다.';
    } else if (nickname.size < 1 || nickname.size > 10) {
      errorMsg.current.style.display = 'block';
      errorMsg.current.innerText = '1~10자 이내로 입력해주세요.';
    } else {
      errorMsg.current.style.display = 'none';
    }
  };
  return (
    <Container data-cy="register-nickname">
      <Label htmlFor="nickname">닉네임 *</Label>
      <Input
        id="nickname"
        type="text"
        name="nickname"
        value={nickname}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="닉네임을 입력해주세요."
        data-cy="register-nickname-input"
      />
      <Error ref={errorMsg} />
    </Container>
  );
}

const Container = styled.p`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
  ${media.small} {
    margin-top: 1.5rem;
  }
`;

const Label = styled.label`
  color: #b0b8c1;
  font-size: 1.4rem;
`;

const Input = styled.input`
  margin-top: 1.2rem;
  height: 4.9rem;
  padding-left: 1.6rem;
  background-color: #191f28;
  border-radius: 1rem;
  color: #f9fafb;
`;

const Error = styled.span`
  color: #ed8e8e;
  margin-top: 0.5rem;
  ${media.small} {
    font-size: 1.2rem;
  }
`;
