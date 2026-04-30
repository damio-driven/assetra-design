/**
 * ASSETRA Website - Main Scripts
 * Features: Theme toggle, form validation, cookie consent, animations
 */

(function() {
  'use strict';

  // ==================== THEME TOGGLE ====================
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const html = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
  
  themeToggleBtn?.addEventListener('click', function() {
    const newTheme = html.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(newTheme);
  });
  
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.remove('light-theme');
      html.classList.add('dark-theme');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark-theme');
      html.classList.add('light-theme');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // ==================== HEADER STICKY ====================
  
  const header = document.getElementById('main-header');
  
  function updateHeader() {
    const scrolled = window.scrollY > 300;
    
    if (scrolled) {
      header!.classList.add('shadow-md');
      header!.classList.add('py-2');
      header!.classList.replace('h-20', 'h-16');
    } else {
      header!.classList.remove('shadow-md');
      header!.classList.remove('py-2');
      header!.classList.replace('h-16', 'h-20');
    }
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Init
  
  // ==================== MOBILE MENU ====================
  
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuBtn?.addEventListener('click', function() {
    const isVisible = !mobileMenu?.classList.contains('hidden');
    if (isVisible) {
      mobileMenu?.classList.add('hidden');
      mobileMenuBtn?.classList.remove('rotate-45', '-rotate-45');
    } else {
      mobileMenu?.classList.remove('hidden');
      mobileMenuBtn?.classList.add('rotate-45', '-rotate-45');
    }
  });
  
  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a')?.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      mobileMenuBtn?.classList.remove('rotate-45', '-rotate-45');
    });
  });
  
  // ==================== FORM VALIDATION ====================
  
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const inputMap = {
      'name': { input: '#name', error: '#name-error' },
      'surname': { input: '#surname', error: '#surname-error' },
      'email': { input: '#email', error: '#email-error' },
      'subject': { input: '#subject', error: '#subject-error' },
      'message': { input: '#message', error: '#message-error' }
    };
    
    // Real-time validation
    Object.keys(inputMap).forEach(field => {
      const fieldData = inputMap[field];
      const input = document.querySelector(fieldData.input);
      const errorEl = document.querySelector(fieldData.error);
      
      if (input && errorEl) {
        input.addEventListener('input', function() {
          validateField(field, input, errorEl);
        });
        
        input.addEventListener('blur', function() {
          validateField(field, input, errorEl);
        });
      }
    });
    
    // Form submit
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      Object.keys(inputMap).forEach(field => {
        const fieldData = inputMap[field];
        const input = document.querySelector(fieldData.input);
        const errorEl = document.querySelector(fieldData.error);
        
        if (input && errorEl) {
          if (!validateField(field, input, errorEl)) {
            isValid = false;
          }
        }
      });
      
      if (isValid) {
        // Simulate form submission
        const originalBtnText = submitBtn?.innerHTML;
        submitBtn?.innerHTML = `<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg> Inviamento...`;
        submitBtn?.disabled = true;
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn?.innerHTML = originalBtnText || 'Invia Messaggio';
          submitBtn?.disabled = false;
          
          // Show success message
          const successMsg = `
            <div class="absolute inset-0 bg-green-500/90 rounded-lg flex items-center justify-center px-8 animate-fade-in">
              <div class="text-white text-center">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-lg font-semibold">Messaggio inviato con successo!</p>
                <p class="text-sm mt-2">Grazie per averci contattato. Ti risponderemo entro 24 ore.</p>
              </div>
            </div>
          `;
          const modal = document.createElement('div');
          modal.innerHTML = successMsg;
          document.body.appendChild(modal.firstElementChild as Element);
          
          setTimeout(() => {
            modal.remove();
          }, 8000);
        }, 2000);
      }
    });
  }
  
  function validateField(field, input, errorEl) {
    let isValid = true;
    let errorMsg = '';
    
    if (field === 'name' || field === 'surname') {
      const value = input?.value?.trim() || '';
      if (!value) {
        errorMsg = 'Questo campo è obbligatorio';
        isValid = false;
      } else if (value.length < 2) {
        errorMsg = 'Inserisci almeno 2 caratteri';
        isValid = false;
      }
    } else if (field === 'email') {
      const value = input?.value || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        errorMsg = 'Questo campo è obbligatorio';
        isValid = false;
      } else if (!emailRegex.test(value)) {
        errorMsg = 'Inserisci una email valida';
        isValid = false;
      }
    } else if (field === 'subject') {
      if (!input?.value) {
        errorMsg = 'Seleziona un argomento';
        isValid = false;
      }
    } else if (field === 'message') {
      const value = input?.value?.trim() || '';
      if (!value) {
        errorMsg = 'Questo campo è obbligatorio';
        isValid = false;
      } else if (value.length < 10) {
        errorMsg = 'Il messaggio deve contenere almeno 10 caratteri';
        isValid = false;
      }
    }
    
    if (errorMsg) {
      errorEl.classList.remove('hidden');
    } else {
      errorEl.classList.add('hidden');
    }
    
    // Remove red border on valid fields
    if (isValid) {
      input.classList.remove('border-red-500', 'focus:ring-red-500');
      input.classList.add('border-green-500', 'focus:ring-green-500');
    }
    
    return isValid;
  }
  
  // ==================== COOKIE CONSENT ====================
  
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies-btn');
  const cookieSelect = document.getElementById('cookie-consent');
  const acceptAllCheckbox = document.getElementById('accept-all-cookies');
  
  // Check if user already accepted cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    // Show banner after a short delay on first visit
    setTimeout(() => {
      if (cookieBanner) {
        cookieBanner.classList.remove('hidden');
      }
    }, 2000);
  }
  
  acceptBtn?.addEventListener('click', function() {
    if (acceptAllCheckbox?.checked) {
      localStorage.setItem('cookiesAccepted', 'all');
    } else {
      const selected = cookieSelect?.value;
      if (selected === 'necessary') {
        localStorage.setItem('cookiesAccepted', 'necessary');
      } else if (selected === 'statistics') {
        localStorage.setItem('cookiesAccepted', 'statistics');
      } else if (selected === 'marketing') {
        localStorage.setItem('cookiesAccepted', 'marketing');
      } else if (selected === 'custom') {
        localStorage.setItem('cookiesAccepted', 'custom');
      }
    }
    hideCookieBanner();
  });
  
  cookieSelect?.addEventListener('change', function() {
    // Update accept button text based on selection
    const value = this.value;
    const labels = {
      'necessary': 'Solo essenziali',
      'statistics': 'Analytics & statistics',
      'marketing': 'Marketing & advertising',
      'custom': 'Personalizzato...'
    };
    acceptBtn?.textContent = labels[value] || 'Accetta';
  });
  
  acceptAllCheckbox?.addEventListener('change', function() {
    // Disable cookie select when accept all is checked
    cookieSelect?.disabled = this.checked;
    acceptBtn?.textContent = this.checked ? 'Accetta tutto' : 'Accetta';
  });
  
  function hideCookieBanner() {
    cookieBanner?.classList.add('hidden');
  }
  
  // Handle GDPR preference function
  window.gdprPreference = function(cookieType: string) {
    // This function can be called from cookie settings modal
    localStorage.setItem('cookiesAccepted', cookieType);
    hideCookieBanner();
  }
  
  // ==================== ANIMATIONS ====================
  
  // Fade in elements on scroll
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length > 0) {
    const animateOnScroll = () => {
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('animate-fade-in-up');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    animateOnScroll(); // Init
  }
  
  // ==================== PARALLAX EFFECT ====================
  
  const heroSection = document.querySelector('#hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroContent = heroSection.querySelector('.relative.z-10.text-center');
      
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrolled / 600).toFixed(3);
      }
    });
  }
  
  // ==================== LAZY LOADING ====================
  
  // Handle image lazy loading
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    const src = img.getAttribute('src');
    const dataSrc = img.getAttribute('data-src');
    
    if (dataSrc) {
      img.src = dataSrc;
      img.removeAttribute('data-src');
    }
    
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    });
  });
  
  // ==================== SMOOTH SCROLL ====================
  
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        const headerHeight = header.clientHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==================== PERFORMANCE METRICS ====================
  
  // Track page load performance
  window.addEventListener('load', () => {
    const metrics = {
      loadTime: performance?.navigateStart ? document.readyState === 'complete' : 'unknown'
    };
    
    console.log('Page loaded in', performance?.navigation?.timing?.loadEventEnd);
  });
  
})();
