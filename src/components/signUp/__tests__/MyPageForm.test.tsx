import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyPageForm from '../MyPageForm';

describe('<MyPageForm />', () => {
  it('matches snapshot', () => {
    const utils = render(
      <Router>
        <MyPageForm />,
      </Router>,
    );
    expect(utils.container).toMatchSnapshot();
  });
  it('has a buttons', () => {
    const utils = render(
      <Router>
        <MyPageForm />,
      </Router>,
    );
    // MyPage에 있는지 확인
    utils.getByText('아바타 재생성');
    utils.getByText('프로필 이미지');
    utils.getByText('프로필 수정');
    utils.getByText('수정 완료');
  });
});
