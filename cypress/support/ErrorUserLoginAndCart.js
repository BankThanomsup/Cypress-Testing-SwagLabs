export function ErrorUserAndAddAllToCart() {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type('error_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();
  cy.get('button.btn_inventory').each((btn) => {
    cy.wrap(btn).click();
  });
}