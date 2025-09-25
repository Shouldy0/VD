import { test, expect } from '@playwright/test';

test.describe('Form Compilation Test', () => {
  test('riempie nome, email, messaggio; verifica valorizzazione hidden #utm quando si naviga con query ?utm_source=instagram&utm_campaign=test', async ({ page }) => {
    // Naviga con parametri UTM
    await page.goto('http://localhost:5173?utm_source=instagram&utm_campaign=test');
    
    // Riempi i campi del form
    await page.locator('input[name="nome"]').fill('Test Name');
    await page.locator('input[name="email"]').fill('test@example.com');
    await page.locator('textarea[name="messaggio"]').fill('Test message');
    
    // Ottieni il valore del campo hidden utm
    const utmValue = await page.locator('#utm').inputValue();
    
    // Verifica che il campo UTM contenga i valori corretti
    const utmObject = JSON.parse(utmValue);
    expect(utmObject.utm_source).toBe('instagram');
    expect(utmObject.utm_campaign).toBe('test');
  });
});