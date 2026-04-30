/**
 * ASSETRA LIGHT — Main JavaScript
 * Luxury Editorial Website
 */

(function() {
  'use strict';

  // ==========================================================================
  // State
  // ==========================================================================
  const state = {
    currentLang: 'it',
    isMenuOpen: false,
    currentFilter: 'all',
    portfolioItems: [],
    lightboxIndex: -1
  };

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const elements = {
    header: document.getElementById('site-header'),
    hamburger: document.getElementById('hamburger'),
    mobileMenuOverlay: document.getElementById('mobile-menu-overlay'),
    langToggle: document.getElementById('lang-toggle'),
    langCurrent: document.querySelector('.lang-current'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    portfolioItems: document.querySelectorAll('.portfolio-item'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightbox-image'),
    lightboxCaption: document.getElementById('lightbox-caption'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    statNumbers: document.querySelectorAll('.stat-number'),
    serviceCards: document.querySelectorAll('.service-card'),
    revealElements: document.querySelectorAll('.reveal')
  };

  // ==========================================================================
  // Language Toggle
  // ==========================================================================
  function initLangToggle() {
    if (!elements.langToggle) return;

    elements.langToggle.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'it' ? 'en' : 'it';
      updateLanguage();
    });
  }

  function updateLanguage() {
    const langKey = state.currentLang === 'it' ? 'it' : 'en';
    const langAttr = state.currentLang === 'it' ? 'data-lang-it' : 'data-lang-en';

    // Update html lang attribute
    document.documentElement.lang = state.currentLang;

    // Update toggle button
    if (elements.langCurrent) {
      elements.langCurrent.textContent = state.currentLang.toUpperCase();
    }

    // Update all elements with data-lang attributes
    document.querySelectorAll('[data-lang-it]').forEach(el => {
      const text = el.getAttribute(langAttr);
      if (text) {
        // Handle checkbox labels specially
        if (el.tagName === 'LABEL' && el.querySelector('input[type="checkbox"]')) {
          const checkbox = el.querySelector('input[type="checkbox"]');
          const span = el.querySelector('span');
          if (span) {
            span.textContent = text.split('[')[0].trim();
          }
        } else {
          el.textContent = text;
        }
      }
    });

    // Save preference
    localStorage.setItem('assetra_lang', state.currentLang);
  }

  function loadSavedLanguage() {
    const saved = localStorage.getItem('assetra_lang');
    if (saved && (saved === 'it' || saved === 'en')) {
      state.currentLang = saved;
      updateLanguage();
    }
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  function initMobileMenu() {
    if (!elements.hamburger || !elements.mobileMenuOverlay) return;

    elements.hamburger.addEventListener('click', toggleMobileMenu);

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on overlay click
    elements.mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === elements.mobileMenuOverlay) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.hamburger.classList.toggle('active', state.isMenuOpen);
    elements.mobileMenuOverlay.classList.toggle('active', state.isMenuOpen);
    elements.hamburger.setAttribute('aria-expanded', state.isMenuOpen);
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    state.isMenuOpen = false;
    elements.hamburger.classList.remove('active');
    elements.mobileMenuOverlay.classList.remove('active');
    elements.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  function initHeaderScroll() {
    if (!elements.header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      if (current > 100) {
        elements.header.classList.add('scrolled');
      } else {
        elements.header.classList.remove('scrolled');
      }

      lastScroll = current;
    }, { passive: true });
  }

  // ==========================================================================
  // Portfolio Filter
  // ==========================================================================
  function initPortfolioFilter() {
    elements.portfolioItems.forEach((item, index) => {
      state.portfolioItems.push({
        element: item,
        category: item.dataset.category,
        index
      });
    });

    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        elements.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter
        state.currentFilter = btn.dataset.filter;
        filterPortfolio();
      });
    });
  }

  function filterPortfolio() {
    state.portfolioItems.forEach(item => {
      const { element, category } = item;

      if (state.currentFilter === 'all' || category === state.currentFilter) {
        element.classList.remove('hidden');
        setTimeout(() => {
          element.classList.add('revealed');
        }, 50);
      } else {
        element.classList.remove('revealed');
        setTimeout(() => {
          element.classList.add('hidden');
        }, 300);
      }
    });
  }

  // ==========================================================================
  // Lightbox
  // ==========================================================================
  function initLightbox() {
    if (!elements.lightbox) return;

    // Open lightbox on portfolio item click
    state.portfolioItems.forEach(item => {
      item.element.addEventListener('click', () => {
        openLightbox(item.index);
      });
    });

    // Close
    elements.lightboxClose.addEventListener('click', closeLightbox);

    // Navigate
    elements.lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });

    elements.lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // Close on backdrop click
    elements.lightbox.addEventListener('click', (e) => {
      if (e.target === elements.lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!elements.lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(index) {
    state.lightboxIndex = index;
    const visibleItems = state.portfolioItems.filter(item => !item.element.classList.contains('hidden'));
    const currentItem = visibleItems[index];

    if (!currentItem) return;

    const img = currentItem.element.querySelector('img');
    const title = currentItem.element.querySelector('.portfolio-title');

    elements.lightboxImage.src = img.src;
    elements.lightboxImage.alt = img.alt;
    elements.lightboxCaption.textContent = title ? title.textContent : '';

    elements.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    elements.lightbox.classList.remove('active');
    document.body.style.overflow = '';
    state.lightboxIndex = -1;
  }

  function navigateLightbox(direction) {
    const visibleItems = state.portfolioItems.filter(item => !item.element.classList.contains('hidden'));
    let newIndex = state.lightboxIndex + direction;

    if (newIndex < 0) newIndex = visibleItems.length - 1;
    if (newIndex >= visibleItems.length) newIndex = 0;

    state.lightboxIndex = newIndex;
    const currentItem = visibleItems[newIndex];

    if (!currentItem) return;

    const img = currentItem.element.querySelector('img');
    const title = currentItem.element.querySelector('.portfolio-title');

    elements.lightboxImage.style.opacity = '0';
    setTimeout(() => {
      elements.lightboxImage.src = img.src;
      elements.lightboxImage.alt = img.alt;
      elements.lightboxCaption.textContent = title ? title.textContent : '';
      elements.lightboxImage.style.opacity = '1';
    }, 200);
  }

  // ==========================================================================
  // Contact Form Validation
  // ==========================================================================
  function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset errors
      elements.contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      let isValid = true;
      const formData = new FormData(elements.contactForm);
      const data = Object.fromEntries(formData.entries());

      // Validate required fields
      const requiredFields = ['nome', 'cognome', 'email', 'messaggio', 'privacy'];

      requiredFields.forEach(field => {
        const input = elements.contactForm.querySelector(`[name="${field}"]`);
        const group = input?.closest('.form-group');

        if (!data[field] || (field === 'email' && !isValidEmail(data[field]))) {
          if (group) group.classList.add('error');
          isValid = false;
        }
      });

      if (!isValid) return;

      // Submit
      const submitBtn = elements.contactForm.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio in corso...';

      try {
        // Placeholder fetch - replace with actual endpoint
        // const response = await fetch('https://formspree.io/f/your-form-id', {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   headers: { 'Content-Type': 'application/json' }
        // });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        elements.formStatus.textContent = state.currentLang === 'it'
          ? 'Messaggio inviato con successo! Ti risponderemo al più presto.'
          : 'Message sent successfully! We will get back to you soon.';
        elements.formStatus.classList.add('success');
        elements.contactForm.reset();
      } catch (error) {
        elements.formStatus.textContent = state.currentLang === 'it'
          ? 'Si è verificato un errore. Riprova più tardi.'
          : 'An error occurred. Please try again later.';
        elements.formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = state.currentLang === 'it' ? 'Invia messaggio' : 'Send message';
      }
    });

    // Clear error on input
    elements.contactForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('error');
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ==========================================================================
  // Animated Stats Counter
  // ==========================================================================
  function initStatsCounter() {
    if (!elements.statNumbers.length) return;

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.statNumbers.forEach(stat => {
      observer.observe(stat);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // ==========================================================================
  // Scroll Reveal Animation
  // ==========================================================================
  function initScrollReveal() {
    // Service cards with stagger
    elements.serviceCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Portfolio items with stagger
    state.portfolioItems.forEach((item, index) => {
      item.element.style.transitionDelay = `${index * 0.1}s`;
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.serviceCards.forEach(card => observer.observe(card));
    state.portfolioItems.forEach(item => observer.observe(item.element));
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Close mobile menu if open
          if (state.isMenuOpen) {
            closeMobileMenu();
          }
        }
      });
    });
  }

  // ==========================================================================
  // Initialize
  // ==========================================================================
  function init() {
    loadSavedLanguage();
    initLangToggle();
    initMobileMenu();
    initHeaderScroll();
    initPortfolioFilter();
    initLightbox();
    initContactForm();
    initStatsCounter();
    initScrollReveal();
    initSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
