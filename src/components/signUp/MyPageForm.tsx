import styled from 'styled-components';
import Avatar from './Avatar';
import Nickname from './Nickname';
import useChangeProfile from '../../hooks/useChangeProfile';

export default function MyPageForm() {
  const { inputs, onChange, onSubmit, onChangeAvatar, isDisable } =
    useChangeProfile();
  const { avatar, nickname } = inputs;
  return (
    <Container>
      <Title>프로필 수정</Title>
      <Form onSubmit={onSubmit}>
        <Avatar avatar={avatar} onChangeAvatar={onChangeAvatar} />
        <Nickname nickname={nickname} onChange={onChange} />
        <Submit disabled={isDisable()}>수정 완료</Submit>
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
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #f9fafb;
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
  border-radius: 1rem;
  font-family: IBMPlexSansKRRegular;
  cursor: pointer;
  margin-top: 5rem;
  :disabled {
    cursor: default;
    background-color: #a9afb8;
  }
`;
