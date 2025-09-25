import { test, expect } from '@playwright/test';

test.describe('Form Tests', () => {
  test('verifica che i campi del form siano presenti e funzionanti', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Controlla la presenza del form di contatto
    const contactForm = page.locator('#contact-form');
    await expect(contactForm).toBeVisible();

    // Controlla presenza dei campi obbligatori
    const nameField = contactForm.locator('input[name="name"]');
    const emailField = contactForm.locator('input[name="email"]');
    const messageField = contactForm.locator('textarea[name="message"]');

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();

    // Controlla che il campo UTM sia presente e nascosto
    const utmField = contactForm.locator('input[name="utm"]');
    await expect(utmField).toBeHidden();

    // Verifica che il form possa essere compilato
    await nameField.fill('Mario Rossi');
    await emailField.fill('mario.rossi@example.com');
    await messageField.fill('Messaggio di test');

    // Controlla che i valori siano stati inseriti correttamente
    expect(await nameField.inputValue()).toBe('Mario Rossi');
    expect(await emailField.inputValue()).toBe('mario.rossi@example.com');
    expect(await messageField.inputValue()).toBe('Messaggio di test');
  });

  test('verifica gestione parametri UTM nel form', async ({ page }) => {
    // Visita la pagina con parametri UTM
    await page.goto('http://localhost:5173?utm_source=test&utm_medium=email&utm_campaign=launch');

    // Controlla che il campo UTM esista
    const utmField = page.locator('input[name="utm"]');
    await expect(utmField).toBeHidden();

    // Controlla che i parametri UTM siano stati serializzati correttamente
    const utmValue = await utmField.inputValue();
    expect(utmValue).toContain('utm_source');
    expect(utmValue).toContain('test');
    expect(utmValue).toContain('utm_medium');
    expect(utmValue).toContain('email');
    expect(utmValue).toContain('utm_campaign');
    expect(utmValue).toContain('launch');
  });
});