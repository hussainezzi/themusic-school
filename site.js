// The Music School — motion layer.
// Progressive enhancement: without JS every section is visible; with JS the
// sections rise in once, and never again (no scroll-jacking, no replay loop).

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("js");

const targets = document.querySelectorAll(
  ".section__head, .card, .step, .recital__figure, .recital__copy, .visit__copy, .visit__figure"
);

targets.forEach((el, index) => {
  el.setAttribute("data-reveal", "");
  el.style.setProperty("--reveal-index", String(index % 4));
});

if (reduceMotion || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
}

// Pause the instrument marquee when it is off screen (saves battery, keeps it
// still when a keyboard user is tabbing through the page).
const band = document.querySelector(".band");
if (band && !reduceMotion && "IntersectionObserver" in window) {
  const bandObserver = new IntersectionObserver(
    ([entry]) => band.classList.toggle("is-idle", !entry.isIntersecting),
    { threshold: 0 }
  );
  bandObserver.observe(band);
}
