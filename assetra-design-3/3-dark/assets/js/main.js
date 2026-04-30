/**
 * ASSETRA — Main JavaScript
 * DARK Variant (Roman Imperial / Bold Luxury)
 */

// ==========================================================================
// DOM Elements
// ==========================================================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const contactForm = document.getElementById('contact-form');

// ==========================================================================
// Header Scroll Effect
// ==========================================================================
function handleHeaderScroll() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });

// ==========================================================================
// Mobile Navigation
// ==========================================================================
function toggleMobileNav() {
  const isActive = hamburger.classList.contains('active');

  hamburger.classList.toggle('active');
  nav.classList.toggle('active');

  hamburger.setAttribute('aria-expanded', !isActive);
}

hamburger.addEventListener('click', toggleMobileNav);

// Close nav when clicking a link
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ==========================================================================
// Smooth Scroll for Anchor Links
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================================================================
// Scroll Reveal Animation
// ==========================================================================
const revealElements = document.querySelectorAll('.reveal');

function handleScrollReveal() {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add('visible');
    }
  });
}

// Initial check on load
window.addEventListener('load', handleScrollReveal);
window.addEventListener('scroll', handleScrollReveal, { passive: true });

// ==========================================================================
// Animated Counter
// ==========================================================================
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += step;

    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
let statsAnimated = false;

function handleStatsAnimation() {
  if (statsAnimated || !statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.85) {
    statsAnimated = true;
    statNumbers.forEach(animateCounter);
  }
}

window.addEventListener('scroll', handleStatsAnimation, { passive: true });
window.addEventListener('load', handleStatsAnimation);

// ==========================================================================
// Portfolio Filter
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active state
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        // Trigger reflow for animation
        void item.offsetWidth;
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
          if (item.style.opacity === '0') {
            item.style.display = 'none';
          }
        }, 300);
      }
    });
  });
});

// ==========================================================================
// Lightbox
// ==========================================================================
let currentImageIndex = 0;
let portfolioImages = [];

// Collect portfolio images
function collectPortfolioImages() {
  portfolioImages = Array.from(document.querySelectorAll('.portfolio-img')).map(img => ({
    src: img.src,
    alt: img.alt
  }));
}

function openLightbox(index) {
  collectPortfolioImages();
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightboxImage() {
  const image = portfolioImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
}

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
  updateLightboxImage();
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
  updateLightboxImage();
}

// Open lightbox on portfolio item click
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    openLightbox(index);
  });
});

// Lightbox controls
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', showPreviousImage);
lightbox.querySelector('.lightbox-next').addEventListener('click', showNextImage);

// Close on background click
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      showPreviousImage();
      break;
    case 'ArrowRight':
      showNextImage();
      break;
  }
});

// ==========================================================================
// Contact Form
// ==========================================================================
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate required fields
  const requiredFields = contactForm.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        isValid = false;
        field.nextElementSibling.style.color = 'var(--color-accent)';
      } else {
        field.nextElementSibling.style.color = '';
      }
    } else if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = 'var(--color-accent)';
    } else {
      field.style.borderColor = '';
    }
  });

  if (!isValid) {
    // Show error message
    alert('Per favore, compila tutti i campi obbligatori e accetta la Privacy Policy.');
    return;
  }

  // Here you would typically send the form data to a server
  // For now, show a success message
  alert('Grazie per il tuo messaggio. Ti contatteremo presto.');
  contactForm.reset();
});

// Clear error styling on input
contactForm.querySelectorAll('.form-input, .form-textarea').forEach(field => {
  field.addEventListener('input', () => {
    field.style.borderColor = '';
  });
});

contactForm.querySelectorAll('.form-checkbox').forEach(field => {
  field.addEventListener('change', () => {
    if (field.checked) {
      field.nextElementSibling.style.color = '';
    }
  });
});

// ==========================================================================
// Language Toggle (Placeholder)
// ==========================================================================
const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.getAttribute('data-lang');

    // Update active state
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Toggle language content
    document.querySelectorAll('[data-en]').forEach(element => {
      if (lang === 'en') {
        const originalText = element.textContent;
        const enText = element.getAttribute('data-en');
        element.setAttribute('data-it', originalText);
        element.textContent = enText;
      } else {
        const itText = element.getAttribute('data-it');
        if (itText) {
          element.textContent = itText;
        }
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  });
});

// ==========================================================================
// Typewriter Effect for Hero Title (Optional Enhancement)
// ==========================================================================
function typewriterEffect(element, duration = 2000) {
  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '2px solid var(--color-gold)';
  element.style.width = '0';
  element.style.display = 'inline-block';
  element.style.overflow = 'hidden';
  element.style.whiteSpace = 'nowrap';

  let charIndex = 0;
  const charDuration = duration / text.length;

  const typeChar = () => {
    if (charIndex < text.length) {
      element.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeChar, charDuration);
    } else {
      element.style.borderRight = 'none';
    }
  };

  setTimeout(typeChar, 1000);
}

// Uncomment to enable typewriter effect on hero title
// typewriterEffect(document.querySelector('.hero-title'));

// ==========================================================================
// Initialize
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Handle initial header state
  handleHeaderScroll();

  // Handle initial scroll reveal
  handleScrollReveal();

  console.log('ASSETRA — DARK Variant initialized');
});
