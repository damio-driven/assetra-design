/**
 * ASSETRA — Social Feed Placeholder
 * Loads real social embeds ONLY when marketing cookies accepted.
 * FUTURE: sostituire il corpo delle funzioni con veri SDK LinkedIn/Instagram
 */

const linkedinFeed  = document.getElementById('linkedin-feed');
const instagramFeed = document.getElementById('instagram-feed');

function loadLinkedIn() {
  // FUTURE: initialize LinkedIn plugin SDK here
  // Example: window.IN && window.IN.parse();
  // For now, placeholder content is already in HTML
}

function loadInstagram() {
  // FUTURE: initialize Instagram Basic Display API / embed here
  // Example: window.instgrm && window.instgrm.Embeds.process();
}

function handleConsent(prefs) {
  if (prefs?.marketing) {
    loadLinkedIn();
    loadInstagram();
  }
}

// Listen for consent granted this session
window.addEventListener('assetra:consent', (e) => handleConsent(e.detail));

// Also check on load in case consent was previously granted
try {
  const saved = JSON.parse(localStorage.getItem('assetra_cookie_consent') || 'null');
  if (saved) handleConsent(saved);
} catch {
  // localStorage unavailable — do nothing
}
