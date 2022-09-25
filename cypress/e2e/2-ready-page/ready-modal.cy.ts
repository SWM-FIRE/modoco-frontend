/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-vars */
import { API } from '../../config';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('check ready page modals', () => {
  beforeEach(() => {
    // mock get all rooms
    cy.intercept(
      { method: 'GET', url: API.ROOM },
      { fixture: 'allRooms.json' },
    );

    cy.intercept(
      { method: 'GET', url: `${API.ROOM}1` },
      { fixture: 'singleRoom.json' },
    );

    // mock get my data
    cy.intercept({ method: 'GET', url: API.ME }, { fixture: 'me.json' });
    cy.intercept(
      { method: 'GET', url: API.RECORDS },
      { fixture: 'records.json' },
    );

    // set local storage before start -> auto login
    localStorage.setItem('access_token', 'mock_access_token');
    cy.visit('http://localhost:3000');
    cy.viewport(1536, 960);
    // click to first room
    cy.get(
      ':nth-child(2) > [data-cy="main-room-entering"] > [data-cy="main-room-enter"]',
    ).click();

    cy.get('[data-cy="ready-card-container"]').should('be.visible');
    cy.wait(500);
  });

  // setting modal test
  it('check setting modal', () => {
    // open setting modal
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.wait(500);

    // check setting modal screen
    cy.get('[data-cy="setting-modal-screen"]')
      .should('have.prop', 'paused', false)
      .and('have.prop', 'ended', false)
      .and('have.prop', 'muted', true);

    // check dropdown
    cy.get('[data-cy="setting-modal-selector-container"]')
      .should('have.length', 3)
      .and('be.visible');
    // check camera drop down
    cy.get(
      ':nth-child(1) > [data-cy="setting-modal-dropdown-container"]',
    ).click();
    cy.get('[data-cy="setting-modal-dropdown-item"]')
      .should('have.length', 1)
      .and('contain.text', 'fake_device_0')
      .click();
    cy.get('[data-cy="setting-modal-dropdown"]').should('not.exist');
    cy.get(
      ':nth-child(1) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'fake_device_0');
    // check mic drop down
    cy.get(
      ':nth-child(2) > [data-cy="setting-modal-dropdown-container"]',
    ).click();
    cy.get('[data-cy="setting-modal-dropdown-item"]').should('have.length', 3);
    cy.get('[data-cy="setting-modal-dropdown"] > :nth-child(2)').click();
    cy.get('[data-cy="setting-modal-dropdown"]').should('not.exist');
    cy.get(
      ':nth-child(2) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'Fake Audio Input 1');
    // check speaker drop down
    cy.get(
      ':nth-child(3) > [data-cy="setting-modal-dropdown-container"]',
    ).click();
    cy.get('[data-cy="setting-modal-dropdown-item"]').should('have.length', 3);
    cy.get('[data-cy="setting-modal-dropdown"] > :nth-child(3)').click();
    cy.get('[data-cy="setting-modal-dropdown"]').should('not.exist');
    cy.get(
      ':nth-child(3) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'Fake Audio Output 2');
    // close modal
    cy.get('[data-cy="setting-modal-close-button"]').click();

    // reopen modal
    cy.get('[data-cy="ready-setting-button"]').click();
    // check previous selections
    cy.get(
      ':nth-child(1) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'fake_device_0');
    cy.get(
      ':nth-child(2) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'Fake Audio Input 1');
    cy.get(
      ':nth-child(3) > [data-cy="setting-modal-dropdown-container"]',
    ).should('have.text', 'Fake Audio Output 2');
  });

  it('close modal by click outside', () => {
    // close modal by click top
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.get('[data-cy="setting-modal-outer"]').click('top');
    cy.get('[data-cy="setting-modal"]').should('not.exist');

    // close modal by click bottom
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.get('[data-cy="setting-modal-outer"]').click('bottom');
    cy.get('[data-cy="setting-modal"]').should('not.exist');

    // close modal by click left
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.get('[data-cy="setting-modal-outer"]').click('left');
    cy.get('[data-cy="setting-modal"]').should('not.exist');

    // close modal by click right
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.get('[data-cy="setting-modal-outer"]').click('right');
    cy.get('[data-cy="setting-modal"]').should('not.exist');
  });
});
