describe("Login Page", () => {
  it("TC-001: Input fields should display as the data that was filled", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
  });
  it("TC-002: Should show an error message if login without a username", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("be.visible");
  });
  it("TC-003: Should show an error message if login without a password", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("be.visible");
  });
  it("TC-004: Should show an error message if log in with both fields blank", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("be.visible");
  });
  it("TC-005: Should show an error message if login with invalid credentials", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("invalid_user");
    cy.get('[data-test="password"]').type("invalid_password");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should("be.visible");
  });
  it("TC-006: Should logged in successfully with valid credentials", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory");
  });
  it("TC-007: Should logged in successfully with performance glitch user", () => {
    let startTime;

    // เริ่มจับเวลา
    cy.visit("https://www.saucedemo.com/");
    cy.window().then((win) => {
      startTime = win.performance.now();
    });

    // ทำการ login
    cy.get('[data-test="username"]').type("performance_glitch_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // เมื่อไปถึง inventory page แล้ว จับเวลาและแสดงผล
    cy.url()
      .should("include", "/inventory")
      .then(() => {
        cy.window().then((win) => {
          const endTime = win.performance.now();
          const duration = (endTime - startTime).toFixed(2);
          cy.log(
            `⏱️ Login duration for performance_glitch_user: ${duration} ms`
          );
        });
      });
  });
  it("TC-008: Should logged in successfully with error user", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("error_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory");
  });
  it("TC-009: Should logged in successfully with visual user", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("visual_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory");
  });
});
