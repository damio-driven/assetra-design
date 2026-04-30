/* ============================================================
   ASSETRA — main.js
   ============================================================ */
(function () {
  'use strict';

  // ── Navbar: scroll state + hero-active class ──
  (function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hero   = document.getElementById('hero');
    const hamburger = document.getElementById('hamburger');
    const overlay   = document.getElementById('navOverlay');
    const overlayLinks = overlay ? overlay.querySelectorAll('a') : [];

    if (!navbar) return;

    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hero-active: logo/links go white while hero is in view
    if (hero) {
      const heroObs = new IntersectionObserver(entries => {
        document.body.classList.toggle('hero-active', entries[0].isIntersecting);
      }, { threshold: 0.05 });
      heroObs.observe(hero);
    }

    // Hamburger
    hamburger && hamburger.addEventListener('click', () => {
      const isOpen = overlay.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  })();

  // ── Lang toggle ──
  (function initLangToggle() {
    const btnIT = document.getElementById('langIT');
    const btnEN = document.getElementById('langEN');
    if (!btnIT || !btnEN) return;

    let currentLang = 'it';

    function setLang(lang) {
      currentLang = lang;
      btnIT.classList.toggle('active', lang === 'it');
      btnEN.classList.toggle('active', lang === 'en');
      document.documentElement.lang = lang;

      document.querySelectorAll('[data-en]').forEach(el => {
        if (lang === 'en') {
          el.dataset.it = el.dataset.it || el.textContent;
          el.textContent = el.dataset.en;
        } else {
          if (el.dataset.it) el.textContent = el.dataset.it;
        }
      });
    }

    btnIT.addEventListener('click', () => setLang('it'));
    btnEN.addEventListener('click', () => setLang('en'));
  })();

  // ── Scroll reveal ──
  (function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => obs.observe(el));
  })();

  // ── Animated stat counters ──
  (function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCount(el) {
      const target   = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out-expo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => obs.observe(el));
  })();

  // ── Portfolio filter + lightbox ──
  (function initPortfolio() {
    const tabs  = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.portfolio-item');
    const lb    = document.getElementById('lightbox');
    const lbImg = lb ? lb.querySelector('.lightbox__img') : null;
    const lbCat = lb ? lb.querySelector('.lightbox__cat') : null;
    const lbTitle = lb ? lb.querySelector('.lightbox__title') : null;
    const lbClose = lb ? lb.querySelector('.lightbox__close') : null;

    // Filter
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        items.forEach(item => {
          if (filter === 'all' || item.dataset.cat === filter) {
            item.dataset.hidden = 'false';
          } else {
            item.dataset.hidden = 'true';
          }
        });
      });
    });

    // Lightbox
    if (!lb) return;

    function openLB(item) {
      const img = item.querySelector('img');
      if (!img || !lbImg) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      if (lbCat)   lbCat.textContent   = item.dataset.cat || '';
      if (lbTitle) lbTitle.textContent = item.dataset.title || '';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose && lbClose.focus();
    }

    function closeLB() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    items.forEach(item => {
      item.addEventListener('click', () => openLB(item));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openLB(item);
      });
    });

    lbClose && lbClose.addEventListener('click', closeLB);
    lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLB();
    });
  })();

  // ── Contact form ──
  (function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const msgEl = form.querySelector('.form-message');

    function setMsg(type, text) {
      if (!msgEl) return;
      msgEl.textContent = text;
      msgEl.className = `form-message form-message--${type} visible`;
    }

    function validate() {
      let ok = true;
      ['nome','cognome','email','settore','messaggio','privacyConsent'].forEach(name => {
        const el = form.elements[name];
        if (!el) return;
        const empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
        if (empty) {
          el.classList.add('error');
          ok = false;
        } else {
          el.classList.remove('error');
        }
      });
      // Email format
      const emailEl = form.elements['email'];
      if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        emailEl.classList.add('error');
        ok = false;
      }
      return ok;
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!validate()) {
        setMsg('error', 'Compila tutti i campi obbligatori correttamente.');
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;

      const data = new FormData(form);
      const endpoint = form.action;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data,
        });
        if (res.ok) {
          setMsg('success', 'Messaggio inviato. Ti risponderemo al più presto.');
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (_) {
        setMsg('error', 'Errore nell\'invio. Riprova o contattaci via email.');
        btn.disabled = false;
      }
    });

    // Live validation clear
    form.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('error'));
      el.addEventListener('change', () => el.classList.remove('error'));
    });
  })();

})();
