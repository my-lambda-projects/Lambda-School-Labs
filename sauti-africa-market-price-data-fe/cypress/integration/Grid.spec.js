describe('<Hero />', () => {
  it('hero component renders', () => {
    cy.visit('/data')
    cy.get('h1').should('have.text', 'Sauti Market Prices API')
    cy.contains(
      "A public-facing API that allows you to access Sauti Africa's market price data"
    )
    cy.contains('Please login to view the table')
  })
})
