import { test, expect } from '@playwright/test';

test.describe('Sections Tests', () => {
  test('verifica che tutte le sezioni principali siano presenti', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla sezioni principali
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.services')).toBeVisible();
    await expect(page.locator('.portfolio')).toBeVisible();
    await expect(page.locator('.about')).toBeVisible();
    await expect(page.locator('.contact')).toBeVisible();
    await expect(page.locator('.cta')).toBeVisible();
  });

  test('verifica che i collegamenti di navigazione funzionino correttamente', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla collegamenti di navigazione
    const navLinks = [
      { selector: 'a[href="#services"]', section: '.services' },
      { selector: 'a[href="#portfolio"]', section: '.portfolio' },
      { selector: 'a[href="#about"]', section: '.about' },
      { selector: 'a[href="#contact"]', section: '.contact' }
    ];

    for (const link of navLinks) {
      const element = page.locator(link.selector);
      await expect(element).toBeVisible();
      await element.click();
      
      // Controlla che la sezione target sia visibile dopo il click
      const targetSection = page.locator(link.section);
      await expect(targetSection).toBeInViewport();
    }
  });

  test('verifica che i collegamenti ai social media siano presenti', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla presenza dei collegamenti ai social media
    const socialLinks = [
      'a[href="https://x.com/vdagency27786"]',
      'a[href="https://www.instagram.com/daianavaiani0"]',
      'a[href="https://www.tiktok.com/@vdagencyita"]'
    ];

    for (const link of socialLinks) {
      await expect(page.locator(link)).toBeVisible();
    }
  });
});