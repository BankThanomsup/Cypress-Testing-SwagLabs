import { loginVisualUserAndAddAllToCart } from "../../support/VisualUserLoginAndCart";

describe("Visual User - Add to Cart and Checkout Flow", () => {
  // ทำก่อนทุก test case
  beforeEach(() => {
    cy.clearLocalStorage();
    loginVisualUserAndAddAllToCart();
  });

  it("TC-001: Should add all products to cart", () => {
    // ตรวจสอบว่ามี 6 สินค้าใน inventory
    cy.get(".inventory_item").should("have.length", 6);

    // ตรวจสอบว่าปุ่ม cart badge แสดงเลข 6
    cy.get(".shopping_cart_badge").should("have.text", "6");
  });

  it("TC-002: Should navigate to cart and verify 6 items", () => {
    // ไปหน้า cart
    cy.get(".shopping_cart_link").click();

    // ตรวจสอบว่าอยู่ที่ /cart.html
    cy.url().should("include", "/cart.html");

    // ตรวจสอบว่ามีสินค้าใน cart 6 รายการ
    cy.get(".cart_item").should("have.length", 6);
  });

  it("TC-003: Should navigate to /checkout-step-one.html after clicking Checkout", () => {
    // ไปหน้า cart ก่อน
    cy.get(".shopping_cart_link").click();

    // คลิก checkout
    cy.get('[data-test="checkout"]').click();

    // ตรวจสอบว่า URL ไปที่ checkout-step-one
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("TC-004: Should fill in personal info and proceed", () => {
    cy.get(".shopping_cart_link").click(); // ไปหน้า cart
    cy.get('[data-test="checkout"]').click(); // กด checkout

    // กรอกข้อมูลส่วนตัว
    cy.get('[data-test="firstName"]').type("Thitikorn");
    cy.get('[data-test="lastName"]').type("Thanomsup");
    cy.get('[data-test="postalCode"]').type("10110");

    cy.get('[data-test="continue"]').click(); // ดำเนินการต่อ
    cy.url().should("include", "/checkout-step-two.html");
  });
  it("TC-005: Should complete order and go back to home", () => {
    cy.get(".shopping_cart_link").click(); // ไปหน้า cart
    cy.get('[data-test="checkout"]').click(); // ไปหน้า checkout step 1

    cy.get('[data-test="firstName"]').type("Thitikorn");
    cy.get('[data-test="lastName"]').type("Thanomsup");
    cy.get('[data-test="postalCode"]').type("10110");
    cy.get('[data-test="continue"]').click(); // ไป step 2

    cy.url().should("include", "/checkout-step-two.html");


    cy.get('[data-test="finish"]').click();


    cy.url().should("include", "/checkout-complete.html");


    cy.contains("Thank you for your order!").should("be.visible");


    cy.get('[data-test="back-to-products"]').click();

    cy.url().should("include", "/inventory.html");
  });
});
