/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-vars */

import { API } from '../../config';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('try login', () => {
  beforeEach(() => {
    // mock get all rooms
    cy.intercept(
      { method: 'GET', url: API.ROOM },
      { fixture: 'allRooms.json' },
    );

    // mock post my login data
    cy.intercept(
      { method: 'POST', url: API.SESSION },
      { fixture: 'loginResult.json' },
    );

    // mock get my data
    cy.intercept({ method: 'GET', url: API.ME }, { fixture: 'me.json' });
    cy.intercept(
      { method: 'GET', url: API.RECORDS },
      { fixture: 'records.json' },
    );
    cy.visit('http://localhost:3000');
    cy.viewport(1536, 960);
  });

  // successful login
  it('login success', () => {
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('input[placeholder="이메일"]').type('cypress@soma.com');
    cy.get('input[placeholder="비밀번호"]').type('cypress0909!!');
    cy.get('[data-cy="login-button"]').click();

    // submit login
    cy.wait(500);
    cy.get('[data-cy="main-profile"]').should('be.visible').click();

    // logout
    cy.wait(500);
    cy.get('[data-cy="profile-logout"]').click();
  });

  // goes to register page
  it('go to register', () => {
    cy.get('[data-cy="main-login-button"]').click();
    cy.wait(500);

    // click register page
    cy.get('[data-cy="main-move-to-register"]').click();
    cy.wait(500);

    // check if register page is rendered
    cy.get('[data-cy="register-container"]').should('be.visible');
  });

  // close login modal
  it('close login modal', () => {
    // click x to close
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('[data-cy="main-login-container"]').should('exist');
    cy.wait(500);
    cy.get('[data-cy="main-login-close"]').click();
    cy.get('[data-cy="main-login-container"]').should('not.exist');

    // click outside of modal to close -> top
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('[data-cy="main-login-container"]')
      .should('exist')
      .should('be.visible');
    cy.wait(500);
    cy.get('[data-cy="main-login-outer"]').click('top');
    cy.get('[data-cy="main-login-container"]').should('not.exist');

    // click outside of modal to close -> bottom
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('[data-cy="main-login-container"]')
      .should('exist')
      .should('be.visible');
    cy.wait(500);
    cy.get('[data-cy="main-login-outer"]').click('bottom');
    cy.get('[data-cy="main-login-container"]').should('not.exist');
  });
});
