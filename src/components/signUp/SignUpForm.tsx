import styled from 'styled-components';
import media from 'src/styles/media';
import Avatar from './Avatar';
import Email from './Email';
import Nickname from './Nickname';
import Password from './Password';
import useSignUp from '../../hooks/useSignUp';

export default function SignUpForm() {
  const {
    inputs,
    onChange,
    onSubmit,
    onChangeAvatar,
    isValidEmail,
    isValidPassword,
    isDisable,
  } = useSignUp();
  const { avatar, nickname, email, password, passwordCheck } = inputs;
  return (
    <Container data-cy="register-container">
      <Title data-cy="register-title">회원가입</Title>
      <Form onSubmit={onSubmit} data-cy="register-form">
        <Avatar avatar={avatar} onChangeAvatar={onChangeAvatar} />
        <Nickname nickname={nickname} onChange={onChange} />
        <Email email={email} onChange={onChange} isValidEmail={isValidEmail} />
        <Password
          password={password}
          passwordCheck={passwordCheck}
          onChange={onChange}
          isValidPassword={isValidPassword}
        />
        <Submit disabled={isDisable()} data-cy="register-submit">
          회원가입
        </Submit>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background-color: #18181b;
  display: flex;
  flex-direction: column;
  width: 61rem;
  align-items: flex-start;
  margin: 0 auto;
  padding: 7.8rem 0 14.4rem 0;
  font-family: IBMPlexSansKRRegular;
  color: #f9fafb;
  font-size: 1.5rem;
  border-radius: 0.6rem;
  ${media.small} {
    width: 80%;
    padding: 3.6rem 0 4.2rem 0;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #f9fafb;
  ${media.small} {
    font-size: 2.4rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  input:focus {
    outline: none;
  }
`;

const Submit = styled.button`
  height: 5.5rem;
  background-color: #f3f4f6;
  color: #111827;
  width: 100%;
  font-size: 1.5rem;
  font-family: IBMPlexSansKRRegular;
  cursor: pointer;
  margin-top: 5rem;
  border-radius: 1rem;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
  ${media.small} {
    margin-top: 3rem;
    height: 4.6rem;
    font-size: 1.2rem;
  }
`;
