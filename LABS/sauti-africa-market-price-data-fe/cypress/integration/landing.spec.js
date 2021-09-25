describe('tests the marketing page', () => {
  it('checks for header', () => {
    cy.visit('/')
    cy.contains('Sauti Africa Market Price API')
  })

  it('finds docs nav items', () => {
    cy.contains('DOCS').click()
  })

  it('returns home', () => {
    cy.contains('HOME').click()
  })

  it('finds table nav items', () => {
    cy.contains('TABLE').click()
  })

  it('returns home', () => {
    cy.contains('HOME').click()
  })

  it('checks that boxes exists', () => {
    cy.get('.services').find('.service-one')
    cy.get('.services').find('.service-two')
    cy.get('.services').find('.service-three')
  })

  it('finds icons', () => {
    cy.get('.links')
      .find('.facebook')
      .click()
    cy.visit('localhost:3000/')
    cy.get('.links')
      .find('.twitter')
      .click()
    cy.visit('localhost:3000/')
  })
})
