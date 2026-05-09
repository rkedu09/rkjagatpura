/* Smooth scrolling + navbar shadow + mobile menu */

(function () {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('navMenu');

  function setScrolled() {
    const scrolled = window.scrollY > 10;
    navbar && navbar.classList.toggle('scrolled', scrolled);
  }

  // Smooth scrolling for anchor links (fallback + respect prefers-reduced-motion)
  function smoothScrollToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      target.scrollIntoView();
      return;
    }

    const yOffset = -78; // navbar height offset
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[data-scroll][href^="#"]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#') return;

    // Avoid interfering with menu closing
    e.preventDefault();
    setTimeout(() => smoothScrollToHash(href), 0);

    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Mobile menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      const clickedInside = e.target.closest('.nav');
      if (!clickedInside && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  window.addEventListener('scroll', setScrolled, { passive: true });
  setScrolled();
})();

