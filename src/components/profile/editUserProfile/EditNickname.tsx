import { useRef } from 'react';
import styled from 'styled-components';
import media from 'src/styles/media';

export default function EditNickname({ nickname, onChange }) {
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
    <Section>
      <Input
        id="nickname"
        type="text"
        name="nickname"
        value={nickname || ''}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="닉네임을 입력해주세요."
      />
      <Error ref={errorMsg} />
    </Section>
  );
}

const Section = styled.p`
  display: flex;
  flex-direction: column;
  max-width: 28rem;
  ${media.small} {
    width: 28rem;
  }
`;

const Input = styled.input`
  height: 4.9rem;
  padding: 1.2rem 0.8rem;
  color: #f1f5f9;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 3rem;
  font-family: IBMPlexMonoRegular;
  border-radius: 0.6rem;
  &::placeholder {
    font-size: 2rem;
  }
`;

const Error = styled.span`
  color: #ed8e8e;
  margin-top: 0.5rem;
`;
