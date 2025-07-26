# Binance WS Monitoring Suite

A practical, scalable monitoring solution for Binance WebSocket trade streams—ensuring real‑time data integrity, performance, and visibility.

---

## Overview  
This project provides a reliable monitoring suite for Binance WebSocket trade streams. It automates:

- **Latency Tracking**  
- **JSON Schema Validation**  
- **Trade Data Verification**  

…to deliver clear, visual insights into stream health and responsiveness. Perfect for QA engineers and developers aiming for proactive issue detection and optimization.

---

## Features

- **WebSocket Connection Testing**  
  Connects to Binance’s WebSocket API and verifies incoming trade events.

- **JSON Schema Validation**  
  Uses AJV to ensure messages strictly match the expected schema.

- **Latency Measurement**  
  Calculates delays between consecutive trade messages to monitor performance.

- **Custom Latency Report**  
  Generates an interactive HTML report with Chart.js line charts.

- **Allure Reporting Integration**  
  Attaches latency data, screenshots, and test steps for rich, navigable reports.

---

## Test Structure & Approach

1. **Trade Stream Test**  
   Verifies required fields (`e`, `s`, `p`, etc.) and basic value sanity.

2. **JSON Schema Validation Test**  
   Compiles and runs an AJV schema against incoming messages.

3. **Delay Test**  
   Collects timestamps of consecutive messages, computes delays, and asserts against thresholds.

_All tests use asynchronous WebSocket helpers and promise‑based flows for clean, maintainable code._

---

## Latency Reporting

- **Persistent JSON Log**: Appends each run’s `runAt`, `timestamps`, `delays`, and statistics to `allure-results/Binance_Trade_Delay_Log.json`.
- **Interactive HTML Chart**: Reads that JSON and renders a time‑series line chart via Chart.js in `Latency_Report.html`.

_Open the HTML directly via a local server (e.g., `npx serve ./allure-results`) to see evolving latency trends._

---

## Screenshots & Attachments

- **Allure Report**  
  - Step‑by‑step logs  
  - Failure screenshots  
  - HTML latency report attachment  

- **Manual Screenshot Support**  
  Utility functions available for capturing context‑specific screenshots.

---

## Technologies Used

- **Playwright** (TypeScript)  
- **Allure Reports** (`allure-playwright`)  
- **AJV** (JSON schema validation)  
- **Chart.js** (interactive HTML charts)  
- **ws** (WebSocket client)  
- **Node.js** / **npm**

---

## How to Use

```bash
# 1. Install dependencies
npm install

# 2. Run tests
npx playwright test

# 3. Generate & view Allure report
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report

# 4. View latency HTML chart
npx serve ./allure-results
# then open http://localhost:5000/Latency_Report.html
