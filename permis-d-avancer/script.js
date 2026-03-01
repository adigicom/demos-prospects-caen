/* ============================================
   LE COMPTOIR NORMAND — JavaScript
   Nav scroll, burger menu, tabs menu, scroll reveal
   ============================================ */

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ---- BURGER MENU ----
const burger    = document.getElementById('burger');
const navLinks  = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animation hamburger -> X
  burger.classList.toggle('active');
});

// Ferme le menu mobile au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});


// ---- MENU TABS ----
const tabs   = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Activer/désactiver tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Afficher/masquer panels
    panels.forEach(panel => {
      if (panel.dataset.panel === target) {
        panel.classList.add('active');
        // Re-trigger les animations reveal
        panel.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('visible');
          // On force un reflow pour relancer l'animation
          void el.offsetWidth;
          el.classList.add('visible');
        });
      } else {
        panel.classList.remove('active');
      }
    });
  });
});


// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Petit délai en cascade pour les éléments au même niveau
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

// Ajouter des délais en cascade sur les grilles
document.querySelectorAll('.avis__grid .avis__card, .menu__panel .menu__card').forEach((el, i) => {
  el.dataset.delay = (i % 3) * 100;
});

revealEls.forEach(el => revealObserver.observe(el));


// ---- SMOOTH ACTIVE SECTION (optional) ----
// Met en surbrillance le lien nav selon la section visible
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active-link', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
