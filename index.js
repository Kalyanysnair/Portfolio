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
