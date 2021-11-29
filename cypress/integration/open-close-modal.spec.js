describe('open and close modal', () => {
  it('should open ingredient details modal and close', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('[data-test=ingredient-item-bun]').first().click()
    cy.wait(1000)
    cy.get('#modal button').click()
    cy.wait(1000)
  })
})
