describe('order flow test', () => {
  it('should complete order', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('[data-test=ingredient-item-bun]').first().trigger('dragstart')
    cy.get('.burger-constructor-preview').first().trigger('drop')
    cy.wait(500)
    cy.get('[data-test=ingredient-item-main]').first().trigger('dragstart')
    cy.get('.burger-constructor-preview').trigger('drop')
    cy.wait(500)
    cy.get('button').contains('Оформить заказ').click()
    cy.wait(500)
    cy.contains('Вход');
    cy.get('[name=email]').type('alx.pedchenko@gmail.com')
    cy.wait(500)
    cy.get('[name=password]').type('123456')
    cy.get('button').contains('Войти').click()
    cy.wait(500)
    cy.contains('Соберите бургер');
    cy.get('button').contains('Оформить заказ').click()
    cy.intercept({
      method: "POST",
      url: "https://norma.nomoreparties.space/api/orders",
    }).as("fetch");
    cy.wait("@fetch");
    cy.wait(1000)
    cy.get('#modal button').click()
  })
})
