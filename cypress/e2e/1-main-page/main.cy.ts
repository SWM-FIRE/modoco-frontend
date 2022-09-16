import { API } from '../../config';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('open main page', () => {
  beforeEach(() => {
    cy.intercept(
      { method: 'GET', url: API.ROOM },
      { fixture: 'allRooms.json' },
    );
    cy.visit('http://localhost:3000');
    cy.viewport(1536, 960);
  });

  it('render Main Props', () => {
    // check if title is visible
    cy.title().should('include', 'MODOCO');

    // check if login button is visible and clickable
    cy.get('[data-cy="main-login-button"]')
      .should('be.visible')
      .should('have.text', '로그인');

    // check modoco logo
    cy.get('[data-cy="modoco-logo"]').should('contain', 'modoco');

    // check if all footer props are visible
    cy.get('[data-cy="main-footer"]').should('be.visible');
    cy.get('[data-cy="footer-title').should('contain', 'Modoco');
    cy.get('[data-cy="footer-detail"]').should('contain', '아남타워');
    cy.get('button')
      .should('contain', 'Terms')
      .should('contain', 'Privacy Policy');
  });

  it('render Rooms', () => {
    // check if all rooms are rendered
    cy.get('[data-cy="main-room-cards"]').should('have.length', 7);

    // check if first room is rendered good
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-moderator"]',
    )
      .should('contain', '윤영기')
      .should('contain', '방장');
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    )
      .should('contain', '영기의 Cypress 방')
      .should('contain', 'Cypress 빡공하는')
      .should('contain', '#Cypress')
      .should('contain', '모닥불');

    // check if last room is rendered at overflow
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-moderator"]',
    )
      .should('contain', '현또')
      .should('contain', '방장');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.not.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.not.visible');
  });

  it('click arrow functions', () => {
    // check is arrow button works
    // first check right arrow and see if last element is now visible
    // also check if first element is hidden
    cy.get('[data-cy="right-arrow-transparent"]').trigger('mouseover');
    cy.get('[data-cy="right-arrow-button"]').click();
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.visible');
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.not.visible');
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.not.visible');

    // second check left arrow and see if first element is now visible
    // make sure last element is hidden again

    cy.get('[data-cy="left-arrow-transparent"]').trigger('mouseover');
    cy.get('[data-cy="left-arrow-button"]').click();
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.visible');
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.not.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    ).should('be.not.visible');
  });
});
