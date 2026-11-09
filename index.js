/**
 * ==============================================================================
 * PORTFOLIO CLIENT-SIDE INTERACTION SCRIPT
 * Developer: Kalyany S Nair | Full Stack Developer
 * Email: kalyanysnair.in@gmail.com
 * ==============================================================================
 */

// --- OPTIONAL EMAILJS CONFIGURATION ---
// To enable direct automated email delivery without opening the user's mail client,
// sign up at https://www.emailjs.com, create a service & template, and fill in these values:
const EMAILJS_CONFIG = {
  SERVICE_ID: "",  // e.g. "service_xxxxxxx"
  TEMPLATE_ID: "", // e.g. "template_xxxxxxx"
  PUBLIC_KEY: "",  // e.g. "your_public_key"
};

const VERIFIED_EMAIL = "kalyanysnair.in@gmail.com";

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNavigation();
  initHeaderAndScrollEffects();
  initSectionObservers();
  initHeroCopyEmailButton();
  initCopyEmailButton();
  initCertFilter();
  initContactForm();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK THEME PRIMARY DEFAULT)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  if (!themeBtn || !themeIcon) return;

  // Retrieve saved theme or default strictly to dark mode
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeBtn.setAttribute('title', 'Switch to light mode');
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeBtn.setAttribute('title', 'Switch to dark mode');
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
    }

    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#090d16' : '#ffffff');
    }
  }
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  function closeMenu() {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.className = 'fa-solid fa-bars';
    }
  }
}

/* ==========================================================================
   3. STICKY HEADER & BACK-TO-TOP SCROLL
   ========================================================================== */
function initHeaderAndScrollEffects() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header styling on scroll
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 350) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   4. ACTIVE LINK OBSERVER & SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initSectionObservers() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Active section highlighting
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
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
  }, sectionObserverOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // Fluid reveal on scroll
  const revealElements = document.querySelectorAll(
    '.project-card-editorial, .timeline-card, .skill-category-card, .cert-item-card, .achievement-card, .education-item-card, .pillar-card, .metric-card'
  );

  const revealObserverOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

/* ==========================================================================
   5. COPY EMAIL BUTTON WITH TOOLTIP
   ========================================================================== */
function initCopyEmailButton() {
  const copyBtn = document.getElementById('copy-email-btn');
  const tooltip = document.getElementById('copy-tooltip');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(VERIFIED_EMAIL);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = VERIFIED_EMAIL;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      showTooltip('Copied!');
    } catch (err) {
      console.warn('Clipboard copy error:', err);
      showTooltip('kalyanysnair.in@gmail.com');
    }
  });

  function showTooltip(message) {
    if (!tooltip) return;
    tooltip.textContent = message;
    tooltip.classList.add('show');
    setTimeout(() => {
      tooltip.classList.remove('show');
      setTimeout(() => {
        tooltip.textContent = 'Copy';
      }, 200);
    }, 2200);
  }
}

/* ==========================================================================
   6. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusBanner = document.getElementById('form-status');

  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Clear errors on input
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('has-error');
      const err = document.getElementById(`${input.name}-error`);
      if (err) err.classList.remove('active');
      if (statusBanner) statusBanner.style.display = 'none';
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate inputs
    let isValid = true;

    // Name validation
    const nameVal = nameInput.value.trim();
    if (!nameVal || nameVal.length < 2) {
      showError(nameInput, nameError);
      isValid = false;
    }

    // Email validation
    const emailVal = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      showError(emailInput, emailError);
      isValid = false;
    }

    // Subject validation
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal || subjectVal.length < 3) {
      showError(subjectInput, subjectError);
      isValid = false;
    }

    // Message validation
    const messageVal = messageInput.value.trim();
    if (!messageVal || messageVal.length < 10) {
      showError(messageInput, messageError);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Button loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Check if EmailJS credentials are configured
    const isEmailJSConfigured = Boolean(
      EMAILJS_CONFIG.SERVICE_ID &&
      EMAILJS_CONFIG.TEMPLATE_ID &&
      EMAILJS_CONFIG.PUBLIC_KEY &&
      window.emailjs
    );

    if (isEmailJSConfigured) {
      try {
        await window.emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            from_name: nameVal,
            from_email: emailVal,
            subject: subjectVal,
            message: messageVal,
            to_email: VERIFIED_EMAIL
          },
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        showStatus(
          'Thank you! Your message has been sent successfully. I will get back to you shortly.',
          'success'
        );
        form.reset();
      } catch (err) {
        console.error('EmailJS submission error:', err);
        fallbackToMailto(nameVal, emailVal, subjectVal, messageVal);
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    } else {
      // Direct, reliable client fallback:
      // Construct a mailto URI with prefilled fields so visitor's input is never lost
      setTimeout(() => {
        fallbackToMailto(nameVal, emailVal, subjectVal, messageVal);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }, 500);
    }
  });

  function showError(input, errorElement) {
    input.classList.add('has-error');
    if (errorElement) errorElement.classList.add('active');
  }

  function showStatus(message, type) {
    if (!statusBanner) return;
    statusBanner.className = `form-status ${type}`;
    statusBanner.innerHTML = message;
    statusBanner.style.display = 'block';
  }

  function fallbackToMailto(name, email, subject, message) {
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:${VERIFIED_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    showStatus(
      `<strong>Your default email client has been opened</strong> with your message addressed to <strong>${VERIFIED_EMAIL}</strong>.<br>` +
      `If your client didn't open automatically, you can send an email directly to <a href="mailto:${VERIFIED_EMAIL}" style="text-decoration: underline; color: inherit; font-weight: bold;">${VERIFIED_EMAIL}</a>.`,
      'info'
    );
  }
}

/* ==========================================================================
   7. HERO COPY EMAIL PILL WITH TOOLTIP
   ========================================================================== */
function initHeroCopyEmailButton() {
  const heroCopyBtn = document.getElementById('hero-copy-email-btn');
  const heroTooltip = document.getElementById('hero-copy-tooltip');

  if (!heroCopyBtn) return;

  heroCopyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(VERIFIED_EMAIL);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = VERIFIED_EMAIL;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      if (heroTooltip) {
        heroTooltip.textContent = 'Copied!';
        heroTooltip.classList.add('show');
        setTimeout(() => {
          heroTooltip.classList.remove('show');
        }, 2200);
      }
    } catch (err) {
      console.warn('Clipboard copy error:', err);
      if (heroTooltip) {
        heroTooltip.textContent = VERIFIED_EMAIL;
        heroTooltip.classList.add('show');
        setTimeout(() => {
          heroTooltip.classList.remove('show');
        }, 2200);
      }
    }
  });
}

/* ==========================================================================
   8. CERTIFICATIONS CATEGORY FILTER
   ========================================================================== */
function initCertFilter() {
  const tabButtons = document.querySelectorAll('.cert-tab-btn');
  const certCards = document.querySelectorAll('.cert-item-card');
  const countIndicator = document.getElementById('cert-count-indicator');

  if (!tabButtons.length || !certCards.length) return;

  const categoryLabels = {
    all: 'all 38 curated certifications and training credentials',
    cloud: '15 credentials in Cloud Computing & AWS',
    programming: '6 credentials in Programming & Web Development',
    database: '7 credentials in Databases & Engineering',
    security: '7 credentials in Cybersecurity & Networking',
    ai: '3 credentials in AI & Emerging Technologies'
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';

      // Update button active state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      let visibleCount = 0;
      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      // Update indicator text
      if (countIndicator) {
        if (categoryLabels[filter]) {
          countIndicator.textContent = `Showing ${categoryLabels[filter]}`;
        } else {
          countIndicator.textContent = `Showing ${visibleCount} certification${visibleCount === 1 ? '' : 's'}`;
        }
      }
    });
  });
}
