 it('TC-001: Should show error if user is locked out', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  });