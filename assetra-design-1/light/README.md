# ASSETRA - LIGHT Variant

Eccellenza nella rappresentanza per arredamento contract e interior design.

---

## 📝 Descrizione

Il sito web **ASSETRA** è stato creato per fornire una piattaforma professionale e raffinata per l'arredamento contract e il design d'interni. Il template è stato creato da zero con HTML5, CSS3 e JavaScript vanilla, senza framework.

### 🎨 Light Variant Features

| Caratteristica | Descrizione |
|---------------|-------------|
| **Design** | Minimal, pulito, elegante |
| **Colori** | Crema (#F7F5F2), Accento Rosso (#C8102E), Oro (#C9A96E) |
| **Font** | Cormorant Garamond (titoli), DM Sans (corpo) |
| **Responsive** | Mobile-first, ottimizzato per tutti i dispositivi |
| **Accessibilità** | Semantica, contrasti WCAG AA |

---

## 📁 Struttura del Progetto

```
light/
├── index.html              # Homepage
├── privacy-policy.html     # Informativa Privacy
├── cookie-policy.html      # Policy Cookie
├── assets/
│   ├── css/
│   │   └── main.css        # Stili principali
│   └── js/
│       ├── main.js         # JavaScript principale
│       ├── cookie-consent.js   # Gestione consenso cookie
│       └── social-feed-placeholder.js  # Social feeds
└── README.md               # Questo file
```

---

## 🚀 Funzionalità

### Core

- ✅ Header sticky con scroll effect
- ✅ Menu mobile responsive
- ✅ Hero section con titolo e CTA
- ✅ Sezione "Chi siamo" con stats animati
- ✅ Griglia servizi con hover effects
- ✅ Portfolio con filtri categoriali
- ✅ Placeholder social feed (LinkedIn/Instagram)
- ✅ Form contatti con validazione
- ✅ Footer informativo
- ✅ Cookie consent banner con controlli granulari

### Accessibilità

- ✅ Semantica HTML5
- ✅ Focus indicators
- ✅ Aria labels per screen reader
- ✅ Contrasti colore WCAG AA
- ✅ Skip link per navigazione

### Performance

- ✅ Lazy loading images
- ✅ CSS critico inlined (nel file CSS)
- ✅ JavaScript modulare
- ✅ Intersection Observer per animations

### SEO

- ✅ Meta tag ottimizzati
- ✅ Semantic HTML
- ✅ Schema.org markup (facoltativo)

---

## 🛠️ Sviluppo

### Requisiti

- Browser moderni (Chrome, Firefox, Safari, Edge)
- JavaScript ECMAScript 2018+
- CSS Grid/Flexbox supportati

### Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |

---

## 📄 Policy GDPR

- [Informativa Privacy](privacy-policy.html)
- [Cookie Policy](cookie-policy.html)

Il sito rispetta pienamente il GDPR europeo e le normative sulla protezione dei dati.

---

## 📄 Licenza

Copyright © 2025 ASSETRA. Tutti i diritti riservati.

---

## 📞 Contatti

**Email:** info@assetra.it  
**Indirizzo:** Via Roma 123, 00100 Roma, Italia  
**Social:** [LinkedIn](#) | [Instagram](#)

---

## 📄 Credits

**Font:**
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) - Google Fonts
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) - Google Fonts

**Icone SVG:**
- SVG inline disegnati a mano

**Immagini:**
- Placeholder: [Unsplash](https://unsplash.com) (licenza free)
- Social: [placeholder images](https://placehold.co) (licenza free)

**Cookie:**
- [CookieConsent Banner Template](#)

---

## 🔧 Placeholder per Integrazione Futura

### Social Feeds

**LinkedIn Feed:**
```javascript
// Sostituire social-feed-placeholder.js con:
// LinkedIn Insight Tag
// LinkedIn Company Page tracking
```

**Instagram Feed:**
```javascript
// Sostituire con:
// Instagram Basic Display API
// Instagram Business SDK
```

### Analytics (Opzionale)

```javascript
// Google Analytics 4 (da aggiungere in assets/js/analytics.js)
// Matomo (privacy-first alternative)
// o altre soluzioni no-cookie
```

---

## 📄 Note di Sviluppo

- **CSS:** Tutte le variabili CSS sono in :root per facile personalizzazione
- **JS:** Il codice è modulare e non usa jQuery - puro vanilla JS
- **Immagini:** Placeholder sono ottimizzati per performance
- **Form:** Validazione lato client + stub per backend (PHP/Node.js)

---

## 📄 File Chiave

### index.html

- Header con logo e navigation
- Hero section con titolo e CTA
- About section con stats
- Services grid
- Portfolio grid con filtri
- Social feed placeholder
- Contact form
- Footer

### assets/css/main.css

- CSS Reset e base
- Typography system
- Header e navigation
- Hero section
- About e Services
- Portfolio
- Contact form
- Footer
- Responsive breakpoints
- Animations

### assets/js/main.js

- Header scroll effect
- Mobile menu toggle
- Stats animation
- Portfolio filter
- Form validation
- Scroll reveal animations
- Lazy loading images

### assets/js/cookie-consent.js

- Cookie banner show/hide
- Consent persistence (localStorage)
- Analytics/marketing load control
- Checkbox state management

### assets/js/social-feed-placeholder.js

- LinkedIn placeholder cards
- Instagram placeholder cards
- SDK integration stubs
- Auth handlers (future)

---

## 📄 Personalizzazione

### Cambiare i Colori

Modificare le variabili CSS in `:root` all'inizio di `main.css`:

```css
:root {
  --color-bg:         #F7F5F2;  /* Background principale */
  --color-accent:     #C8102E;  /* Colore accento (rosso) */
  --color-gold:       #C9A96E;  /* Colore oro */
}
```

### Cambiare i Font

Modificare le font-family in `:root`:

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, sans-serif;
}
```

### Modificare i Testi

Cercare i dati-attributes per testi multilingua:

```html
<p data-lang-it="Testo italiano" 
     data-lang-en="English text">
</p>
```

---

## 📄 Supporto

Per supporto o domande, contattare:
- **Email:** info@assetra.it
- **Website:** https://www.assetra.it

---

**Created with ❤️ by ASSETRA Design Team**  
**© 2025 All Rights Reserved**
