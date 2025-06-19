export function loginPerformanceGlitchUserAndAddAllToCart() {
  cy.visit('https://www.saucedemo.com/');
  cy.window().then((win) => {
    win._startLoginTime = win.performance.now();
  });

  cy.get('[data-test="username"]').type('performance_glitch_user');
  cy.get('[data-test="password"]').type('secret_sauce');
  cy.get('[data-test="login-button"]').click();

  cy.url().should("include", "/inventory").then(() => {
    cy.window().then((win) => {
      const duration = (win.performance.now() - win._startLoginTime).toFixed(2);
      cy.log(`⏱️ Login duration: ${duration} ms`);
    });
  });

  // เพิ่มสินค้า
  cy.get('button.btn_inventory').each(($btn) => {
    cy.wrap($btn).click();
  });
}