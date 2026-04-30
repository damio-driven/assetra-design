# ASSETRA — Corporate Website

**Variant:** DARK (Roman Imperial / Bold Luxury)

Sito web corporate per ASSETRA — rappresentanza di eccellenza per soluzioni di interior design e arredo contract.

---

## Struttura del Progetto

```
3-dark/
├── index.html                 # Homepage principale
├── privacy-policy.html        # Pagina Privacy Policy
├── cookie-policy.html         # Pagina Cookie Policy
├── sitemap.xml                # Sitemap per SEO
├── robots.txt                 # Istruzioni per crawler
├── CLAUDE.md                  # Brief di progetto
├── README.md                  # Questo file
├── assets/
│   ├── css/
│   │   ├── main.css           # Stili principali
│   │   └── cookie-banner.css  # Stili cookie banner
│   ├── js/
│   │   ├── main.js            # JavaScript principale
│   │   ├── cookie-consent.js  # Gestione cookie GDPR
│   │   └── social-feed-placeholder.js  # Placeholder social
│   ├── images/                # Immagini (da scaricare)
│   └── svg/
│       ├── logo.svg           # Logo ASSETRA
│       └── decorations.svg    # Elementi decorativi
└── scripts/
    └── fetch-images.js        # Script per scaricare immagini
```

---

## Setup Rapido

### 1. Scaricare le immagini

Eseguire lo script Node.js per scaricare le immagini da Unsplash:

```bash
# Opzionale: impostare la propria API key
export UNSPLASH_ACCESS_KEY="your-access-key"

# Eseguire lo script
node scripts/fetch-images.js
```

Le immagini verranno scaricate nella cartella `assets/images/`.

### 2. Aprire il sito

Aprire `index.html` in un browser moderno.

Per una migliore esperienza, usare un server locale:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Poi navigare su `http://localhost:8000`.

---

## Personalizzazione

### Colori Brand

I colori sono definiti in `assets/css/main.css`:

```css
:root {
  --color-bg: #0D0D0B;        /* Nero quasi assoluto */
  --color-surface: #141412;   /* Superficie card */
  --color-text: #F0EDE6;      /* Bianco avorio */
  --color-accent: #C8102E;    /* Rosso ASSETRA */
  --color-gold: #B8965A;      /* Oro romano */
}
```

### Contatti

Aggiornare i dati di contatto in:
- `index.html` (footer)
- `privacy-policy.html`
- `cookie-policy.html`

Cercare e sostituire:
- Indirizzo fisico
- Email (`info@assetra.it`)
- Telefono (`+39 02 1234567`)
- P.IVA / C.F.

---

## GDPR Compliance

Il sito include:

- **Cookie Banner** con tre livelli di consenso (Necessari, Analitici, Marketing)
- **Privacy Policy** conforme al Regolamento UE 2016/679
- **Cookie Policy** dettagliata con tabella dei cookie
- **Form di contatto** con checkbox privacy obbligatoria

### Personalizzare il consenso cookie

Le preferenze sono salvate in `localStorage` con la chiave `assetra_cookie_consent`.

Per resettare il consenso durante lo sviluppo:

```javascript
localStorage.removeItem('assetra_cookie_consent');
location.reload();
```

---

## Browser Support

- Chrome (ultime 2 versioni)
- Firefox (ultime 2 versioni)
- Safari (ultime 2 versioni)
- Edge (ultime 2 versioni)

---

## License

© 2025 ASSETRA. Tutti i diritti riservati.
