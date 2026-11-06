# E-Commerce Test Automation Framework

## Project Overview
An end-to-end test automation framework for an e-commerce application using Playwright and TypeScript. It includes UI automation and API testing.

## Technologies Used
- Playwright
- TypeScript
- Node.js
- API Testing
- Git and GitHub

## Application Under Test
- UI: https://www.saucedemo.com/
- API: https://fakestoreapi.com/

## Features

### UI Automation
- Login validation
- Product listing verification
- Product sorting
- Add and remove products from cart
- Checkout validation

### API Testing
- GET all products
- GET a single product
- POST create product
- PUT update product
- DELETE product

### Framework Design
- Page Object Model (POM)
- Reusable page classes
- Data-driven login tests using JSON test data
- Playwright HTML test reports

## Test Execution Results
- Total tests: 19
- Passed: 19
- Failed: 0

## How to Run the Project

1. Clone the repository.
2. Install dependencies:

   `npm install`

3. Install Playwright browsers:

   `npx playwright install chromium`

4. Run all tests:

   `npx playwright test --project=chromium`

5. View the HTML report:

   `npx playwright show-report`

## Project Structure

- `Pages/` – Page Object Model classes
- `tests/` – UI and API test cases
- `test-data/` – Test data files
- `screenshots/` – Project screenshots
- `playwright.config.ts` – Playwright configuration

## Author
QA Automation Testing Project | 2026