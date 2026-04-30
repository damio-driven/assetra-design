/**
 * ASSETRA — Cookie Consent
 * GDPR compliant, three-tier consent
 */

const STORAGE_KEY = 'assetra_cookie_consent';

const banner        = document.getElementById('cookie-banner');
const customizePanel = document.getElementById('cookie-customize-panel');
const btnAcceptAll  = document.getElementById('cookie-accept-all');
const btnNecessary  = document.getElementById('cookie-necessary');
const btnCustomize  = document.getElementById('cookie-customize');
const btnSave       = document.getElementById('cookie-save');
const analyticsCheck = document.getElementById('cookie-analytics');
const marketingCheck = document.getElementById('cookie-marketing');

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveConsent(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...prefs,
    timestamp: new Date().toISOString(),
  }));
}

function hideBanner() {
  banner?.classList.remove('visible');
  setTimeout(() => banner?.setAttribute('hidden', ''), 500);
}

function showBanner() {
  banner?.removeAttribute('hidden');
  setTimeout(() => banner?.classList.add('visible'), 50);
}

function applyConsent(prefs) {
  // Dispatch event so other modules can react
  window.dispatchEvent(new CustomEvent('assetra:consent', { detail: prefs }));
}

// Init
const existing = getConsent();

if (!existing) {
  showBanner();
} else {
  applyConsent(existing);
}

// Accept all
btnAcceptAll?.addEventListener('click', () => {
  const prefs = { necessary: true, analytics: true, marketing: true };
  saveConsent(prefs);
  applyConsent(prefs);
  hideBanner();
});

// Necessary only
btnNecessary?.addEventListener('click', () => {
  const prefs = { necessary: true, analytics: false, marketing: false };
  saveConsent(prefs);
  applyConsent(prefs);
  hideBanner();
});

// Show customize panel
btnCustomize?.addEventListener('click', () => {
  const isHidden = customizePanel?.hidden;
  if (isHidden) {
    customizePanel?.removeAttribute('hidden');
    btnCustomize.textContent = '✕';
  } else {
    customizePanel?.setAttribute('hidden', '');
    btnCustomize.textContent = document.documentElement.lang === 'en' ? 'Customize' : 'Personalizza';
  }
});

// Save custom preferences
btnSave?.addEventListener('click', () => {
  const prefs = {
    necessary: true,
    analytics: analyticsCheck?.checked ?? false,
    marketing: marketingCheck?.checked ?? false,
  };
  saveConsent(prefs);
  applyConsent(prefs);
  hideBanner();
});

// Restore checkboxes from saved state if user reopens banner
if (existing) {
  if (analyticsCheck) analyticsCheck.checked = existing.analytics ?? false;
  if (marketingCheck) marketingCheck.checked = existing.marketing ?? false;
}
