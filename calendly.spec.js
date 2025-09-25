import { test, expect } from '@playwright/test';

test.describe('Calendly Widget Tests', () => {
  test('verifica che il widget Calendly carichi correttamente e abbia fallback', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla la presenza del container Calendly
    const calendlyContainer = page.locator('.calendly-inline-widget');
    await expect(calendlyContainer).toBeVisible();

    // Controlla che il widget sia stato caricato (iframe presente)
    const iframe = calendlyContainer.locator('iframe');
    await expect(iframe).toBeAttached();

    // Controlla che il fallback sia nascosto quando il widget è caricato
    const fallback = page.locator('#calendly-fallback');
    await expect(fallback).toBeHidden();
  });

  test('verifica fallback Calendly quando il widget non carica', async ({ page }) => {
    // Simula un errore di caricamento del widget Calendly
    await page.route('**/calendly.com/**', route => route.abort());

    await page.goto('http://localhost:5173');

    // Controlla che il fallback sia visibile quando il widget non carica
    const fallback = page.locator('#calendly-fallback');
    await expect(fallback).toBeVisible();
  });
});