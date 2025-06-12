# Cypress-Testing-SwagLabs

โครงการนี้ประกอบด้วยการทดสอบอัตโนมัติแบบ End-to-End (E2E) ด้วย [Cypress](https://www.cypress.io/) สำหรับเว็บแอปพลิเคชันตัวอย่าง [Swag Labs](https://www.saucedemo.com/)  
โดยมีเป้าหมายเพื่อยืนยันความถูกต้องของฟีเจอร์สำคัญ เช่น การเข้าสู่ระบบ แสดงรายการสินค้า และการทำงานของตะกร้าสินค้า

## 📦 โครงสร้างโปรเจกต์
Cypress-Testing-SwagLabs/  
├── cypress/ # Test files and fixtures  
├── node_modules/ # Dependencies (auto-generated)  
├── cypress.config.js # Cypress config file  
├── package.json # Project metadata and scripts  
└── README.md # Project overview (this file)  

## 🚀 เริ่มต้นใช้งาน

1. โคลน repository
```bash
git clone https://github.com/BankThanomsup/Cypress-Testing-SwagLabs.git

cd Cypress-Testing-SwagLabs
```
2.ติดตั้ง dependencies
```bash
npm install
```

3.เปิด Cypress Test Runner
```bash
npx cypress open
```

🧪 สิ่งที่เราทดสอบ
✅ ฟังก์ชันการเข้าสู่ระบบ (Login)
✅ การดูรายการสินค้า
✅ การเพิ่ม/ลบสินค้าในตะกร้า
✅ การนำทางระหว่างหน้า

🛠 เครื่องมือที่ใช้
Cypress — เฟรมเวิร์กสำหรับ E2E Testing
Mocha — สำหรับกำหนดโครงสร้างเทส (describe, it)
Chai — สำหรับ assertion (expect)
