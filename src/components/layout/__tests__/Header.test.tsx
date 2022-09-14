import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

describe('<Header />', () => {
  it('matches snapshot', () => {
    const utils = render(
      <Router>
        <Header />,
      </Router>,
    );
    expect(utils.container).toMatchSnapshot();
  });
  it('has logo', () => {
    const utils = render(
      <Router>
        <Header />,
      </Router>,
    );
    utils.getByText('modoco', { selector: 'h1' });
  });
  it('has loginButton', () => {
    const utils = render(
      <Router>
        <Header />,
      </Router>,
    );
    utils.getByText('로그인');
  });
});
