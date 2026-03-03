import { defineConfig, devices } from '@playwright/test';

const webServerPort = Number(process.env.PLAYWRIGHT_WEB_SERVER_PORT ?? '4200');

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
    baseURL: `http://localhost:${webServerPort}`,
    trace: 'on-first-retry',
  },
  expect: {
    timeout: 10_000,
  },
  webServer: {
    command:
      `pnpm --dir apps/personal-site exec vite --host localhost --port ${webServerPort} --strictPort`,
    url: `http://localhost:${webServerPort}`,
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
