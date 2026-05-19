/* ============================================================
   KROMA — main.js
   Navbar scroll, mobile menu, scroll reveal, active link
   ============================================================ */

'use strict';

/* ── 1. NAVBAR: transparent → frosted on scroll ─────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();


/* ── 2. MOBILE MENU ─────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger   = document.querySelector('.navbar__hamburger');
  const mobileMenu  = document.querySelector('.navbar__mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link, .navbar__mobile-cta');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ── 3. ACTIVE NAV LINK (by current page) ───────────────────── */
(function markActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar__link, .navbar__mobile-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();

    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === 'index.html' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();


/* ── 4. SCROLL REVEAL ───────────────────────────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ── 5. SMOOTH SCROLL for anchor links ──────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 6. CONTACT FORM (basic validation) ─────────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const feedback = document.createElement('p');
  feedback.className = 'form-feedback';
  feedback.style.cssText = `
    margin-top: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    display: none;
  `;
  form.appendChild(feedback);

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]');
    const email   = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    // Simple validation
    if (!name?.value.trim() || !email?.value.trim() || !message?.value.trim()) {
      showFeedback('Por favor completa todos los campos.', '#c0392b');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      showFeedback('Por favor ingresa un correo válido.', '#c0392b');
      return;
    }

    // Success state (replace with actual fetch/EmailJS in production)
    showFeedback('¡Mensaje enviado! Te responderemos pronto.', '#3d6b2c');
    form.reset();
  });

  function showFeedback(msg, color) {
    feedback.textContent = msg;
    feedback.style.color = color;
    feedback.style.display = 'block';
    setTimeout(() => { feedback.style.display = 'none'; }, 5000);
  }
})();


/* ── 7. QUANTITY CONTROLS (servicios page) ──────────────────── */
(function initQuantityControls() {
  document.querySelectorAll('.qty-control').forEach(control => {
    const minus = control.querySelector('[data-action="minus"]');
    const plus  = control.querySelector('[data-action="plus"]');
    const input = control.querySelector('.qty-input');
    if (!minus || !plus || !input) return;

    minus.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });

    plus.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      input.value = val + 1;
    });
  });
})();
