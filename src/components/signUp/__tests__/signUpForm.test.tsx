import React from 'react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from '../SignUpForm';

function renderSignUp() {
  // mocking submit button -> not used
  const onSubmit = jest.fn();

  // render SignUpForm
  const result = render(
    <Router>
      <SignUpForm />
    </Router>,
  );

  // get blocks
  const Heading = () => result.getByText('회원가입', { selector: 'h1' });
  const Nickname = () => result.getByPlaceholderText('닉네임을 입력해주세요.');
  const Email = () => result.getByPlaceholderText('이메일을 입력해주세요.');
  const FirstPassword = () =>
    result.getByPlaceholderText(
      '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    );
  const SecondPassword = () =>
    result.getByPlaceholderText('비밀번호를 다시 입력해주세요.');

  // make events for blocks
  const typeNickname = (name: string) => {
    userEvent.type(Nickname(), name);
  };
  const typeEmail = (name: string) => {
    userEvent.type(Email(), name);
  };
  const typeFirstPassword = (pass: string) => {
    userEvent.type(FirstPassword(), pass);
  };
  const typeSecondPassword = (pass: string) => {
    userEvent.type(SecondPassword(), pass);
  };
  const SignUpButton = () =>
    result.getByText('회원가입', { selector: 'button' });
  const clickSubmit = () => {
    userEvent.click(SignUpButton());
  };

  return {
    result,
    Heading,
    Nickname,
    Email,
    FirstPassword,
    SecondPassword,
    typeNickname,
    typeEmail,
    typeFirstPassword,
    typeSecondPassword,
    SignUpButton,
    clickSubmit,
    onSubmit,
  };
}

describe('<SignUpForm />', () => {
  it('sign up form rendering', () => {
    const {
      Heading,
      Nickname,
      Email,
      FirstPassword,
      SecondPassword,
      SignUpButton,
    } = renderSignUp();

    // check if blocks are rendered
    expect(Email()).toBeInTheDocument();
    expect(Nickname()).toBeInTheDocument();
    expect(Heading()).toBeInTheDocument();
    expect(FirstPassword()).toBeInTheDocument();
    expect(SecondPassword()).toBeInTheDocument();
    expect(SignUpButton()).toBeInTheDocument();
  });

  it('form 값으로 onSubmit을 호출.', async () => {
    const {
      Email,
      Nickname,
      FirstPassword,
      SecondPassword,
      typeNickname,
      typeEmail,
      typeFirstPassword,
      typeSecondPassword,
      clickSubmit,
    } = renderSignUp();

    // make events for blocks
    typeNickname('영기');
    typeEmail('yeonggi@mail.com');
    typeFirstPassword('somatest0909!');
    typeSecondPassword('somatest0909!');
    clickSubmit();

    // check if events are working
    expect(Email()).toContainHTML('yeonggi@mail.com');
    expect(Nickname()).toContainHTML('영기');
    expect(FirstPassword()).toContainHTML('somatest0909!');
    expect(SecondPassword()).toContainHTML('somatest0909!');
  });
});
