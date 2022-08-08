import styled from 'styled-components';
import Header from '../components/signUp/Header';
import SignUpForm from '../components/signUp/SignUpForm';

export default function SignUp() {
  return (
    <>
      <Header />
      <Component>
        <SignUpForm />
      </Component>
    </>
  );
}

const Component = styled.div`
  background-color: #18181b;
  width: 100vw;
  margin: 0;
  padding: 0;
`;
