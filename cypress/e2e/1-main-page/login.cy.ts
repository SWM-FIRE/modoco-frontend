Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('try login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.viewport(1536, 960);
  });

  it('login', () => {
    cy.get('[data-cy="main-login-button"]').click();
    cy.get('input[placeholder="이메일"]').type('cypress@soma.com');
    cy.get('input[placeholder="비밀번호"]').type('cypress0909!!');
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="main-profile"]').should('be.visible');
  });
});
