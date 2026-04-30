/* ============================================================
   ASSETRA — Social Feed Placeholder
   <!-- TODO: sostituire con embed LinkedIn/Instagram SDK -->
   ============================================================ */
(function () {
  'use strict';

  function initSocialFeed() {
    const containers = document.querySelectorAll('[data-social-blocked]');
    if (!containers.length) return;

    // Check consent on load and on consent update
    function syncBlocked() {
      const consent = window.AssetraCookies && window.AssetraCookies.getConsent();
      const allowed = consent && consent.marketing;
      containers.forEach(el => {
        el.dataset.socialBlocked = allowed ? 'false' : 'true';
      });
    }

    syncBlocked();
    document.addEventListener('assetra:consent', syncBlocked);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialFeed);
  } else {
    initSocialFeed();
  }

  /* FUTURE: when marketing cookies accepted, replace placeholders:
  function loadLinkedIn() { ... }
  function loadInstagram() { ... }
  document.addEventListener('assetra:consent', e => {
    if (e.detail.marketing) { loadLinkedIn(); loadInstagram(); }
  });
  */
})();
