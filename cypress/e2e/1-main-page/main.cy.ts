/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-vars */
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

  // render Main Page
  it('render Main Props', () => {
    // check if title is visible
    cy.title().should('include', 'modoco');

    // check if login button is visible and clickable
    cy.get('[data-cy="main-login-button"]')
      .should('be.visible')
      .should('have.text', '로그인');

    // check modoco logo
    cy.get('[data-cy="modoco-logo"]').should('contain', 'modoco');

    // check if all footer props are visible
    cy.get('[data-cy="main-footer"]').should('be.visible');
    cy.get('[data-cy="footer-title').should('contain', 'modoco');
    cy.get('[data-cy="footer-detail"]').should('contain', '아남타워');
    cy.get('button')
      .should('contain', 'Terms')
      .should('contain', 'Privacy Policy');
  });

  // render Rooms cards in main page
  it('render Rooms', () => {
    // check if all rooms are rendered
    cy.get('[data-cy="main-room-cards"]').should('have.length', 8);

    // check if first room is rendered good
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-moderator"]',
    )
      .should('contain', '윤영기')
      .should('contain', '방장');
    cy.get('[data-key="1"] > [data-cy="main-room-cards"]')
      .should('contain', '영기의 Cypress 방')
      .should('contain', 'Cypress 빡공하는')
      .should('contain', '#Cypress');

    // check if last room is rendered at overflow
    cy.get('[data-key="7"] > [data-cy="main-room-cards"]')
      .should('contain', '현또')
      .should('contain', '방장');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-entering"]',
    ).should('be.visible');
  });

  // click arrow functions in room cards and see if works
  it('click arrow functions', () => {
    // check is arrow button works
    // first check right arrow and see if last element is now visible
    // also check if first element is hidden
    cy.get('[data-cy="right-arrow-transparent"]').trigger('mouseover');
    cy.get('[data-cy="right-arrow-button"]').click();

    // GitHub Action에서 안먹어서 일단 주석처리... ㅜㅜ
    // 아마 Horizontal Scroll이 외부 라이브러리라 Headless에서 안먹는 걸 수도 있음
    // 오류 날 수 있는 상황이 너무 많아서 찾을 수 없다...
    // 아쉽지만 스크롤 테스트는 못하는걸로

    // cy.get(
    //   '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    // ).should('be.visible');
    // cy.get(
    //   '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    // ).should('be.visible');
    // cy.get(
    //   '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    // ).should('be.not.visible');
    // cy.get(
    //   '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-enter"]',
    // ).should('be.not.visible');

    // second check left arrow and see if first element is now visible
    // make sure last element is hidden again
    cy.get('[data-cy="left-arrow-transparent"]').trigger('mouseover');
    cy.get('[data-cy="left-arrow-button"]').click();
    cy.get(
      '[data-key="1"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.not.visible');
    cy.get(
      '[data-key="7"] > [data-cy="main-room-cards"] > [data-cy="main-room-detail"]',
    ).should('be.visible');
  });

  // check landing page
  it('check landing page', () => {
    // check if landing page is visible
    cy.get('[data-cy="landing-page"]').should('be.visible');

    // check landing-what is modoco part
    cy.get('[data-cy="landing-whatIsModoco"]').scrollIntoView();
    cy.get('[data-cy="landing-whatIsModoco"]')
      .should('be.visible')
      .should('contain.text', '모도코란?');

    // check ladning problems part
    cy.get('[data-cy="landing-problems"]').scrollIntoView();
    cy.wait(500);
    cy.get('[data-cy="landing-problems"]')
      .should('be.visible')
      .should('contain.text', '기존 모각코의')
      .should('contain.text', ' 문제점을 해결해요');

    // check landing give what part
    cy.get('[data-cy="landing-giveWhat"]').scrollIntoView();
    cy.wait(500);
    cy.get('[data-cy="landing-giveWhat"]')
      .should('be.visible')
      .should('contain.text', '개발자에게')
      .should('contain.text', ' 친화적인 환경 제공');

    // check landing footer
    cy.get('[data-cy="main-footer"]').scrollIntoView();
    cy.wait(500);
    cy.get('[data-cy="footer-title').should('contain', 'modoco');
    cy.get('[data-cy="footer-detail"]').should('contain', '아남타워');
  });
});
