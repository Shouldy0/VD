import { test, expect } from '@playwright/test';

test.describe('Page Load Tests', () => {
  test('la pagina carica con status 200 e title contiene "VD Agency"', async ({ page }) => {
    const response = await page.goto('http://localhost:5173');
    expect(response.status()).toBe(200);
    
    const title = await page.title();
    expect(title).toContain('VD Agency');
  });
});