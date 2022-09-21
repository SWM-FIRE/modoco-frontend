import { useRef } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function Email({ email, onChange, isValidEmail }) {
  const errorMsg = useRef(null);
  const onBlur = () => {
    if (!isValidEmail || !email) {
      errorMsg.current.style.display = 'block';
      if (!email) errorMsg.current.innerText = '필수 정보 입니다.';
      else if (!isValidEmail)
        errorMsg.current.innerText = '이메일 형식이 올바르지 않습니다.';
    } else {
      errorMsg.current.style.display = 'none';
    }
  };
  return (
    <Container isValidEmail={isValidEmail} data-cy="register-email">
      <Label htmlFor="email">이메일 *</Label>
      <Input
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="이메일을 입력해주세요."
        onBlur={onBlur}
        data-cy="register-email-input"
      />
      <Error ref={errorMsg} />
    </Container>
  );
}

interface sectionInterface {
  isValidEmail: boolean;
}

const Container = styled.p<sectionInterface>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 3rem;
  #regx {
    display: ${(props) => (props.isValidEmail ? 'none' : 'block')};
  }
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
  display: none;
  ${media.small} {
    font-size: 1.2rem;
  }
`;
