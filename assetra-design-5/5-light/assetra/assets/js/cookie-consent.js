(function() {
  'use strict';

  const CONSENT_KEY = 'assetra_cookie_consent';
  const CONSENT_VERSION = '1.0';

  const defaultConsent = {
    necessary: true,
    analytics: false,
    marketing: false,
    version: CONSENT_VERSION,
    timestamp: null
  };

  let consent = loadConsent();

  if (!consent) {
    showBanner();
  } else {
    applyConsent(consent);
  }

  function loadConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consentData) {
    consentData.timestamp = new Date().toISOString();
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    consent = consentData;
    applyConsent(consentData);
  }

  function applyConsent(consentData) {
    if (consentData.analytics) {
      loadAnalytics();
    }

    if (consentData.marketing) {
      loadMarketing();
      loadSocialFeed();
    }
  }

  function showBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.add('visible');
    }
  }

  function hideBanner() {
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
      banner.classList.remove('visible');
    }
  }

  function showModal() {
    const overlay = document.querySelector('.cookie-modal-overlay');
    const modal = document.querySelector('.cookie-modal');
    if (overlay) overlay.classList.add('active');
    if (modal) modal.classList.add('active');
  }

  function hideModal() {
    const overlay = document.querySelector('.cookie-modal-overlay');
    const modal = document.querySelector('.cookie-modal');
    if (overlay) overlay.classList.remove('active');
    if (modal) modal.classList.remove('active');
  }

  function acceptAll() {
    const fullConsent = {
      ...defaultConsent,
      analytics: true,
      marketing: true
    };
    saveConsent(fullConsent);
    hideBanner();
    hideModal();
  }

  function acceptNecessaryOnly() {
    saveConsent({ ...defaultConsent });
    hideBanner();
    hideModal();
  }

  function saveCustomConsent(consentData) {
    saveConsent(consentData);
    hideBanner();
    hideModal();
  }

  function loadAnalytics() {
    // FUTURE: Add Google Analytics or similar
    console.log('Analytics cookies enabled');
  }

  function loadMarketing() {
    // FUTURE: Add marketing/pixel trackers
    console.log('Marketing cookies enabled');
  }

  function loadSocialFeed() {
    const socialFeed = document.querySelector('#social-feed');
    if (socialFeed) {
      const placeholder = socialFeed.querySelector('.social-embed-placeholder');
      if (placeholder) {
        placeholder.innerHTML = '<!-- TODO: sostituire con embed LinkedIn/Instagram SDK -->';
        placeholder.classList.remove('social-embed-placeholder');
        placeholder.textContent = 'Feed social caricato';
      }
    }
  }

  window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.btn-accept-all')?.addEventListener('click', acceptAll);
    document.querySelector('.btn-accept-necessary')?.addEventListener('click', acceptNecessaryOnly);
    document.querySelector('.btn-customize')?.addEventListener('click', showModal);
    document.querySelector('.cookie-modal-close')?.addEventListener('click', hideModal);
    document.querySelector('.cookie-modal-overlay')?.addEventListener('click', hideModal);

    document.querySelector('.btn-save-consent')?.addEventListener('click', function() {
      const analytics = document.querySelector('#cookie-analytics')?.checked || false;
      const marketing = document.querySelector('#cookie-marketing')?.checked || false;

      saveCustomConsent({
        ...defaultConsent,
        analytics,
        marketing
      });
    });

    document.querySelector('.btn-manage-cookies')?.addEventListener('click', function() {
      if (!consent) {
        showModal();
      } else {
        document.querySelector('#cookie-analytics').checked = consent.analytics;
        document.querySelector('#cookie-marketing').checked = consent.marketing;
        showModal();
      }
    });
  });

  window.AssetraCookieConsent = {
    showBanner,
    showModal,
    getConsent: () => consent
  };
})();