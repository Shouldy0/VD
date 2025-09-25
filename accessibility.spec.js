import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('controlla presence attributo lang, metas principali, e che tutti i <a> con target=_blank abbiano rel="noopener"', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // Controlla attributo lang sull'elemento html
    const langAttribute = await page.locator('html').getAttribute('lang');
    expect(langAttribute).toBe('it');
    
    // Controlla presenza meta description
    await expect(page.locator('meta[name="description"]')).toBeAttached();
    
    // Controlla presenza meta author
    await expect(page.locator('meta[name="author"]')).toBeAttached();
    
    // Controlla presenza Open Graph tags
    await expect(page.locator('meta[property="og:type"]')).toBeAttached();
    await expect(page.locator('meta[property="og:url"]')).toBeAttached();
    await expect(page.locator('meta[property="og:title"]')).toBeAttached();
    await expect(page.locator('meta[property="og:description"]')).toBeAttached();
    await expect(page.locator('meta[property="og:image"]')).toBeAttached();
    
    // Controlla presenza Twitter Card tags
    await expect(page.locator('meta[property="twitter:card"]')).toBeAttached();
    await expect(page.locator('meta[property="twitter:url"]')).toBeAttached();
    await expect(page.locator('meta[property="twitter:title"]')).toBeAttached();
    await expect(page.locator('meta[property="twitter:description"]')).toBeAttached();
    await expect(page.locator('meta[property="twitter:image"]')).toBeAttached();
    
    // Controlla che tutti i link con target="_blank" abbiano rel="noopener"
    const linksWithTargetBlank = await page.locator('a[target="_blank"]').all();
    
    for (const link of linksWithTargetBlank) {
      const relValue = await link.getAttribute('rel');
      expect(relValue).toContain('noopener');
    }
  });
});