/**
 * main.js — Alex Mercer Portfolio
 *
 * Responsibilities:
 *  1. Scroll progress bar
 *  2. Scroll-reveal animations (IntersectionObserver)
 *  3. Skill bar animations (IntersectionObserver)
 *  4. Active navigation link highlighting (IntersectionObserver)
 */

/* ── 1. Scroll Progress Bar ──────────────────────────────── */
const progressBar = document.getElementById('progressBar');

function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${percentage}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress(); // Set initial value on page load


/* ── 2. Scroll-Reveal Animation ──────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // Fire once only
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ── 3. Skill Bar Animation ──────────────────────────────── */
const skillBars = document.querySelectorAll('.skill-item__bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-animated');
      skillObserver.unobserve(entry.target); // Fire once only
    }
  });
}, { threshold: 0.4 });

skillBars.forEach(bar => skillObserver.observe(bar));


/* ── 4. Active Navigation Link ───────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link[data-section]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active state from all links
      navLinks.forEach(link => link.classList.remove('is-active'));

      // Add active state to the matching link
      const activeLink = document.querySelector(
        `.nav__link[data-section="${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add('is-active');
    }
  });
}, {
  // Trigger when section occupies the middle band of the viewport
  rootMargin: '-40% 0px -55% 0px'
});

sections.forEach(sec => sectionObserver.observe(sec));