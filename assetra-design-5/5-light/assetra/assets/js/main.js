// Cookie consent state
const COOKIE_KEY = 'assetra_cookie_consent';

// Get DOM refs
const banner = document.getElementById('cookie-banner');
const modalOverlay = document.getElementById('cookie-modal-overlay');
const modal = document.getElementById('cookie-modal');
const btnAcceptAll = document.getElementById('cookieAcceptAll');
const btnCustomize = document.getElementById('cookieCustomize');
const btnReject = document.getElementById('cookieReject');
const btnSave = document.getElementById('cookieSave');
const chkAnalytics = document.getElementById('cookieAnalytics');
const chkMarketing = document.getElementById('cookieMarketing');
const chkLinkedIn = document.getElementById('cookieLinkedIn');
const chkInstagram = document.getElementById('cookieInstagram');
const marketingOptions = document.getElementById('cookieMarketingOptions');
const necessaryChk = document.getElementById('cookieNecessary');

function getConsent() {
  try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch { return null; }
}

function saveConsent(consent) {
  try { localStorage.setItem(COOKIE_KEY, JSON.stringify(consent)); } catch {}
}

function buildConsentObject() {
  return {
    necessary: true,
    analytics: chkAnalytics.checked,
    marketing: chkMarketing.checked,
    social: {
      linkedin: chkLinkedIn.checked,
      instagram: chkInstagram.checked,
    },
    timestamp: Date.now(),
  };
}

function applyConsent(consent) {
  saveConsent(consent);
  document.documentElement.dataset.cookieConsent = JSON.stringify(consent);
  if (consent.marketing && consent.social?.linkedin) {
    loadScript('assets/js/social-feed-placeholder.js', 'linkedin');
  }
  if (consent.marketing && consent.social?.instagram) {
    loadScript('assets/js/social-feed-placeholder.js', 'instagram');
  }
  banner.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

function loadScript(src, id) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.src = src;
  s.id = id;
  s.async = true;
  document.body.appendChild(s);
}

function initState() {
  const consent = getConsent();
  if (!consent) {
    showBanner();
    return;
  }
  chkAnalytics.checked = !!consent.analytics;
  chkMarketing.checked = !!consent.marketing;
  chkLinkedIn.checked = !!consent.social?.linkedin;
  chkInstagram.checked = !!consent.social?.instagram;
  // Update sub-options visibility
  marketingOptions.style.display = chkMarketing.checked ? 'flex' : 'none';
  // If user previously accepted all
  if (consent.necessary) applyConsent(consent);
}

function showBanner() {
  banner.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
}

function hideBannerAndModal() {
  banner.classList.add('hidden');
  modalOverlay.classList.add('hidden');
}

// Events
necessaryChk.addEventListener('change', () => {
  marketingOptions.style.display = chkMarketing.checked ? 'flex' : 'none';
});

chkMarketing.addEventListener('change', () => {
  marketingOptions.style.display = chkMarketing.checked ? 'flex' : 'none';
  if (!chkMarketing.checked) {
    chkLinkedIn.checked = false;
    chkInstagram.checked = false;
  }
});

btnAcceptAll.addEventListener('click', () => {
  applyConsent({ necessary: true, analytics: true, marketing: true, social: { linkedin: true, instagram: true } });
});

btnCustomize.addEventListener('click', () => {
  modalOverlay.classList.remove('hidden');
});

btnReject.addEventListener('click', () => {
  applyConsent({ necessary: true, analytics: false, marketing: false, social: { linkedin: false, instagram: false } });
});

btnSave.addEventListener('click', () => {
  applyConsent(buildConsentObject());
});

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.add('hidden');
});

// Keyboard support
modalOverlay.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalOverlay.classList.add('hidden');
});

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initState);
} else {
  initState();
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const curr = window.scrollY;
  const header = document.getElementById('site-header');
  if (curr > lastScroll && curr > 100) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  lastScroll = curr;
});

// Intersection Observer for animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// Simple form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    if (!data.privacy || !data.privacy.includes('on')) {
      alert('Per favore, accetta la Privacy Policy per inviare il modulo.');
      return;
    }
    // Placeholder: show success
    alert('Richiesta inviata! Ti risponderemo al più presto.');
    form.reset();
  });
}

// Set lang attribute for EN switch (placeholder)
const langBtn = document.getElementById('langBtn');
let isEn = false;
langBtn.addEventListener('click', () => {
  isEn = !isEn;
  langBtn.textContent = isEn ? 'IT' : 'EN';
  document.documentElement.lang = isEn ? 'en' : 'it';
  // Note: Full translation would require separate content or translation map
});