// Kesia Silva — portfólio · interações leves

// Ano atual no rodapé
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Marca elementos para revelar no scroll
const revealTargets = document.querySelectorAll(
  ".section__label, .about__lead, .about__cols, .services__grid, .language__head, .tile, .entry, .certs li, .skills, .contact__title, .contact__lead, .contact__links, .contact__facts"
);
revealTargets.forEach((el, i) => {
  el.setAttribute("data-reveal", "");
  // pequeno atraso escalonado dentro de grupos próximos
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
});

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced || !("IntersectionObserver" in window)) {
  revealTargets.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  revealTargets.forEach((el) => io.observe(el));
}
