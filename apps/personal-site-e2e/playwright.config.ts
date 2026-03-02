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
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command:
      'pnpm --dir apps/personal-site exec vite --host localhost --port 4200 --strictPort',
    url: 'http://localhost:4200',
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
