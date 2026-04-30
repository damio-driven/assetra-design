/**
 * ASSETRA - Cookie Consent Manager
 * Author: ASSETRA Design Team
 * Date: 2026-04-25
 */

(function() {
  'use strict';

  // =====================================================
  // Configuration
  // =====================================================
  const CONFIG = {
    storageKey: 'assetra_cookie_consent',
    defaultConsent: {
      necessary: true,
      analytics: false,
      marketing: false
    },
    analyticsLoadDelay: 3000,  // ms
    marketingLoadDelay: 5000   // ms
  };

  // =====================================================
  // DOM Elements
  // =====================================================
  let cookieBanner = document.getElementById('cookie-banner');
  let cookieDismiss = document.getElementById('cookie-dismiss');
  let cookieAcceptAll = document.getElementById('cookie-accept-all');
  let cookieAcceptNecessary = document.getElementById('cookie-accept-necessary');
  let cookieCustomize = document.getElementById('cookie-customize');

  let consentCheckboxes = document.querySelectorAll('.cookie-checkbox');

  // =====================================================
  // Cookie Banner State
  // =====================================================
  let bannerShown = false;
  let userConsent = null;

  // =====================================================
  // Initialization
  // =====================================================
  function initCookieBanner() {
    if (!cookieBanner) return;

    // Check if banner should be shown
    if (!hasConsent()) {
      setTimeout(() => {
        bannerShown = true;
        cookieBanner.classList.add('visible');
      }, 1000);  // Show after 1 second
    } else {
      // User has consented - load social feeds
      setTimeout(loadSocialFeeds, CONFIG.analyticsLoadDelay);
    }
  }

  // =====================================================
  // Consent Management
  // =====================================================
  function hasConsent() {
    return localStorage.getItem(CONFIG.storageKey) !== null;
  }

  function saveConsent() {
    updateUserConsent();
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(userConsent));
  }

  function updateUserConsent() {
    const consent = {};

    consentCheckboxes.forEach(checkbox => {
      const category = checkbox.getAttribute('name');
      const value = checkbox.getAttribute('value');
      consent[value] = checkbox.checked;
    });

    userConsent = consent;
  }

  // =====================================================
  // Banner Controls
  // =====================================================
  function dismissBanner() {
    if (bannerShown) {
      cookieBanner.classList.remove('visible');
      bannerShown = false;
      updateSocialFeedState();
    }
  }

  function acceptAll() {
    consentCheckboxes.forEach(checkbox => checkbox.checked = true);
    saveConsent();
    cookieBanner.classList.remove('visible');
    bannerShown = false;
    loadAllSocialFeeds();
  }

  function acceptNecessaryOnly() {
    document.getElementById('cookie-analytics').checked = false;
    document.getElementById('cookie-marketing').checked = false;
    saveConsent();
    dismissBanner();
    loadSocialFeeds();
  }

  // =====================================================
  // Social Feed Loading
  // =====================================================
  function updateSocialFeedState() {
    const hasMarketingConsent = userConsent?.marketing === true;
    const hasAnalyticsConsent = userConsent?.analytics === true;

    const socialFeed = document.getElementById('social-feed');
    if (socialFeed) {
      const placeholders = socialFeed.querySelectorAll('.placeholder-overlay');
      placeholders.forEach(overlay => {
        overlay.style.opacity = hasMarketingConsent ? '0' : '0.8';
      });
    }
  }

  function loadSocialFeeds() {
    const consent = getUserConsent();
    const socialFeed = document.getElementById('social-feed');

    if (socialFeed && consent) {
      // Show LinkedIn feed if consented
      const linkedInPlaceholder = socialFeed.querySelector('.linkedin-placeholder');
      if (linkedInPlaceholder && consent.marketing) {
        linkedInPlaceholder.style.opacity = '0';
      }

      // Show Instagram feed if consented
      const instagramPlaceholder = socialFeed.querySelector('.instagram-placeholder');
      if (instagramPlaceholder && consent.marketing) {
        instagramPlaceholder.style.opacity = '0';
      }
    }
  }

  function loadAllSocialFeeds() {
    const socialFeed = document.getElementById('social-feed');
    if (socialFeed) {
      const overlays = socialFeed.querySelectorAll('.placeholder-overlay');
      overlays.forEach(overlay => overlay.style.opacity = '0');
    }
  }

  function getUserConsent() {
    const stored = localStorage.getItem(CONFIG.storageKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch(e) {
      localStorage.removeItem(CONFIG.storageKey);
      return null;
    }
  }

  // =====================================================
  // Event Listeners
  // =====================================================
  function setupCookieEvents() {
    if (!cookieDismiss) return;

    // Dismiss button (no consent - show again later)
    cookieDismiss.addEventListener('click', dismissBanner);

    // Accept all
    if (cookieAcceptAll) {
      cookieAcceptAll.addEventListener('click', acceptAll);
    }

    // Accept necessary only
    if (cookieAcceptNecessary) {
      cookieAcceptNecessary.addEventListener('click', acceptNecessaryOnly);
    }

    // Customize
    if (cookieCustomize) {
      cookieCustomize.addEventListener('click', () => {
        cookieBanner.classList.add('visible');
      });
    }

    // Checkbox changes
    consentCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateSocialFeedState);
    });
  }

  // =====================================================
  // Initialization
  // =====================================================
  function init() {
    setupCookieEvents();
    initCookieBanner();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
