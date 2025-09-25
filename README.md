# VD Agency Site

Sito web per la digital creative studio VD Agency.

## Installazione

```bash
npm i
```

## Esecuzione

```bash
npm run start
```

Il sito sarà disponibile all'indirizzo http://localhost:5173

## Test

Per eseguire i test di Playwright:

```bash
npm run test
```

Prima di eseguire i test per la prima volta, è necessario installare le dipendenze di Playwright:

```bash
npx playwright install
```

Per eseguire i test in modalità UI (visualizzando il browser):

```bash
npm run test:ui
```

### Installazione Browser

Playwright richiede l'installazione dei browser per il testing. Esegui questo comando per installare tutti i browser supportati:

```bash
npx playwright install --with-deps
```

Questo installerà tutti i browser necessari (Chromium, Firefox, WebKit) e le loro dipendenze.

## Deployment

Il sito può essere facilmente deployato su servizi come Netlify, Vercel o GitHub Pages tramite drag&drop della cartella principale.

### Self-hosting con Coolify

Puoi anche self-hostare il sito usando Coolify, una piattaforma di self-hosting open source:

1. Installa Coolify sul tuo server:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
   ```

2. Accedi all'interfaccia web di Coolify (di solito all'indirizzo https://TUO-IP:3000)

3. Crea una nuova applicazione e seleziona "Static Site"

4. Configura l'applicazione:
   - Repository: il tuo repository Git oppure carica i file direttamente
   - Build directory: `./` (radice del progetto)
   - Build command: `npm install` (opzionale per un sito statico)
   - Publish directory: `./` (o dove si trovano i file HTML)

5. Deploy dell'applicazione

Coolify gestirà automaticamente il processo di build e deployment del tuo sito statico.

## Sicurezza (CSP)

Se il dominio di hosting impone una Content Security Policy (CSP), assicurarsi di consentire i seguenti domini per il corretto funzionamento del sito:

- https://assets.calendly.com
- https://calendly.com

## Struttura del Progetto

```
vd-agency-site/
├─ index.html
├─ /assets/
│  ├─ logo.svg
│  ├─ og.jpg
│  └─ favicon.svg
├─ /css/
│  └─ styles.css
├─ /js/
│  └─ main.js
├─ /tests/
│  ├─ page-load.spec.js
│  ├─ sections.spec.js
│  ├─ calendly.spec.js
│  ├─ form.spec.js
│  └─ accessibility.spec.js
├─ package.json
├─ playwright.config.js
└─ README.md
```