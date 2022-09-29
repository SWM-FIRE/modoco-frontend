import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';
import mainModalStore from '../stores/mainModalStore';
import LoginModal from '../components/login/LoginModal';

export default function SignUp() {
  const { isOpenLoginModal } = mainModalStore();
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
