/**
 * ASSETRA — Main JavaScript
 * Vanilla ES6 modules
 */

// ── Custom Cursor ──────────────────────────────────────────────────
const cursor      = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

if (cursor && cursorTrail && window.matchMedia('(hover: hover)').matches) {
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  function animateTrail() {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }

  document.addEventListener('mousemove', (e) => {
    trailX += (e.clientX - trailX) * 0.12;
    trailY += (e.clientY - trailY) * 0.12;
  });

  animateTrail();
}

// ── Sticky header ──────────────────────────────────────────────────
const header = document.getElementById('site-header');

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
};

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ── Mobile menu ────────────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function openMenu() {
  mobileMenu?.classList.add('open');
  hamburger?.classList.add('active');
  hamburger?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu?.classList.remove('open');
  hamburger?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

mobileClose?.addEventListener('click', closeMenu);

mobileMenu?.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ── Scroll reveal ──────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Meander path draw animation ────────────────────────────────────
const meanderObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drawn');
        meanderObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.meander-path').forEach(el => meanderObserver.observe(el));

// ── Animated stat counters ─────────────────────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Typewriter headline ────────────────────────────────────────────
function typewriterEffect(el, delay = 800) {
  const text = el.textContent;
  el.textContent = '';
  el.style.visibility = 'visible';
  let i = 0;

  // Preserve accent-dot span
  const hasDot = text.endsWith('.');
  const baseText = hasDot ? text.slice(0, -1) : text;

  setTimeout(() => {
    const interval = setInterval(() => {
      if (i < baseText.length) {
        el.textContent = baseText.slice(0, i + 1);
        i++;
      } else {
        clearInterval(interval);
        if (hasDot) {
          const dot = document.createElement('span');
          dot.className = 'accent-dot';
          dot.textContent = '.';
          el.appendChild(dot);
        }
      }
    }, 45);
  }, delay);
}

// Only run typewriter once the hero is visible (it's eager)
const heroHeadline = document.getElementById('hero-headline');
if (heroHeadline && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroHeadline.style.visibility = 'hidden';
  window.addEventListener('load', () => typewriterEffect(heroHeadline, 1000));
}

// ── Active nav link on scroll ──────────────────────────────────────
const sections  = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => navObserver.observe(s));

// ── Language toggle ────────────────────────────────────────────────
const langToggle = document.getElementById('lang-toggle');
let currentLang  = 'it';

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-en]').forEach(el => {
    if (lang === 'en') {
      if (!el.dataset.it) el.dataset.it = el.innerHTML;
      el.innerHTML = el.dataset.en;
    } else {
      if (el.dataset.it) el.innerHTML = el.dataset.it;
    }
  });

  langToggle?.querySelector('.lang-it')?.classList.toggle('active', lang === 'it');
  langToggle?.querySelector('.lang-en')?.classList.toggle('active', lang === 'en');
}

langToggle?.addEventListener('click', () => {
  applyLanguage(currentLang === 'it' ? 'en' : 'it');
});

// ── Portfolio filter ───────────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.hidden = !match;
      item.style.opacity = match ? '1' : '0';
    });
  });
});

// ── Lightbox ───────────────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxCap  = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentLightboxItems = [];
let currentLightboxIndex = 0;

function openLightbox(key) {
  const items = [...document.querySelectorAll('.portfolio-item:not([hidden])')];
  const item  = document.querySelector(`[data-lightbox="${key}"]`)?.closest('.portfolio-item');
  currentLightboxItems = items;
  currentLightboxIndex = items.indexOf(item);
  showLightboxItem(currentLightboxIndex);
  lightbox?.removeAttribute('hidden');
  setTimeout(() => lightbox?.classList.add('open'), 10);
  document.body.style.overflow = 'hidden';
}

function showLightboxItem(idx) {
  const item    = currentLightboxItems[idx];
  const img     = item?.querySelector('.portfolio-img');
  const title   = item?.querySelector('.portfolio-item__title');
  if (!img || !lightboxImg) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  if (lightboxCap && title) lightboxCap.textContent = title.textContent;
}

function closeLightbox() {
  lightbox?.classList.remove('open');
  setTimeout(() => {
    lightbox?.setAttribute('hidden', '');
    if (lightboxImg) lightboxImg.src = '';
  }, 300);
  document.body.style.overflow = '';
}

document.querySelectorAll('.portfolio-item__btn').forEach(btn => {
  btn.addEventListener('click', () => openLightbox(btn.dataset.lightbox));
});

lightboxClose?.addEventListener('click', closeLightbox);

lightboxPrev?.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length;
  showLightboxItem(currentLightboxIndex);
});

lightboxNext?.addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length;
  showLightboxItem(currentLightboxIndex);
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox || lightbox.hidden) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxItems.length) % currentLightboxItems.length; showLightboxItem(currentLightboxIndex); }
  if (e.key === 'ArrowRight') { currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxItems.length; showLightboxItem(currentLightboxIndex); }
});

// ── Contact form ───────────────────────────────────────────────────
const contactForm   = document.getElementById('contact-form');
const formSuccess   = document.getElementById('form-success');
const formSubmitBtn = document.getElementById('form-submit');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const privacyCheck = contactForm.querySelector('#privacy');
  if (!privacyCheck?.checked) {
    privacyCheck?.focus();
    privacyCheck?.closest('.form-checkbox-label')?.classList.add('error');
    return;
  }

  // Disable button during "send"
  if (formSubmitBtn) {
    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = currentLang === 'en' ? 'SENDING...' : 'INVIO IN CORSO...';
  }

  // Simulate send (replace with real fetch/formspree in production)
  setTimeout(() => {
    contactForm.reset();
    if (formSuccess) {
      formSuccess.removeAttribute('hidden');
      setTimeout(() => formSuccess.setAttribute('hidden', ''), 6000);
    }
    if (formSubmitBtn) {
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = currentLang === 'en' ? 'SEND MESSAGE' : 'INVIA MESSAGGIO';
    }
  }, 1200);
});

// ── Smooth scroll offset for fixed header ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
