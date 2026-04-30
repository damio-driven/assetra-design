/* ============================================================
   ASSETRA — Cookie Consent (GDPR)
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'assetra_cookie_consent';
  const BANNER_DELAY = 1200; // ms

  let consent = null;

  function loadConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function saveConsent(prefs) {
    consent = { ...prefs, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (_) {}
    applyConsent();
    hideBanner();
    closeModal();
  }

  function applyConsent() {
    if (!consent) return;
    const allowed = consent.marketing;
    document.querySelectorAll('[data-social-blocked]').forEach(el => {
      el.dataset.socialBlocked = allowed ? 'false' : 'true';
    });
    document.dispatchEvent(new CustomEvent('assetra:consent', { detail: consent }));
  }

  // ── Banner ──
  const banner = document.getElementById('cookieBanner');

  function showBanner() {
    if (!banner) return;
    setTimeout(() => banner.classList.add('visible'), BANNER_DELAY);
  }

  function hideBanner() {
    banner && banner.classList.remove('visible');
  }

  // ── Modal ──
  const modal = document.getElementById('cookieModal');

  function openModal() {
    modal && modal.classList.add('open');
    modal && modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal && modal.classList.remove('open');
    modal && modal.setAttribute('aria-hidden', 'true');
  }

  function getModalPrefs() {
    return {
      necessary: true,
      analytics: modal ? modal.querySelector('#toggle-analytics').checked : false,
      marketing: modal ? modal.querySelector('#toggle-marketing').checked : false,
    };
  }

  function setModalToggles(prefs) {
    if (!modal) return;
    const analytics = modal.querySelector('#toggle-analytics');
    const marketing = modal.querySelector('#toggle-marketing');
    if (analytics) analytics.checked = prefs.analytics || false;
    if (marketing) marketing.checked = prefs.marketing || false;
  }

  // ── Wire up buttons ──
  function init() {
    consent = loadConsent();

    if (consent) {
      applyConsent();
      return;
    }

    showBanner();

    // Banner buttons
    const btnAccept    = document.getElementById('cookieBtnAccept');
    const btnNecessary = document.getElementById('cookieBtnNecessary');
    const btnCustomize = document.getElementById('cookieBtnCustomize');

    btnAccept    && btnAccept.addEventListener('click', () =>
      saveConsent({ necessary: true, analytics: true, marketing: true })
    );
    btnNecessary && btnNecessary.addEventListener('click', () =>
      saveConsent({ necessary: true, analytics: false, marketing: false })
    );
    btnCustomize && btnCustomize.addEventListener('click', openModal);

    // Modal buttons
    const btnModalClose  = document.getElementById('cookieModalClose');
    const btnModalSave   = document.getElementById('cookieModalSave');
    const btnModalAccept = document.getElementById('cookieModalAccept');

    btnModalClose  && btnModalClose.addEventListener('click', closeModal);
    btnModalSave   && btnModalSave.addEventListener('click', () =>
      saveConsent(getModalPrefs())
    );
    btnModalAccept && btnModalAccept.addEventListener('click', () => {
      setModalToggles({ analytics: true, marketing: true });
      saveConsent({ necessary: true, analytics: true, marketing: true });
    });

    // Close on backdrop click
    modal && modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    // Keyboard close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
    });
  }

  // Expose for footer "gestisci preferenze" link
  window.AssetraCookies = {
    open: openModal,
    getConsent: () => consent,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
