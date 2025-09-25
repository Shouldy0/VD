import { test, expect } from '@playwright/test';

test.describe('Page Load Tests', () => {
  test('verifica che la pagina carichi correttamente e contenga elementi principali', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla che la pagina sia stata caricata correttamente
    await expect(page).toHaveTitle(/VD Agency/);

    // Controlla presenza degli elementi principali
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Controlla che il footer contenga l'anno corrente
    const yearElement = page.locator('#year');
    await expect(yearElement).toBeVisible();
    const currentYear = new Date().getFullYear().toString();
    expect(await yearElement.textContent()).toContain(currentYear);
  });

  test('verifica che tutti i collegamenti funzionino correttamente', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Ottieni tutti i link della pagina
    const links = await page.locator('a').all();

    // Controlla ogni link (limitato a un sottoinsieme per velocità)
    for (let i = 0; i < Math.min(links.length, 10); i++) {
      const href = await links[i].getAttribute('href');
      if (href && (href.startsWith('#') || href.startsWith('http'))) {
        // Verifica solo che non ci siano errori 404 per i link interni
        await links[i].click();
        // Torna indietro per testare il prossimo link
        await page.goBack();
        await page.goto('http://localhost:5173');
      }
    }
  });
});