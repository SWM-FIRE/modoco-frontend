import { useRef } from 'react';
import styled from 'styled-components';

export default function Password({
  password,
  passwordCheck,
  onChange,
  isValidPassword,
}) {
  const errorMsgPW = useRef(null);
  const errorMsgPWCheck = useRef(null);
  const onBlurPw = () => {
    if (!password) {
      errorMsgPW.current.style.display = 'block';
      errorMsgPW.current.innerText = '필수 정보 입니다.';
    } else if (!isValidPassword) {
      errorMsgPW.current.style.display = 'block';
      errorMsgPW.current.innerText =
        '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
    } else {
      errorMsgPW.current.style.display = 'none';
    }
  };

  const onBlurPwCheck = () => {
    if (!passwordCheck) {
      errorMsgPWCheck.current.style.display = 'block';
      errorMsgPWCheck.current.innerText = '필수 정보 입니다.';
    } else if (password !== passwordCheck) {
      errorMsgPWCheck.current.style.display = 'block';
      errorMsgPWCheck.current.innerText = '비밀번호가 일치하지 않습니다.';
    } else {
      errorMsgPWCheck.current.style.display = 'none';
    }
  };

  return (
    <>
      <Container data-cy="register-password">
        <Label htmlFor="password">비밀번호 *</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          onBlur={onBlurPw}
          placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
          data-cy="register-password-input"
        />
        <Error ref={errorMsgPW} />
      </Container>
      <Container data-cy="register-password-verification">
        <Label htmlFor="passwordCheck">비밀번호 확인 *</Label>
        <Input
          type="password"
          id="passwordCheck"
          name="passwordCheck"
          value={passwordCheck}
          onChange={onChange}
          onBlur={onBlurPwCheck}
          placeholder="비밀번호를 다시 입력해주세요."
          data-cy="register-password-verification-input"
        />
        <Error ref={errorMsgPWCheck} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
`;

const Label = styled.label`
  color: #b0b8c1;
  font-size: 1.4rem;
`;

const Input = styled.input`
  margin-top: 1.2rem;
  height: 4.9rem;
  padding-left: 1.6rem;
  color: #f9fafb;
  background-color: #191f28;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  border-radius: 0.6rem;
`;

const Error = styled.span`
  color: #ed8e8e;
  margin-top: 0.5rem;
`;
