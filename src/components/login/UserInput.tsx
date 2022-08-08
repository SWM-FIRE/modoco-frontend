import styled from 'styled-components';

export default function UserInput() {
  return (
    <Form>
      <Input placeholder="이메일" required />
      <Input type="password" placeholder="비밀번호" required />
      <Button>로그인</Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input:first-child {
    border-radius: 1rem 1rem 0 0;
    margin-top: 1rem;
  }

  input:nth-child(2) {
    border-radius: 0 0 1rem 1rem;
  }

  input:focus {
    border: 1px solid lightblue;
  }
`;

const Input = styled.input`
  font-size: 1.5rem;
  width: 100%;
  height: 4.9rem;
  background: transparent;
  outline: none;
  color: white;
  font-family: IBMPlexSansKRRegular;
  background-color: #191f28;
  padding-left: 1.6rem;
`;

const Button = styled.button`
  font-family: IBMPlexSansKRRegular;
  font-size: 1.5rem;

  background-color: #f3f4f6;
  cursor: pointer;
  width: 100%;
  margin-top: 2.6rem;
  height: 5.5rem;
  border-radius: 1rem;
`;
