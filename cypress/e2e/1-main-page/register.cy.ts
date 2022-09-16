/* eslint-disable cypress/no-unnecessary-waiting */

// eslint-disable-next-line no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('try register', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signUp');
    cy.viewport(1536, 960);
  });
});
