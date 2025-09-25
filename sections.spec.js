import { test, expect } from '@playwright/test';

test.describe('Sections Presence Tests', () => {
  test('presenza sezioni #prenota, #servizi, #progetti, #chi-siamo, #contatti, #privacy, #cookie', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Verifica sezioni
    await expect(page.locator('#prenota')).toBeVisible();
    await expect(page.locator('#servizi')).toBeVisible();
    await expect(page.locator('#progetti')).toBeVisible();
    await expect(page.locator('#chi-siamo')).toBeVisible();
    await expect(page.locator('#contatti')).toBeVisible();
    await expect(page.locator('#privacy')).toBeVisible();
    await expect(page.locator('#cookie')).toBeVisible();
  });
});