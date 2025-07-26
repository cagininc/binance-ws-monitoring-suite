import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',             // testlerin olduğu klasör
  timeout: 30_000,                  // her test için max süre
  reporter: [
    ['list'],                       // konsola basit liste
    ['allure-playwright', { outputFolder: 'allure-results' }]  // Allure için
  ],
  use: {
    headless: true,                 // başlatılan browser'lar başsız
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5_000,
  },
});
