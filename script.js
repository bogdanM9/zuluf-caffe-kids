// Mobile menu
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
  navMenu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on link click
  navMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => closeMenu());
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const target = e.target;
    const clickedInside = navMenu.contains(target) || navToggle.contains(target);
    if (!clickedInside) closeMenu();
  });
}

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());

// Contact form -> mailto (front-end only)
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const contact = (data.get("contact") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    const subject = encodeURIComponent(`Mesaj de pe site – Zuluf Caffe & Kids (${name || "Anonim"})`);
    const body = encodeURIComponent(
`Nume: ${name}
Contact: ${contact}

Mesaj:
${message}
`
    );

    // Set your real email here
    const to = "hello@zuluf.ro";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    if (hint) hint.textContent = "Dacă nu s-a deschis email-ul, verifică setările browserului.";
  });
}

/* Scroll floaties (ONLY 3): 🧸☕🥐 */
(() => {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const f1 = document.querySelector('.floaty--1');
  const f2 = document.querySelector('.floaty--2');
  const f3 = document.querySelector('.floaty--3');
  if (!f1 || !f2 || !f3) return;

  let lastY = window.scrollY;
  let vel = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const d = y - lastY;
    lastY = y;
    vel += d * 0.18;
  }, { passive: true });

  function tick(t){
    vel *= 0.88;
    const base = window.scrollY * 0.06;

    const s1 = Math.sin(t/900) * 6;
    const s2 = Math.sin(t/1100 + 1.3) * 7;
    const s3 = Math.sin(t/1000 + 2.1) * 6;

    f1.style.transform = `translate3d(0, ${base + vel*0.35 + s1}px, 0) rotate(${Math.sin(t/1500)*4}deg)`;
    f2.style.transform = `translate3d(0, ${base*0.8 + vel*0.28 + s2}px, 0) rotate(${Math.sin(t/1600+1)*4}deg)`;
    f3.style.transform = `translate3d(0, ${-base*0.35 + vel*0.22 + s3}px, 0) rotate(${Math.sin(t/1700+2)*4}deg)`;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
