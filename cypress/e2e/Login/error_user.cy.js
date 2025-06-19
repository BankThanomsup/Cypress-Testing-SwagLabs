import { ErrorUserAndAddAllToCart } from "../../support/ErrorUserLoginAndCart";

describe("Problem User - Add to Cart and Checkout Flow", () => {
  // ทำก่อนทุก test case
  beforeEach(() => {
    cy.clearLocalStorage();
    ErrorUserAndAddAllToCart();
  });

  it("TC-001: error_user should login successfully and add all 6 items to cart, but actually only 3 added", () => {
    // ตรวจสอบจำนวนไอเท็มบนหน้าร้านยังคง 6 ชิ้น
    cy.get(".inventory_item").should("have.length", 6);
    // ตรวจสอบจำนวนไอเท็มที่แสดงใน cart icon ต้องเป็น 3 (ตาม behavior ของ error_user)
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

  it("TC-004: Should fill personal information but last name may not be accepted", () => {
    // ไปหน้า checkout-step-one
    cy.get(".shopping_cart_link").click();

    // คลิก checkout
    cy.get('[data-test="checkout"]').click();

    // ตรวจสอบว่า URL ไปที่ checkout-step-one
    cy.url().should("include", "/checkout-step-one.html");

    // กรอก First name และ Zip/Postal Code ปกติ
    cy.get('[data-test="firstName"]').type("John");
    // กรอก Last Name
    cy.get('[data-test="lastName"]').type("Doe");

    // ตรวจสอบว่า lastName ถูกกรอกจริงไหม
    cy.get('[data-test="lastName"]')
      .invoke("val")
      .then((val) => {
        if (val !== "Doe") {
          cy.log(
            '⚠️ ไม่สามารถใส่ค่า lastName ได้: current value = "' + val + '"'
          );
        } else {
          cy.log("✅ ค่า lastName ถูกกรอกสำเร็จ");
        }
      });

    cy.get('[data-test="postalCode"]').type("12345");

    // กดปุ่ม Continue
    cy.get('[data-test="continue"]').click();
  });
  it("Complete order flow with error user handling", () => {
    cy.get(".shopping_cart_link").click(); // ไปหน้า cart
    cy.get('[data-test="checkout"]').click(); // ไปหน้า checkout step 1

    cy.get('[data-test="firstName"]').type("Thitikorn");
    cy.get('[data-test="lastName"]')
      .invoke("val")
      .then((val) => {
        if (val !== "Thanomsup") {
          cy.log(
            '⚠️ ไม่สามารถใส่ค่า lastName ได้: current value = "' + val + '"'
          );
        } else {
          cy.log("✅ ค่า lastName ถูกกรอกสำเร็จ");
        }
      });
    cy.get('[data-test="postalCode"]').type("10110");
    cy.get('[data-test="continue"]').click(); // ไป step 2

    cy.url().should("include", "/checkout-step-two.html");

    cy.get('[data-test="finish"]').click();

    // รอให้หน้าโหลดเสร็จแล้วเช็ค URL
    cy.url().then((url) => {
      if (url.includes("/checkout-complete.html")) {
        cy.log("✅ เสร็จสิ้นกระบวนการสำเร็จ");
      } else {
        cy.log("⚠️ เสร็จสิ้นกระบวนการ error_user");
      }
    });
  });
});
