import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  outputDir: '../../dist/.playwright/apps/personal-site-e2e/test-results',
  use: {
    baseURL: 'http://127.0.0.1:4200',
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command: 'NX_ISOLATE_PLUGINS=false pnpm nx run @org/personal-site:preview',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: !process.env.CI,
    cwd: '../../',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
