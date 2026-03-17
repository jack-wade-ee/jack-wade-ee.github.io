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

let visibleSectionId = sections[0]?.id;

const updateActiveFromScrollBounds = () => {
  const atTop = window.scrollY <= 8;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;

  if (atTop) {
    setActive('about');
    return;
  }

  if (atBottom) {
    setActive('contact');
    return;
  }

  if (visibleSectionId) {
    setActive(visibleSectionId);
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSectionId = entry.target.id;
      }
    });

    updateActiveFromScrollBounds();
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener('scroll', updateActiveFromScrollBounds, { passive: true });
window.addEventListener('resize', updateActiveFromScrollBounds);
updateActiveFromScrollBounds();

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
