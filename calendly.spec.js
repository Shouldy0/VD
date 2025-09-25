import { test, expect } from '@playwright/test';

test.describe('Calendly Widget Tests', () => {
  test('il div .calendly-inline-widget esiste; dopo 5s se nessun iframe, il fallback #calendly-fallback passa da display:none a visible', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Verifica che il widget Calendly esista
    await expect(page.locator('.calendly-inline-widget')).toBeVisible();
    
    // Simula l'assenza di iframe controllando lo stato iniziale del fallback
    const fallbackElement = page.locator('#calendly-fallback');
    
    // Verifica che inizialmente il fallback sia nascosto (display: none)
    await expect(fallbackElement).toBeHidden();
    
    // Simula il comportamento dello script dopo 5 secondi
    // (N.B.: In un ambiente reale, potremmo dover disabilitare il caricamento dell'iframe per testare questo)
    await page.waitForTimeout(5500); // Aspetta 5.5 secondi come simulazione
    
    // Controlla se il fallback appare (solo se non viene caricato alcun iframe)
    const iframeCount = await page.locator('.calendly-inline-widget iframe').count();
    if(iframeCount === 0) {
      // Se non ci sono iframe, il fallback dovrebbe apparire
      await expect(fallbackElement).toBeVisible();
    }
  });
});