import { loginProblemUserAndAddAllToCart } from "../../support/ProblemUserLogin_And_Cart";

describe("Problem User - Add to Cart and Checkout Flow", () => {
  // ทำก่อนทุก test case
  beforeEach(() => {
    cy.clearLocalStorage();
    loginProblemUserAndAddAllToCart();
  });

  it("TC-001: problem_user logs in successfully but fails to add all items to cart as clicked", () => {
    // ตรวจสอบจำนวนไอเท็มบนหน้าร้านยังคง 6 ชิ้น
    cy.get(".inventory_item").should("have.length", 6);

    // ตรวจสอบจำนวนไอเท็มที่แสดงใน cart icon ต้องเป็น 3 (ตาม behavior ของ problem_user)
    cy.get(".shopping_cart_badge").should("have.text", "3");
  });

  it("TC-002: should navigate to cart page when clicking on cart icon and verify 3 items ", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    // ตรวจสอบว่ามีสินค้าใน cart 3 รายการ
    cy.get(".cart_item").should("have.length", 3);
  });

  it("TC-003: Should navigate to /checkout-step-one.html after clicking Checkout", () => {
    // ไปหน้า cart ก่อน
    cy.get(".shopping_cart_link").click();

    // คลิก checkout
    cy.get('[data-test="checkout"]').click();

    // ตรวจสอบว่า URL ไปที่ checkout-step-one
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("TC-004: Should show error if Last Name is empty ", () => {
    // ไปหน้า checkout-step-one
    cy.get(".shopping_cart_link").click();

    // คลิก checkout
    cy.get('[data-test="checkout"]').click();

    // ตรวจสอบว่า URL ไปที่ checkout-step-one
    cy.url().should("include", "/checkout-step-one.html");

    // กรอก First name และ Zip/Postal Code ปกติ
    cy.get('[data-test="firstName"]').type("John");
    // พยายามกรอก Last name แต่จะโดนโฟกัสเด้งกลับ (simulate)
    cy.get('[data-test="lastName"]').type("Doe");

    cy.get('[data-test="postalCode"]').type("12345");

    // กดปุ่ม Continue
    cy.get('[data-test="continue"]').click();

    // ตรวจสอบ error message
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Last Name is required");
  });
});
