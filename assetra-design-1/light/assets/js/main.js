/**
 * ASSETRA - Main JavaScript
 * Author: ASSETRA Design Team
 * Date: 2026-04-25
 */

(function() {
  'use strict';

  // =====================================================
  // DOM Elements
  // =====================================================
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const closeMenuBtn = document.getElementById('close-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const langToggle = document.getElementById('lang-toggle');
  const langCurrent = document.getElementById('lang-current');

  const statNumbers = document.querySelectorAll('.stat-number');
  const statLabels = document.querySelectorAll('.stat-label[data-lang-it]');

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  const cookieBanner = document.getElementById('cookie-banner');

  // =====================================================
  // Language Switcher
  // =====================================================
  let currentLang = 'it';

  function updateLanguage() {
    const elements = document.querySelectorAll('[data-lang-it]');

    elements.forEach(el => {
      if (currentLang === 'en') {
        const enText = el.getAttribute('data-en');
        if (enText) {
          el.textContent = enText;
        }
      } else {
        const itText = el.getAttribute('data-lang-it');
        const placeholder = el.getAttribute('data-lang-placeholder');
        const optLabel = el.getAttribute('data-lang-opt');

        if (placeholder) el.placeholder = placeholder;
        if (optLabel) el.options[el.selectedIndex].text = optLabel;
        if (itText) el.textContent = itText;
      }
    });

    // Update all language toggle buttons
    const langDisplays = document.querySelectorAll('.lang-current');
    langDisplays.forEach(el => {
      el.textContent = currentLang === 'it' ? 'EN' : 'IT';
    });
  }

  function initLanguage() {
    langCurrent.textContent = 'EN';

    // Desktop toggle
    if (langToggle) {
      langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'it' ? 'en' : 'it';
        updateLanguage();
      });
    }

    // Mobile toggle
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    if (mobileLangToggle) {
      mobileLangToggle.addEventListener('click', () => {
        currentLang = currentLang === 'it' ? 'en' : 'it';
        updateLanguage();
      });
    }

    // Set initial language from URL or default to Italian
    const urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang === 'en') {
      currentLang = 'en';
      updateLanguage();
    }
  }

  // =====================================================
  // Mobile Menu
  // =====================================================
  function initMobileMenu() {
    if (!mobileMenuBtn) return;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
    });

    closeMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');

        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // =====================================================
  // Header Scroll Effect
  // =====================================================
  function initHeaderScroll() {
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // =====================================================
  // Stats Counter Animation
  // =====================================================
  function animateStats() {
    const statsSection = document.querySelector('#about');
    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(stat => {
            const years = stat.getAttribute('data-stat-years');
            const brands = stat.getAttribute('data-stat-brands');
            const projects = stat.getAttribute('data-stat-projects');

            let target = 0;
            if (years !== null) target = 15;
            else if (brands !== null) target = 50;
            else if (projects !== null) target = 120;

            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
              current += step;
              if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(update);
              } else {
                stat.textContent = target;
              }
            };

            update();
          });
        }
      });
    }, { threshold: 0.5 });

    statsSection && statsObserver.observe(statsSection);
  }

  // =====================================================
  // Portfolio Filter
  // =====================================================
  function initPortfolioFilter() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          const categoryEn = item.getAttribute('data-category-en');

          if (filter === 'all' || filter === category || filter === categoryEn) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // =====================================================
  // Form Validation & Submission
  // =====================================================
  function validateForm() {
    const form = contactForm;
    const formData = new FormData(form);

    let isValid = true;

    // Name
    const nameInput = document.getElementById('contact-name');
    if (!nameInput.value.trim()) {
      showError('error-name', 'Nome obbligatorio', nameInput);
      isValid = false;
    } else {
      hideError('error-name');
    }

    // Surname
    const surnameInput = document.getElementById('contact-surname');
    if (!surnameInput.value.trim()) {
      showError('error-surname', 'Cognome obbligatorio', surnameInput);
      isValid = false;
    } else {
      hideError('error-surname');
    }

    // Email
    const emailInput = document.getElementById('contact-email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError('error-email', 'Email obbligatoria', emailInput);
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      showError('error-email', 'Inserisci un\'email valida', emailInput);
      isValid = false;
    } else {
      hideError('error-email');
    }

    // Phone (optional)
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput.value) {
      const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
      if (!phoneRegex.test(phoneInput.value)) {
        showError('error-phone', 'Inserisci un numero valido', phoneInput);
        isValid = false;
      } else {
        hideError('error-phone');
      }
    }

    // Sector (optional)
    const sectorInput = document.getElementById('contact-sector');
    if (sectorInput.value) {
      hideError('error-sector');
    }

    // Message (optional)
    const messageInput = document.getElementById('contact-message');
    if (messageInput.value.trim()) {
      hideError('error-message');
    }

    // Privacy checkbox (required)
    const privacyInput = document.getElementById('contact-privacy');
    if (!privacyInput.checked) {
      showError('error-privacy', 'Devi accettare la Privacy Policy', privacyInput);
      isValid = false;
    } else {
      hideError('error-privacy');
    }

    return isValid;
  }

  function showError(errorId, message, input) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');

      if (input) {
        input.style.borderColor = 'var(--color-accent)';
      }
    }
  }

  function hideError(errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Prepare submission
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Invio in corso...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Clear form
        contactForm.reset();

        // Show success message
        formStatus.textContent = 'Grazie! Ti risponderemo al più presto.';
        formStatus.classList.add('success');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Hide success message after delay
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success');
        }, 5000);
      }, 1500);
    }
  }

  // =====================================================
  // Scroll Reveal Animation
  // =====================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-text, .service-card, .portfolio-item');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      el.classList.add('reveal');
      el.classList.remove('reveal-active');
      revealObserver.observe(el);
    });
  }

  // =====================================================
  // Image Lazy Loading Enhancement
  // =====================================================
  function initLazyLoading() {
    // Enhancement for images with data-src-lazy attribute
    const lazyImages = document.querySelectorAll('img[data-src-lazy]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // =====================================================
  // Smooth Scroll for Anchor Links
  // =====================================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // =====================================================
  // Public API
  // =====================================================
  window.ASSETRA = {
    language: function(lang) {
      if (lang) {
        currentLang = lang;
        updateLanguage();
      }
      return currentLang;
    },
    init: function() {
      initLanguage();
      initMobileMenu();
      initHeaderScroll();
      animateStats();
      initPortfolioFilter();
      initScrollReveal();
      initLazyLoading();
      initSmoothScroll();

      // Form submission
      if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.ASSETRA && window.ASSETRA.init();
    });
  } else {
    window.ASSETRA && window.ASSETRA.init();
  }

})();
