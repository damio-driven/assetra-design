/**
 * ASSETRA — Cookie Consent Manager
 * GDPR Compliant Cookie Banner
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================
  const CONFIG = {
    storageKey: 'assetra_cookie_consent',
    bannerElement: document.getElementById('cookie-banner'),
    modalElement: document.getElementById('cookie-modal'),
    bannerDelay: 500
  };

  // ==========================================================================
  // State
  // ==========================================================================
  const state = {
    consent: null,
    isModalOpen: false
  };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const elements = {
    // Banner
    banner: CONFIG.bannerElement,
    bannerAcceptAll: document.getElementById('cookie-accept-all'),
    bannerCustom: document.getElementById('cookie-custom'),

    // Modal
    modal: CONFIG.modalElement,
    modalClose: document.getElementById('cookie-modal-close'),
    modalSave: document.getElementById('cookie-save'),
    modalAcceptSelected: document.getElementById('cookie-accept-selected'),

    // Checkboxes
    necessary: document.getElementById('cookie-necessary'),
    analytics: document.getElementById('cookie-analytics'),
    marketing: document.getElementById('cookie-marketing')
  };

  // ==========================================================================
  // Consent Management
  // ==========================================================================
  function loadConsent() {
    try {
      const stored = localStorage.getItem(CONFIG.storageKey);
      if (stored) {
        state.consent = JSON.parse(stored);
        return true;
      }
    } catch (e) {
      console.warn('Failed to load cookie consent:', e);
    }
    return false;
  }

  function saveConsent(consent) {
    state.consent = consent;
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(consent));
    } catch (e) {
      console.warn('Failed to save cookie consent:', e);
    }
  }

  function getConsentFromUI() {
    return {
      necessary: true, // Always true
      analytics: elements.analytics?.checked || false,
      marketing: elements.marketing?.checked || false,
      timestamp: new Date().toISOString()
    };
  }

  // ==========================================================================
  // UI Functions
  // ==========================================================================
  function showBanner() {
    if (!elements.banner) return;
    setTimeout(() => {
      elements.banner.classList.add('visible');
    }, CONFIG.bannerDelay);
  }

  function hideBanner() {
    if (!elements.banner) return;
    elements.banner.classList.remove('visible');
  }

  function showModal() {
    if (!elements.modal) return;
    state.isModalOpen = true;
    elements.modal.classList.add('active');
    elements.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Restore previous selections
    if (state.consent) {
      if (elements.analytics) elements.analytics.checked = state.consent.analytics || false;
      if (elements.marketing) elements.marketing.checked = state.consent.marketing || false;
    }
  }

  function hideModal() {
    if (!elements.modal) return;
    state.isModalOpen = false;
    elements.modal.classList.remove('active');
    elements.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // Social Feed Control
  // ==========================================================================
  function updateSocialFeed() {
    // Only load social content if marketing cookies are accepted
    if (state.consent?.marketing) {
      // TODO: Initialize LinkedIn/Instagram SDK here
      console.log('Marketing cookies accepted - loading social feed');
      // Example: loadSocialSDK();
    } else {
      console.log('Marketing cookies declined - social feed disabled');
    }
  }

  // ==========================================================================
  // Event Handlers
  // ==========================================================================
  function handleAcceptAll() {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    saveConsent(consent);
    hideBanner();
    updateSocialFeed();
  }

  function handleCustom() {
    showModal();
  }

  function handleSave() {
    const consent = getConsentFromUI();
    saveConsent(consent);
    hideModal();
    hideBanner();
    updateSocialFeed();
  }

  function handleAcceptSelected() {
    const consent = getConsentFromUI();
    saveConsent(consent);
    hideModal();
    hideBanner();
    updateSocialFeed();
  }

  function handleModalClose() {
    hideModal();
  }

  // ==========================================================================
  // Keyboard Navigation
  // ==========================================================================
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      if (!state.isModalOpen) return;

      if (e.key === 'Escape') {
        handleModalClose();
      }
    });
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================
  function init() {
    // Load existing consent
    const hasConsent = loadConsent();

    if (!hasConsent) {
      // Show banner if no consent exists
      showBanner();
    } else {
      // Apply existing consent
      updateSocialFeed();
    }

    // Banner events
    elements.bannerAcceptAll?.addEventListener('click', handleAcceptAll);
    elements.bannerCustom?.addEventListener('click', handleCustom);

    // Modal events
    elements.modalClose?.addEventListener('click', handleModalClose);
    elements.modalSave?.addEventListener('click', handleSave);
    elements.modalAcceptSelected?.addEventListener('click', handleAcceptSelected);

    // Close modal on backdrop click
    elements.modal?.addEventListener('click', (e) => {
      if (e.target === elements.modal) {
        handleModalClose();
      }
    });

    // Keyboard navigation
    initKeyboardNav();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.CookieConsent = {
    getConsent: () => state.consent,
    resetConsent: () => {
      localStorage.removeItem(CONFIG.storageKey);
      state.consent = null;
      showBanner();
    },
    showPreferences: showModal
  };
})();
