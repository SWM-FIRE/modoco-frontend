/* eslint-disable cypress/no-unnecessary-waiting */

import { API } from '../../config';

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('try register', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: API.ROOM },
      { fixture: 'allRooms.json' },
    );
    cy.intercept(
      { method: 'POST', url: API.USER },
      {
        statusCode: 201,
        body: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxNCwiZW1haWwiOiJhYkBhLmNvbSIsImlhdCI6MTY2MzM1MTQyNiwiZXhwIjoxNjYzNDM3ODI2fQ.AZkbDCnKQvi2Ui0H3RAr9NwCu-L_dM7CY2jhDBrnuiE',
        },
      },
    );
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('[data-cy="main-move-to-register"]').click();
    cy.viewport(1536, 960);
  });

  it('render register', () => {
    // check if all elements exist
    cy.get('[data-cy="register-container"]').should('be.visible');

    // check title
    cy.get('[data-cy="register-title"]')
      .should('be.visible')
      .should('contain', '회원가입');

    // check whole form
    cy.get('[data-cy="register-form"]').should('be.visible');

    // check avatar and refresh button
    cy.get('[data-cy="register-avatar"]')
      .should('be.visible')
      .should('contain', '프로필 이미지')
      .contains('button', '아바타 재생성');

    // check nickname input
    cy.get('[data-cy="register-nickname"]')
      .should('be.visible')
      .contains('label', '닉네임 *');
    cy.get('[data-cy="register-nickname-input"]').should(
      'have.attr',
      'placeholder',
      '닉네임을 입력해주세요.',
    );

    // check register input
    cy.get('[data-cy="register-email"]')
      .should('be.visible')
      .contains('label', '이메일 *');
    cy.get('[data-cy="register-email-input"]').should(
      'have.attr',
      'placeholder',
      '이메일을 입력해주세요.',
    );

    // check register password
    cy.get('[data-cy="register-password"]')
      .should('be.visible')
      .contains('label', '비밀번호 *');
    cy.get('[data-cy="register-password-input"]').should(
      'have.attr',
      'placeholder',
      '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    );

    // check register verification
    cy.get('[data-cy="register-password-verification"]')
      .should('be.visible')
      .contains('label', '비밀번호 확인 *');
    cy.get('[data-cy="register-password-verification-input"]').should(
      'have.attr',
      'placeholder',
      '비밀번호를 다시 입력해주세요.',
    );

    // check register button is disabled
    cy.get('[data-cy="register-submit"]')
      .should('be.visible')
      .should('be.disabled');
  });

  // register account with valid information
  it('successful register', () => {
    cy.get('[data-cy="register-avatar-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="register-nickname-input"]').type('test');
    cy.get('[data-cy="register-email-input"]').type('test@soma.com');
    cy.get('[data-cy="register-password-input"]').type('testest09!');
    cy.get('[data-cy="register-password-verification-input"]').type(
      'testest09!',
    );
    cy.get('[data-cy="register-submit"]').click();
    cy.wait(1000);
  });

  // register account without name
  it('try register without name', () => {
    cy.get('[data-cy="register-avatar-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="register-email-input"]').type('test@soma.com');
    cy.get('[data-cy="register-password-input"]').type('testest09!');
    cy.get('[data-cy="register-password-verification-input"]').type(
      'testest09!',
    );
    cy.get('[data-cy="register-submit"]').should('be.disabled');
  });

  // register account with wrong type of email
  it('register with wrong type of email', () => {
    cy.get('[data-cy="register-avatar-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="register-nickname-input"]').type('test');
    cy.get('[data-cy="register-email-input"]').type('testsoma.com');
    cy.get('[data-cy="register-password-input"]').type('testest09!');
    cy.get('[data-cy="register-password-verification-input"]').type(
      'testest09!',
    );
    cy.get('[data-cy="register-email"]').should(
      'have.text',
      '이메일 *이메일 형식이 올바르지 않습니다.',
    );
    cy.get('[data-cy="register-submit"]').should('be.disabled');
  });

  // register account with wrong verification password
  it('register with wrong verification password', () => {
    cy.get('[data-cy="register-avatar-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="register-nickname-input"]').type('test');
    cy.get('[data-cy="register-email-input"]').type('test@soma.com');
    cy.get('[data-cy="register-password-input"]').type('testest09!');
    cy.get('[data-cy="register-password-verification-input"]').type(
      'testertester09!!',
    );
    cy.get('[data-cy="register-container"]').click('top');
    cy.get('[data-cy="register-password-verification"]').should(
      'have.text',
      '비밀번호 확인 *비밀번호가 일치하지 않습니다.',
    );
    cy.get('[data-cy="register-submit"]').should('be.disabled');
  });

  // register account with wrong type of email and wrong verification password
  it('register with wrong type of email and wrong verification password', () => {
    cy.get('[data-cy="register-avatar-button"]').click();
    cy.wait(500);
    cy.get('[data-cy="register-nickname-input"]').type('test');
    cy.get('[data-cy="register-email-input"]').type('testsoma.com');
    cy.get('[data-cy="register-password-input"]').type('testest09!');
    cy.get('[data-cy="register-email"]').should(
      'have.text',
      '이메일 *이메일 형식이 올바르지 않습니다.',
    );
    cy.get('[data-cy="register-password-verification-input"]').type(
      'testertester09!!',
    );
    cy.get('[data-cy="register-container"]').click('top');
    cy.get('[data-cy="register-password-verification"]').should(
      'have.text',
      '비밀번호 확인 *비밀번호가 일치하지 않습니다.',
    );
    cy.get('[data-cy="register-submit"]').should('be.disabled');
  });
});
