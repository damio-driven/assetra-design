# ASSETRA Website Development Guide

## Brand & Design
- **Client**: Assestra represents Arken Group in interior design and contract furniture solutions for retail, hospitality, offices, and professional spaces.
- **Logo**: Simple "ASSETRA." text in white with a red period at the end.
- **Colors**: White, black, and red (use brand palette from existing assets).
- **Design Approach**: Two distinct themes - soft/light and dark/aggressive.
- **Typography**: Dark mode uses Roman-style antique font for headlines.
- **References**: Arken Group site (https://www.arkengroup.it/it), competitors: Tetris-DB, Coiver Group, Alteri Contract, Stefano Silvestrini, Casi Italia (design inspiration only).

## Technology Stack
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **Framework/UI**: Tailwind CSS recommended for responsive design system.
- **Image Source**: Unsplash stock images (access-key: ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY).
- **SEO**: Implement semantic HTML, meta tags, schema.org markup, Open Graph.

## Site Sections
- Hero/Homepage
- Chi siamo / About
- Servizi / Soluzioni
- Portfolio / Progetti realizzati
- Contatti + Form
- Social Feed (LinkedIn/Instagram) - future integration

## Requirements & Compliance
- **Responsive**: Mobile-first design, breakpoints for tablet/desktop.
- **GDPR/Cookie**: Implement consent banner, cookie preferences, privacy policy link, data processing disclaimer.
- **Accessibility**: WCAG 2.1 AA compliance (ARIA labels, contrast ratios, keyboard navigation).
- **Performance**: Optimize images, lazy loading, critical CSS inline.

## Content
- **Languages**: Italian (primary) + English.
- **Copy**: Generate original content from scratch (no existing copy available).

## Features
- Contact form with validation (name, email, subject, message).
- Social media feed integration (LinkedIn post feed + Instagram gallery) as plugins.
- Portfolio section for showcasing completed projects.

## Dev Workflow Tips
- Use semantic HTML5 (`<header>`, `<main>`, `<article>`, `<footer>`).
- Tailwind arbitrary values or config for custom red color (match brand red).
- Dark theme uses Roman-inspired serif font for headings; light theme uses modern sans-serif.
- Social feed widgets: use LinkedIn API post embed + Instagram Basic API (OAuth, cache responses).
- Privacy: add `<script>function gdprPreference()` handler for cookie banner.
