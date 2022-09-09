import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';
import LoginModalStore from '../stores/loginModalStore';
import LoginModal from '../components/login/LoginModal';

export default function SignUp() {
  const { isOpenLoginModal } = LoginModalStore();
  return (
    <>
      <Component>
        <SignUpForm />
      </Component>
      {isOpenLoginModal && <LoginModal />}
    </>
  );
}

const Component = styled.div`
  background-color: #18181b;
  width: 100vw;
  margin: 0;
  padding: 0;
`;
