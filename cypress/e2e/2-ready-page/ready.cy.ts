/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-unused-vars */
import { API } from '../../config';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('open main page', () => {
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

  // render ready page
  it('render ready page', () => {
    // check setting modal
    cy.get('[data-cy="ready-setting-container"]')
      .should(
        'contain.text',
        '코딩방 입장 전 화면과 오디오 상태를 체크하는 곳입니다',
      )
      .should('contain.text', '기기 설정');
    cy.get('[data-cy="ready-setting-button"]').click();
    cy.get('[data-cy="setting-modal"]').should('be.visible');
    cy.get('[data-cy="setting-modal-close-button"]').click();

    // check room infos
    cy.get('[data-cy="ready-card-header"]').should('be.visible');
    // card moderator
    cy.get('[data-cy="ready-card-name"]')
      .should('be.visible')
      .should('contain.text', '방장')
      .should('contain.text', '윤영기');
    // card title
    cy.get('[data-cy="ready-card-title"]').should('be.visible');
    cy.get('[data-cy="ready-card-main-title"]')
      .should('be.visible')
      .should('contain.text', '영기의 Cypress 방');
    // card title
    cy.get('[data-cy="ready-card-detail-title"]')
      .should('be.visible')
      .should('contain.text', 'Cypress 빡공하는 방입니다, 아무나 컴');
    // card tags
    cy.get('[data-cy="ready-card-tag"]')
      .should('have.length', 3)
      .should('contain.text', '#Cypress')
      .should('contain.text', '#JAVA')
      .should('contain.text', '#GoF');
    // card detail
    cy.get('[data-cy="card-room-detail"]')
      .should('be.visible')
      .should('contain.text', '🔥')
      .should('contain.text', '참여중');
    cy.get('[data-cy="ready-enter-button"]').should('be.visible');

    // check screen and mic button
    cy.get('[data-cy="ready-screen-button"]').should('be.visible');
    cy.get('[data-cy="ready-mic-button"]').should('be.visible');

    // go to room page
    cy.get('[data-cy="ready-enter-button"]').click();
    cy.url().should('include', '/room/1');
  });

  it('check media buttons', () => {
    // check mic button
    cy.get('[data-cy="ready-mic-button"]').click();

    // check screen button
    cy.get('[data-cy="ready-screen-button"]').click();
    cy.get('[data-cy="ready-screen"]').should('have.prop', 'ended');
    cy.get('[data-cy="ready-screen-button"]').click();
    cy.get('[data-cy="ready-screen"]')
      .should('have.prop', 'ended', false)
      .and('have.prop', 'paused', false)
      .and('have.prop', 'muted', true);
  });
});
