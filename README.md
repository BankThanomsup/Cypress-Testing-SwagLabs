# Cypress-Testing-SwagLabs

This project contains automated end-to-end (E2E) tests using [Cypress](https://www.cypress.io/) for the [Swag Labs](https://www.saucedemo.com/) demo web application.  
It aims to verify key functionalities like login, product display, and cart operations.

## 📦 Project Structure

Cypress-Testing-SwagLabs/
├── cypress/ # Test files and fixtures
├── node_modules/ # Dependencies (auto-generated)
├── cypress.config.js # Cypress config file
├── package.json # Project metadata and scripts
└── README.md # Project overview (this file)


## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/BankThanomsup/Cypress-Testing-SwagLabs.git
cd Cypress-Testing-SwagLabs

2. Install dependencies

npm install

3. Run Cypress Test Runner

npx cypress open


🧪 What We Test
✅ Login functionality

✅ Viewing product list

✅ Adding/removing items in the cart

✅ Navigating through pages

🛠 Tools Used
Cypress - End-to-end testing framework

Mocha - Test structure (describe, it)

Chai - Assertions (expect)