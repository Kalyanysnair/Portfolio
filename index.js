document.addEventListener('DOMContentLoaded', () => {

  /* --- THEME TOGGLE --- */
  const themeBtn = document.getElementById('theme-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Default to dark theme if not previously configured
  let savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  /* --- MOBILE HAMBURGER NAVIGATION --- */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = navLinks.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    menuToggle.querySelector('i').className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  /* --- HEADER & BACK TO TOP SCROLL EFFECTS --- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* --- ACTIVE NAVIGATION LINK HIGHLIGHTING --- */
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY || document.documentElement.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- CONTACT FORM API SUBMISSION (FORMSPREE) --- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  // Replace this placeholder with your free Formspree Form ID (e.g., "xoqgpkyd")
  const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_ID_HERE';

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
      showStatus('Please complete all form fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please provide a valid email address.', 'error');
      return;
    }

    // Check if user has replaced the placeholder ID
    if (FORMSPREE_FORM_ID === 'YOUR_FORMSPREE_ID_HERE') {
      showStatus('Form setup successful! To make it active, replace FORMSPREE_FORM_ID in index.js with your free Formspree ID.', 'success');
      contactForm.reset();
      return;
    }

    // Disable submit button and show visual sending state
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        showStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          showStatus(data.errors.map(err => err.message).join(', '), 'error');
        } else {
          showStatus('Oops! Something went wrong while sending. Please try again.', 'error');
        }
      }
    } catch (error) {
      showStatus('Oops! Network error. Please check your connection and try again.', 'error');
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Clear message alert after 8s
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 8000);
  }

  /* --- SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER) --- */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe components for fluid fade-in styling
  const revealElements = document.querySelectorAll('.glass-panel, .timeline-item');
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});
