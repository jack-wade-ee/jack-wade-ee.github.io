const copyrightTarget = document.querySelector('[data-copyright]');
if (copyrightTarget) {
  copyrightTarget.textContent = `© ${new Date().getFullYear()} Jack Wade. All rights reserved.`;
}

const sectionLinks = document.querySelectorAll('[data-link]');
const sections = [...sectionLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActive = (id) => {
  sectionLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));


const mouseSpotlight = document.querySelector('.mouse-spotlight');
if (mouseSpotlight) {
  const updateSpotlight = (event) => {
    document.body.classList.add('mouse-active');
    document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
  };

  window.addEventListener('pointermove', updateSpotlight);
  window.addEventListener('pointerdown', updateSpotlight);
}
