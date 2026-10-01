/**
 * MARY YOUSRY FOUAD — UI/UX DESIGNER PORTFOLIO
 * Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initCaseStudyModals();
  initAssessmentWidget();
  initDesignSystemSwatches();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR & MOBILE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const siteNav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('mobile-active');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('mobile-active');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. SCROLL SPY (ACTIVE LINK HIGHLIGHTING)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. CASE STUDY DEEP DIVE MODALS
   ========================================================================== */
function initCaseStudyModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloses = document.querySelectorAll('[data-close-modal]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    backdrops.forEach(modal => modal.classList.remove('is-open'));
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   4. INTERACTIVE PRE-COURSE ASSESSMENT WIDGET (E-LEARNING CASE STUDY)
   ========================================================================== */
function initAssessmentWidget() {
  const assessmentContainers = document.querySelectorAll('.interactive-assessment-box');

  assessmentContainers.forEach(box => {
    const optionButtons = box.querySelectorAll('.option-btn');
    const resultBox = box.querySelector('.assessment-result');
    const resultText = box.querySelector('.assessment-result-message');

    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        optionButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const level = btn.getAttribute('data-level');
        if (resultBox && resultText) {
          resultBox.classList.add('active');
          if (level === 'beginner') {
            resultText.innerHTML = `<strong>UX Diagnostic Insight:</strong> You're a great fit for <em>CS 101: Computational Thinking & Fundamentals</em>. We will bypass advanced data structures to ensure clear step-by-step progress without cognitive overload!`;
          } else if (level === 'intermediate') {
            resultText.innerHTML = `<strong>UX Diagnostic Insight:</strong> You're ready for <em>Core Algorithms & Front-End React Architecture</em>. Diagnostic verified prerequisite readiness — estimated completion acceleration: 25%!`;
          } else {
            resultText.innerHTML = `<strong>UX Diagnostic Insight:</strong> You possess advanced experience. We suggest the <em>Advanced Systems & Architectural Design track</em> with direct project testing.`;
          }
        }
      });
    });
  });
}

/* ==========================================================================
   5. DESIGN SYSTEM SWATCHES CLICK-TO-COPY
   ========================================================================== */
function initDesignSystemSwatches() {
  const swatches = document.querySelectorAll('.ds-color-card');
  const toast = document.getElementById('toastNotice');

  swatches.forEach(card => {
    card.addEventListener('click', () => {
      const hexCode = card.getAttribute('data-hex') || card.querySelector('.swatch-code span')?.textContent;
      if (hexCode) {
        navigator.clipboard.writeText(hexCode.trim()).then(() => {
          showToast(`Copied token ${hexCode.trim()} to clipboard!`);
        }).catch(() => {
          showToast(`Color code: ${hexCode.trim()}`);
        });
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ==========================================================================
   6. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contactName').value.trim();
    const email = form.querySelector('#contactEmail').value.trim();
    const message = form.querySelector('#contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    // Friendly UX response confirmation
    showToast(`Thank you, ${name}! Your message was simulated successfully.`);
    form.reset();
  });
}

/* ==========================================================================
   7. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
