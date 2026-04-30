/**
 * ASSETRA — Cookie Consent Manager
 * GDPR Compliance
 */

const COOKIE_CONSENT_KEY = 'assetra_cookie_consent';

// ==========================================================================
// DOM Elements
// ==========================================================================
const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptAllBtn = document.getElementById('cookie-accept-all');
const cookieNecessaryOnlyBtn = document.getElementById('cookie-necessary-only');
const cookieCustomizeBtn = document.getElementById('cookie-customize');
const cookieNecessaryCheckbox = document.getElementById('cookie-necessary');
const cookieAnalyticsCheckbox = document.getElementById('cookie-analytics');
const cookieMarketingCheckbox = document.getElementById('cookie-marketing');

// ==========================================================================
// Cookie Consent State
// ==========================================================================
let consentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: null
};

// ==========================================================================
// Load Saved Consent
// ==========================================================================
function loadConsent() {
  try {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (saved) {
      consentState = JSON.parse(saved);

      // Restore checkbox states
      cookieAnalyticsCheckbox.checked = consentState.analytics;
      cookieMarketingCheckbox.checked = consentState.marketing;

      // Hide banner if already consented
      cookieBanner.classList.remove('visible');

      // Apply consent
      applyConsent();

      return true;
    }
  } catch (e) {
    console.error('Error loading cookie consent:', e);
  }
  return false;
}

// ==========================================================================
// Save Consent
// ==========================================================================
function saveConsent() {
  consentState.timestamp = new Date().toISOString();
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentState));
}

// ==========================================================================
// Apply Consent
// ==========================================================================
function applyConsent() {
  // Block/Unblock social feed based on marketing consent
  const socialFeed = document.getElementById('social-feed');
  const socialCards = socialFeed?.querySelectorAll('.social-card');

  if (!consentState.marketing) {
    // Show placeholder message
    if (socialCards) {
      socialCards.forEach(card => {
        const placeholder = card.querySelector('.social-card-text');
        if (placeholder) {
          placeholder.setAttribute('data-original', placeholder.textContent);
          placeholder.textContent = 'I social feed sono bloccati fino all\'accettazione dei cookie marketing.';
        }
      });
    }
  } else {
    // Enable social feed (placeholder - would load SDK here)
    console.log('Marketing cookies accepted - social feed enabled');
  }

  // Dispatch custom event for other scripts to listen
  window.dispatchEvent(new CustomEvent('cookieConsentApplied', { detail: consentState }));
}

// ==========================================================================
// Show Banner
// ==========================================================================
function showBanner() {
  setTimeout(() => {
    cookieBanner.classList.add('visible');
  }, 1000);
}

// ==========================================================================
// Accept All
// ==========================================================================
function acceptAll() {
  consentState.analytics = true;
  consentState.marketing = true;
  saveConsent();
  applyConsent();
  cookieBanner.classList.remove('visible');

  console.log('Cookie consent: All accepted');
}

// ==========================================================================
// Necessary Only
// ==========================================================================
function acceptNecessaryOnly() {
  consentState.analytics = false;
  consentState.marketing = false;
  saveConsent();
  applyConsent();
  cookieBanner.classList.remove('visible');

  console.log('Cookie consent: Necessary only');
}

// ==========================================================================
// Customize (Save Custom Selection)
// ==========================================================================
function saveCustom() {
  consentState.analytics = cookieAnalyticsCheckbox.checked;
  consentState.marketing = cookieMarketingCheckbox.checked;
  saveConsent();
  applyConsent();
  cookieBanner.classList.remove('visible');

  console.log('Cookie consent: Custom selection', consentState);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
cookieAcceptAllBtn.addEventListener('click', acceptAll);
cookieNecessaryOnlyBtn.addEventListener('click', acceptNecessaryOnly);
cookieCustomizeBtn.addEventListener('click', saveCustom);

// ==========================================================================
// Initialize
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const hasConsent = loadConsent();

  if (!hasConsent) {
    showBanner();
  }
});
