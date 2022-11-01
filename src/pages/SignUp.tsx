import styled from 'styled-components';
import SignUpForm from '../components/signUp/SignUpForm';
import LoginModal from '../components/login/LoginModal';
import loginModalStore from '../stores/loginModalStore';

export default function SignUp() {
  const { isOpenLoginModal, setLoginModal } = loginModalStore();
  const closeLoginModal = () => {
    setLoginModal(false);
  };
  return (
    <>
      <Component>
        <SignUpForm />
      </Component>
      {isOpenLoginModal && <LoginModal closeLoginModal={closeLoginModal} />}
    </>
  );
}

const Component = styled.div`
  background-color: #18181b;
  width: 100vw;
  margin: 0;
  padding: 0;
`;
