# ASSETRA — Project Brief for Claude Code
## Variant: DARK (Roman Imperial / Bold Luxury)

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

**Logo:** Wordmark "ASSETRA." — lettering bianco su sfondo scuro, punto finale rosso. Il punto rosso è l'unico colore caldo in un mondo di pietra e inchiostro — trattalo come un sigillo imperiale.

**Brand colors:**
```css
:root {
  --color-bg:          #0D0D0B;  /* nero quasi assoluto, leggermente caldo */
  --color-surface:     #141412;  /* superficie card/sezioni */
  --color-surface-alt: #1C1C19;  /* alternanza sezioni */
  --color-text:        #F0EDE6;  /* bianco avorio — mai bianco puro */
  --color-text-muted:  #8A8880;
  --color-accent:      #C8102E;  /* rosso ASSETRA — il sigillo */
  --color-accent-glow: rgba(200,16,46,0.15); /* alone rosso per effetti */
  --color-gold:        #B8965A;  /* oro romano — per dettagli epigrafici */
  --color-border:      #2A2A26;
  --color-border-gold: rgba(184,150,90,0.3);
}
```

**Tone:** Imperiale, monumentale, senza compromessi. Come un palazzo romano rivestito di marmo e metallo. La forza viene dalla geometria e dalla tipografia, non dagli effetti. Il rosso è potere.

---

## Aesthetic Direction — DARK Variant

**Mood:** Roman Imperial meets contemporary luxury. Epigrafia, geometrie lapidee, contrasti estremi. Pensa a un museo di design a Roma: architettura antica, oggetti modernissimi.

**Typography:**
- Display / Headlines: `Trajan Pro` (se disponibile via @font-face) oppure `IM Fell English` o **`Cinzel`** (Google Fonts) — maiuscoletto romano con grazie lapidee, evoca iscrizioni su pietra
- Secondary display: `Cormorant Garamond` in italic per citazioni e sottotitoli
- Body / UI: `Raleway` weight 300/400 — moderno, geometrico, leggibile su scuro
- Accent labels: `Cinzel` uppercase, tracking molto largo, dimensione xs — come un'epigrafe

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;900&family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Raleway:wght@300;400;500&display=swap" rel="stylesheet">
```

**Layout principles:**
- Sfondo quasi-nero dominante con sezioni che emergono per variazione di tono, non di colore
- Linee orizzontali in `--color-gold` (1px) come separatori epigrafici
- Titoli in `Cinzel` tutto maiuscolo, spaziatura lettere `0.15em`
- Elementi geometrici decorativi SVG: linee, rombi, croci lapidee — in oro, sottili
- Asimmetria controllata: griglie che rompono l'allineamento ma mantengono ordine
- Un singolo elemento per sezione può essere evidenziato con `--color-accent` (rosso)

**Motion:**
- Reveal on scroll: `opacity 0 → 1` + `translateY(40px) → 0`, timing più lento `1s ease`
- Headlines: effetto "incisione" — le lettere appaiono carattere per carattere con JS (typewriter lapideo)
- Linee decorative: si "disegnano" all'entrata in viewport (CSS `stroke-dashoffset` animation)
- Hover su card: bordo oro che appare + overlay scuro si solleva leggermente
- Cursore custom opzionale: piccolo rombo/croce in CSS

**Backgrounds & visual details:**
- Hero: immagine full-screen con overlay scuro `rgba(13,13,11,0.65)` — spazio di lusso quasi irriconoscibile, evocativo
- Texture: grain CSS (`background-image: url("data:image/svg+xml...")`) @2% opacity su tutti gli sfondi
- Decorazioni SVG inline: motivi geometrici angolari ispirati a pavimenti romani, bordi a meandro
- Sezione about: divisore SVG con motivo a onde romane o meandro greco-romano
- Linee verticali sottili in `--color-gold` come colonne decorative laterali

---

## Site Structure & Sections

### 1. `<header>` — Navbar
- Logo ASSETRA. a sinistra (SVG inline, punto in `--color-accent`)
- Nav links in `Cinzel` uppercase tracking-wide: `CHI SIAMO · SERVIZI · PORTFOLIO · PARTNER · CONTATTI`
- Toggle lingua IT / EN top-right
- Sticky, background da `transparent` a `--color-bg` con blur backdrop
- Mobile: hamburger → menu fullscreen overlay scuro con nav centrata e grande

### 2. `#hero` — Homepage Hero
- Immagine full-viewport di spazio premium in B&W o toni scuri (hotel di lusso, ufficio direzionale)
- Overlay layering: base scura + grain + vignette ai bordi
- Eyebrow label in `Cinzel` gold: `RAPPRESENTANZA DI ECCELLENZA`
- Headline monumentale: *"L'ECCELLENZA PRENDE FORMA."* — `Cinzel` 900, molto grande, con punto finale in `--color-accent`
- Sottotitolo in `Cormorant Garamond` italic: breve descrizione evocativa
- CTA: pulsante outline `--color-accent` con hover fill; secondo link ghost in oro
- Decorazione: linea verticale gold animata a sinistra dell'headline

### 3. `#about` — Chi Siamo
- Layout: testo occupa 60% con un blocco di citazione in `Cormorant Garamond` italic grande a sinistra
- Immagine: ritagliata con clip-path angolato (non rettangolo standard)
- Titolo: `CHI SIAMO` in Cinzel gold sopra, headline grande sotto
- Divisore superiore: SVG meandro romano in `--color-gold`
- Stat numbers: contatore animato in Cinzel, unità in Raleway muted

### 4. `#services` — Servizi / Soluzioni
- Grid 3 colonne, card con bordo `--color-border-gold`
- Card: numero romano (I, II, III...) in Cinzel gold grande + titolo + descrizione
- Hover: bordo diventa `--color-gold` pieno + angolo in `--color-accent`
- Settori: Retail · Hospitality · Uffici e Contract · Spazi Professionali · Consulenza · Progettazione

### 5. `#portfolio` — Portfolio / Progetti
- Layout a griglia con proporzioni variabili (alcune card 2x1, alcune 1x1)
- Immagini in toni scuri/neutri — overlay gold al hover
- Filter bar in Cinzel uppercase
- Lightbox: overlay scuro totale, immagine centrata, navigazione con frecce stilizzate

### 6. `#social-feed` — Social Feed
- Placeholder card con bordo gold + icona social
- Layout: 2 colonne (LinkedIn | Instagram), sfondo `--color-surface-alt`
- Commento HTML `<!-- TODO: sostituire con embed LinkedIn/Instagram SDK -->`

### 7. `#contact` — Contatti + Form
- Headline monumentale: *"INIZIAMO A PARLARE."*
- Form su sfondo `--color-surface` con bordi gold su focus
- Campi: Nome · Cognome · Email · Telefono · Settore (select) · Messaggio · Privacy
- Input styling: bordo inferiore only (stile lapideo, no box), label flottante
- CTA submit: button rosso pieno `--color-accent`

### 8. `<footer>`
- Sfondo ancora più scuro `#080806`
- Logo + tagline in Cinzel
- Separatori gold
- Link footer + privacy + cookie
- Copyright con punto finale rosso: `© 2025 ASSETRA`

---

## GDPR / Compliance Europea

Implementa obbligatoriamente:

### Cookie Banner
- Banner in basso, design coerente con il tema dark: sfondo `--color-surface`, bordo gold superiore
- Tre livelli: **Necessari** (sempre attivi) · **Analitici** · **Marketing/Social**
- Pulsanti: `Accetta tutti` (rosso) · `Solo necessari` (outline) · `Personalizza` (ghost)
- Preferenze salvate in `localStorage` key `assetra_cookie_consent`
- Il social feed si carica SOLO se accettati cookie Marketing

### Privacy & Legal Pages
- `privacy-policy.html` e `cookie-policy.html`
- Stesso tema dark del sito principale
- Testo placeholder professionale conforme GDPR

### Form GDPR
- Checkbox obbligatoria: *"Ho letto e accetto la [Privacy Policy]"*
- Campo opzionale: consenso marketing
- Blocco submit senza consenso privacy

---

## SEO

- `<title>`: `ASSETRA | Arredo Contract e Interior Design di Eccellenza — Retail, Hospitality, Uffici`
- `<meta name="description">`: max 160 caratteri, keyword: arredo contract, interior design, rappresentanza mobili
- Open Graph tags completi
- Struttura heading semantica rigorosa
- `alt` text su tutte le immagini
- `lang="it"` sull'`<html>`
- `sitemap.xml` e `robots.txt`

---

## Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1536px */
```
- Navbar mobile: hamburger → fullscreen overlay
- Font fluidi con `clamp()` — i titoli Cinzel scalano drammaticamente
- Grid: 1 col mobile → 2 tablet → 3 desktop
- Decorazioni SVG: nascoste o semplificate su mobile

---

## Future-Proofing

- Struttura modulare per sezione
- CSS custom properties globali in `:root`
- JS in moduli ES6, nessuna dipendenza CDN esterna
- Social feed strutturato per sostituzione con SDK reale
- Commenti `<!-- FUTURE: ... -->` nei punti di integrazione

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
│       ├── logo.svg
│       └── decorations.svg
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
  { query: 'dark luxury interior architecture dramatic',    filename: 'hero-main.jpg',               w: 1920, h: 1080 },
  { query: 'dramatic hospitality lounge dark moody',       filename: 'hero-alt.jpg',                w: 1920, h: 1080 },
  { query: 'premium furniture showroom dark elegant',      filename: 'about-main.jpg',              w: 1200, h: 800  },
  { query: 'dark moody retail store interior luxury',      filename: 'portfolio-retail-01.jpg',     w: 800,  h: 600  },
  { query: 'upscale hotel lobby dark atmosphere',          filename: 'portfolio-hospitality-01.jpg',w: 800,  h: 600  },
  { query: 'executive office dark minimal premium',        filename: 'portfolio-office-01.jpg',     w: 800,  h: 600  },
  { query: 'luxury boutique retail interior night',        filename: 'portfolio-retail-02.jpg',     w: 800,  h: 600  },
  { query: 'five star hotel suite dramatic lighting',      filename: 'portfolio-hospitality-02.jpg',w: 800,  h: 600  },
  { query: 'corporate office design dark sophisticated',   filename: 'portfolio-office-02.jpg',     w: 800,  h: 600  },
  { query: 'interior design detail texture dark gold',     filename: 'services-bg.jpg',             w: 1200, h: 700  },
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
Se `UNSPLASH_ACCESS_KEY` non è impostata, usa URL Picsum con seed fisso:
```js
`https://picsum.photos/seed/${filename.replace('.jpg','')}/{w}/{h}`
```

**Nel codice HTML:**
Usa sempre path locali `assets/images/nome-file.jpg` — mai URL Unsplash diretti in produzione.

**Query contestualizzate per la variante DARK:**
| Sezione | Query consigliata |
|---|---|
| Hero principale | `dark luxury interior architecture dramatic` |
| Hero alternativo | `dramatic hospitality lounge moody night` |
| Chi siamo | `premium furniture showroom dark elegant` |
| Portfolio Retail | `luxury retail store interior dark moody` |
| Portfolio Hospitality | `upscale hotel lobby dramatic atmosphere` |
| Portfolio Uffici | `executive office dark minimal sophisticated` |
| Servizi background | `interior design detail texture dark gold` |

**Post-processing CSS obbligatorio sulla variante DARK:**
Applica su tutte le immagini per coerenza con il tema:
```css
.hero-img      { filter: brightness(0.65) contrast(1.1); }
.portfolio-img { filter: brightness(0.75) contrast(1.05) saturate(0.8); }
.about-img     { filter: brightness(0.7) contrast(1.1); }
```

**Attributi obbligatori su ogni `<img>`:**
```html
<img
  src="assets/images/hero-main.jpg"
  alt="Descrizione contestuale SEO-friendly"
  width="1920"
  height="1080"
  loading="eager"   <!-- eager solo su hero, lazy su tutto il resto -->
  decoding="async"
/>
```

---

## Copy Guidelines

Genera tutti i testi in **italiano** (con versione inglese in attributi `data-en="..."`).

**Tono:** Imperiale, visionario, senza concessioni alla mediocrità. Ogni parola deve pesare come pietra.  
**Keywords SEO:** arredo contract, interior design, rappresentanza mobili, soluzioni d'arredo, retail, hospitality, uffici, eccellenza italiana.

**Tagline suggerite:**
- *"L'ECCELLENZA PRENDE FORMA."*
- *"SPAZI CHE DURANO NEL TEMPO."*
- *"IL MEGLIO. SENZA COMPROMESSI."*
