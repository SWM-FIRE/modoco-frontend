/* eslint-disable cypress/no-unnecessary-waiting */

import { API } from '../../config';

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('open create room modal in main page', () => {
  beforeEach(() => {
    // mock get all rooms
    cy.intercept(
      { method: 'GET', url: API.ROOM },
      { fixture: 'allRooms.json' },
    );

    // mock get my data
    cy.intercept({ method: 'GET', url: API.ME }, { fixture: 'me.json' });
    cy.intercept(
      { method: 'GET', url: API.RECORDS },
      { fixture: 'records.json' },
    );

    // mock post new room
    cy.intercept(
      { method: 'POST', url: API.ROOM },
      { fixture: 'newRoom.json' },
    );

    // set local storage before start -> auto login
    localStorage.setItem('access_token', 'mock_access_token');
    cy.visit('http://localhost:3000');
    cy.viewport(1536, 960);
    cy.wait(100);

    // check if room modal is opened
    cy.get('[data-cy="create-room-modal-open"]').click();
    cy.get('[data-cy="create-room-modal"]').should('be.visible');
    cy.wait(100);
  });

  // close modal test
  it('check close modal when user clicks close button', () => {
    // close modal
    cy.get('[data-cy="create-room-modal-close"]').click();
    cy.get('[data-cy="create-room-modal"]').should('not.exist');

    cy.wait(100);
  });

  it('check close modal when user clicks background', () => {
    cy.get('[data-cy="create-room-modal-background"]').click('left');
    cy.get('[data-cy="create-room-modal"]').should('not.exist');
  });

  // create room test
  it('check create room when user does not enter all required information', () => {
    // click create button when user does not enter room name
    cy.get('[data-cy="create-room-modal-create"]').should('be.disabled');
    cy.get('[data-cy="create-room-modal"]').should('be.visible');
    cy.get('[data-cy="create-room-modal-title"]').type(
      '1234567891011121314151617181920',
    );

    // check if title length is not over 14
    cy.get('[data-cy="create-room-modal-title"]').should(
      'be.not.length.greaterThan',
      14,
    );

    // check if details length is not over 30
    cy.get('[data-cy="create-room-modal-details"]').type(
      '12345678910111213141516171819202122232425262728',
    );
    cy.get('[data-cy="create-room-modal-details"]').should(
      'be.not.length.greaterThan',
      30,
    );

    // click create button when user does not enter room's total
    cy.get('[data-cy="create-room-modal-create"]').should('be.disabled');
    cy.get('[data-cy="create-room-modal-total"]').click();
    cy.get(
      '[data-cy="create-room-modal-total-dropdown"] > :nth-child(3)',
    ).click();

    // click create button when user does not enter room's theme
    cy.get('[data-cy="create-room-modal-create"]').should('be.disabled');
    cy.get('[data-cy="create-room-modal-theme"]').click();
    cy.get(
      '[data-cy="create-room-modal-theme-dropdown"] > :nth-child(3)',
    ).click();

    // click create button when user does not enter room's pw (optional)
    // private / public api 개발 후 테스트 코드 추가
    // cy.get('[data-cy="create-room-modal-private"]').click();
    // cy.get('[data-cy="create-room-modal-create"]').should('be.disabled');
    // cy.get('[data-cy="create-room-modal-pw"]').type('1234');

    // click create button when user enters all required information

    cy.get('[data-cy="create-room-modal-create"]').should('not.be.disabled');
    cy.get('[data-cy="create-room-modal-create"]').click();
    cy.wait(100);
  });
});
