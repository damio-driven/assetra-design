# ASSETRA — Project Brief for Claude Code
## Variant: LIGHT (Soft Luxury / Contemporary Elegance)

---

## Project Overview

**Client:** ASSETRA  
**Type:** Corporate presentation website — single page / multi-section  
**Business:** Rappresentanza di eccellenza per soluzioni di interior design e arredo contract (retail, hospitality, uffici, spazi professionali)  
**Primary partner:** Arken Group (https://www.arkengroup.it/it)  
**Stack:** HTML5 · CSS3 · Vanilla JavaScript · Tailwind CSS (if needed for utilities)  
**Languages:** Italian (primary) + English (toggle or dual-language structure)

---

## Brand Identity

**Logo:** Wordmark "ASSETRA." — lettering bianco/nero, punto finale rosso. Tratta il punto rosso come elemento grafico identitario: replicalo come accent in tutta l'interfaccia.

**Brand colors:**
```css
:root {
  --color-bg:         #F7F5F2;   /* off-white caldo, non bianco puro */
  --color-surface:    #FFFFFF;
  --color-text:       #1A1A18;   /* quasi-nero elegante */
  --color-text-muted: #7A776F;
  --color-accent:     #C8102E;   /* rosso ASSETRA — usarlo con parsimonia */
  --color-accent-dim: #E8D5D8;   /* rosso desaturato per sfondi sottili */
  --color-border:     #E2DED8;
  --color-gold:       #C9A96E;   /* opzionale: accento lusso secondario */
}
```

**Tone:** Raffinato, sobrio, autorevole. Mai gridato. Il rosso appare solo nei punti di massimo impatto — CTA, highlight, dettagli grafici. Il resto respira.

---

## Aesthetic Direction — LIGHT Variant

**Mood:** Luxury editorial. Come le pagine di un catalogo di arredo di alta gamma — bianco dominante, tipografia grande e ariosa, fotografie a tutto schermo.

**Typography:**
- Display / Headlines: `Cormorant Garamond` (Google Fonts) — serif classico con aste fini, trasmette eccellenza senza ostentazione
- Body / UI: `DM Sans` — moderno, leggibile, neutro
- Accent labels / eyebrows: `DM Sans` uppercase tracking-widest, size xs

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

**Layout principles:**
- Ampi spazi negativi — il respiro è parte del design
- Griglie asimmetriche: testo a sinistra, immagine che deborda a destra (o viceversa)
- Bordi sottili `1px` come separatori, non box pesanti
- Sezioni alternate: sfondo `--color-bg` / sfondo `--color-surface`
- Nessun box-shadow aggressivo — usa `border` o `outline` sottile

**Motion:**
- Reveal on scroll: `opacity 0 → 1` + `translateY(30px) → 0`, `transition: 0.8s ease`
- Stagger sugli elementi di lista/card: `animation-delay` incrementale (0.1s per elemento)
- Hover sulle card: scala leggera `scale(1.02)` + bordo rosso sottile che appare
- Nessuna animazione aggressiva — tutto fluido e rallentato

**Backgrounds & visual details:**
- Hero: immagine full-screen con overlay sottile `rgba(247,245,242,0.15)`, nessun gradient pesante
- Sezione "about": sfondo bianco con pattern geometrico SVG inline molto leggero (linee diagonali sottili in `--color-border`)
- Texture grain opzionale sull'hero: `filter: url(#noise)` SVG o CSS grain @1% opacity

---

## Site Structure & Sections

### 1. `<header>` — Navbar
- Logo ASSETRA. a sinistra (SVG inline, punto in `--color-accent`)
- Nav links centrati o a destra: `Chi siamo · Servizi · Portfolio · Partner · Contatti`
- Toggle lingua IT / EN top-right (semplice `data-lang` switch JS)
- Sticky, background `transparent → white` on scroll con transizione
- Mobile: hamburger menu, fullscreen overlay

### 2. `#hero` — Homepage Hero
- Immagine stock full-viewport di uno spazio interior design di lusso (ufficio o hospitality premium)
- Headline grande in `Cormorant Garamond`: *"L'eccellenza prende forma."*
- Sottotitolo in `DM Sans` light: breve descrizione ASSETRA (1–2 righe)
- CTA primario: pulsante outline rosso → `Scopri le soluzioni`
- Scroll indicator animato (linea verticale che si allunga)

### 3. `#about` — Chi Siamo
- Layout 50/50: testo a sinistra, immagine ritagliata asimmetrica a destra
- Titolo: *"Rappresentanza di eccellenza per spazi che ispirano"*
- Copy: genera copy professionale su ASSETRA come agente di rappresentanza per arredo contract di alto livello (retail, hospitality, uffici, spazi professionali), con focus su qualità, relazioni, personalizzazione
- Stat numbers animati (contatore JS): es. anni di esperienza, brand rappresentati, progetti completati

### 4. `#services` — Servizi / Soluzioni
- Grid 3 colonne (mobile: 1 colonna)
- Card minimal: icona SVG lineare + titolo + descrizione breve
- Settori: **Retail** · **Hospitality** · **Uffici e Contract** · **Spazi Professionali** · **Consulenza** · **Progettazione**
- Hover: bordo `--color-accent` + leggero lift

### 5. `#portfolio` — Portfolio / Progetti
- Masonry grid o layout editoriale asimmetrico con immagini stock di alta qualità
- Filter bar: `Tutti · Retail · Hospitality · Uffici`
- Click → lightbox semplice (CSS/JS vanilla, no librerie pesanti)
- Ogni card: immagine + categoria + titolo progetto

### 6. `#social-feed` — Social Feed
- Sezione placeholder elegante pronta per integrazione futura LinkedIn + Instagram
- Layout: 2 colonne (LinkedIn | Instagram), 3 card preview ciascuna
- Ogni card: wireframe stilizzato con icona social, data, testo placeholder
- Commento HTML `<!-- TODO: sostituire con embed LinkedIn/Instagram SDK -->` 
- Classe CSS `.social-embed-placeholder` per futura sostituzione

### 7. `#contact` — Contatti + Form
- Headline: *"Iniziamo a parlare."*
- Form campi: Nome · Cognome · Email · Telefono · Settore (select) · Messaggio · Privacy checkbox
- Validazione JS vanilla lato client (no librerie)
- Submit: `fetch()` verso endpoint placeholder (es. Formspree o da configurare)
- Info laterali: indirizzo, email, telefono, link social

### 8. `<footer>`
- Logo + tagline
- Link pagine + link privacy policy + cookie policy
- Copyright `© 2025 ASSETRA. Tutti i diritti riservati.`
- Social icons (LinkedIn, Instagram)

---

## GDPR / Compliance Europea

Implementa obbligatoriamente:

### Cookie Banner
- Banner in basso, design coerente con il sito
- Tre livelli: **Necessari** (sempre attivi) · **Analitici** · **Marketing/Social**
- Pulsanti: `Accetta tutti` · `Solo necessari` · `Personalizza`
- Preferenze salvate in `localStorage` key `assetra_cookie_consent`
- Il social feed (e futuri embed) si carica SOLO se l'utente ha accettato i cookie Marketing
- Classi: `.cookie-banner`, `.cookie-modal`

### Privacy & Legal Pages
- Crea pagine/sezioni: `privacy-policy.html` e `cookie-policy.html`
- Testo placeholder professionale conforme GDPR (da revisionare con legale)
- Link nel footer

### Form GDPR
- Checkbox obbligatoria: *"Ho letto e accetto la [Privacy Policy]"*
- Campo opzionale: consenso marketing
- Non inviare form senza consenso privacy

---

## SEO

- `<title>`: `ASSETRA | Arredo Contract e Interior Design di Eccellenza — Retail, Hospitality, Uffici`
- `<meta name="description">`: max 160 caratteri, keyword: arredo contract, interior design, rappresentanza mobili, retail, hospitality
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Struttura heading semantica: un solo `<h1>` per pagina, gerarchia `h2 → h3` rispettata
- `alt` text descrittivi su tutte le immagini
- `lang="it"` sul `<html>`, gestione `lang` per switch EN
- Sitemap `sitemap.xml` (anche solo statica)
- `robots.txt` base

---

## Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */
```
- Navbar: hamburger sotto `lg`
- Hero: font size fluido con `clamp()`
- Grid sezioni: 1 col mobile → 2 col tablet → 3 col desktop
- Immagini: `object-fit: cover` sempre, `loading="lazy"` su tutte eccetto hero

---

## Future-Proofing

- Struttura HTML modulare: ogni sezione è un `<section id="...">` autonomo
- CSS organizzato: custom properties globali in `:root`, nessun valore hardcoded
- JS: nessuna dipendenza globale, tutto in IIFE o moduli ES6
- Social feed: il componente è già strutturato, basta sostituire il placeholder con l'SDK reale
- Commenti `<!-- FUTURE: ... -->` nei punti di integrazione futura

---

## File Structure

```
assetra/
├── index.html
├── privacy-policy.html
├── cookie-policy.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── cookie-banner.css
│   ├── js/
│   │   ├── main.js
│   │   ├── cookie-consent.js
│   │   └── social-feed-placeholder.js
│   ├── images/
│   │   └── (placeholder references)
│   └── svg/
│       └── logo.svg
├── sitemap.xml
├── robots.txt
└── CLAUDE.md
```

---

## Image Guidelines (Stock)

### Unsplash API — Fetch automatico durante il build

Usa l'**Unsplash API** per reperire immagini contestualizzate, royalty-free e di alta qualità.

**Setup:**
access-key: ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY
secret-key: GZjDPXH6i5BSaH4fOX_J_JpnEmWClCT0s-95_yaJtF8

**Script di fetch immagini (`scripts/fetch-images.js`):**
Crea uno script Node.js da eseguire una tantum per scaricare le immagini nella cartella `assets/images/`:

```js
// scripts/fetch-images.js
// Run with: node scripts/fetch-images.js
const https = require('https');
const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const OUTPUT_DIR = path.join(__dirname, '../assets/images');

const imagesToFetch = [
  { query: 'luxury office interior design',       filename: 'hero-main.jpg',              w: 1920, h: 1080 },
  { query: 'contemporary hospitality lounge',     filename: 'hero-alt.jpg',               w: 1920, h: 1080 },
  { query: 'elegant interior design consultation',filename: 'about-main.jpg',             w: 1200, h: 800  },
  { query: 'modern retail interior design',       filename: 'portfolio-retail-01.jpg',    w: 800,  h: 600  },
  { query: 'luxury hotel lobby interior',         filename: 'portfolio-hospitality-01.jpg',w: 800, h: 600  },
  { query: 'corporate office furniture premium',  filename: 'portfolio-office-01.jpg',    w: 800,  h: 600  },
  { query: 'high end furniture showroom',         filename: 'portfolio-retail-02.jpg',    w: 800,  h: 600  },
  { query: 'boutique hotel suite interior',       filename: 'portfolio-hospitality-02.jpg',w: 800, h: 600  },
  { query: 'executive office design minimal',     filename: 'portfolio-office-02.jpg',    w: 800,  h: 600  },
  { query: 'luxury interior design detail',       filename: 'services-bg.jpg',            w: 1200, h: 700  },
];

async function fetchImage({ query, filename, w, h }) {
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${ACCESS_KEY}`;
  // fetch JSON → get urls.regular → download file
  // Implementa il download con https.get() e fs.createWriteStream()
  console.log(`Fetching: ${filename} (query: "${query}")`);
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
imagesToFetch.forEach(fetchImage);
```

**Fallback automatico (se API non disponibile):**
Se `UNSPLASH_ACCESS_KEY` non è impostata, usa URL Picsum con seed fisso per avere immagini consistenti:
```js
// Fallback URL pattern
`https://picsum.photos/seed/${filename.replace('.jpg','')}/{w}/{h}`
```

**Nel codice HTML:**
Usa sempre path locali `assets/images/nome-file.jpg` — mai URL Unsplash diretti in produzione (violano i ToS se non si traccia il download).

**Query contestualizzate per ASSETRA:**
| Sezione | Query consigliata |
|---|---|
| Hero principale | `luxury office interior design` |
| Hero alternativo | `contemporary hospitality lounge light` |
| Chi siamo | `elegant interior design studio consultation` |
| Portfolio Retail | `modern retail store interior design` |
| Portfolio Hospitality | `luxury hotel lobby boutique` |
| Portfolio Uffici | `premium corporate office furniture` |
| Servizi background | `high end furniture detail texture` |

**Attributi obbligatori su ogni `<img>`:**
```html
<img
  src="assets/images/hero-main.jpg"
  alt="Descrizione contestuale SEO-friendly"
  width="1920"
  height="1080"
  loading="lazy"   <!-- lazy su tutto tranne hero above-the-fold -->
  decoding="async"
/>
```
Usa `loading="eager"` solo sull'immagine hero principale per evitare LCP penalizzato.

---

## Copy Guidelines

Genera tutti i testi in **italiano** (con versione inglese in attributi `data-en="..."`).

**Tono:** Autorevole ma accessibile. Mai tecnico o freddo. Trasmetti cura, eccellenza, relazione.  
**Keywords SEO da includere naturalmente:** arredo contract, interior design, rappresentanza mobili, soluzioni d'arredo, retail, hospitality, uffici, spazi professionali, arredo su misura, eccellenza italiana.

**Tagline suggerite:**
- *"L'eccellenza prende forma."*
- *"Spazi che parlano di te."*
- *"Rappresentiamo il meglio, per i tuoi spazi."*
