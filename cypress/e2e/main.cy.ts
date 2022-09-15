describe('open main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should have a title', () => {
    cy.title().should('include', 'MODOCO');
  });

  it('should have a header', () => {
    cy.get('header').should('have.text', 'modoco');
  });
});
