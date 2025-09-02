import { test, expect } from '@playwright/test';

test.describe('Advanced Playwright Testing', () => {
  test('should handle API testing', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
  });

  test('should handle mobile viewport', async ({ page, context }) => {
    await context.setDefaultTimeout(30000);
    await page.goto('https://playwright.dev/');
    
    // Test responsive design
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should handle file upload', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // Create a temporary file for testing
    await page.setInputFiles('input[type="file"]', {
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Hello Playwright!')
    });
    
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('test.txt');
  });

  test('should handle authentication', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/basic_auth', {
      httpCredentials: {
        username: 'admin',
        password: 'admin'
      }
    });
    
    await expect(page.locator('p')).toContainText('Congratulations!');
  });
});