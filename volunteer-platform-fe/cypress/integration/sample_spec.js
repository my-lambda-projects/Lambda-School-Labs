/// <reference types="Cypress" />

describe('Testing', () => {
  it('Visits the app', () => { 
    cy.visit('localhost:3000');
    cy.pause()
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.get(
      '.ant-form > :nth-child(1) > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .sc-htpNat > .ant-input'
    )
      .type('Fake@email.com')
      .should('have.value', 'Fake@email.com');
  });
});
