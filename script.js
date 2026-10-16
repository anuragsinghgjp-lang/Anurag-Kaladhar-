const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  if (glow && event.pointerType !== 'touch') {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
}, { passive: true });

// ANURAG KALADHAR — ORIGINAL ARTWORK GALLERY
const artworkFiles = [
  "IMG_20260902_172559.jpg",
  "InShot_20260906_221109970.jpg",
  "Picsart_26-07-12_22-24-01-867.jpg",
  "IMG-20260422-WA0022.jpg",
  "20260711123759483.jpg",
  "IMG_20260705_201301.jpg",
  "IMG_20260516_211019.jpg",
  "IMG_20260420_130719.jpg",
  "IMG_20260420_130650.jpg",
  "IMG_20260420_130634.jpg",
  "IMG_20260420_130741.jpg",
  "IMG_20260420_130755.jpg",
  "IMG_20260420_130552.jpg",
  "IMG_20260420_130536.jpg",
  "IMG_20260420_130609.jpg",
  "IMG_20260331_130952.jpg",
  "IMG_20251223_124732.jpg",
  "IMG_20251223_203456.jpg"
];

const gallery = document.querySelector(".gallery");

if (gallery) {
  // Shuffle the artworks randomly.
  const shuffled = [...artworkFiles];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  gallery.innerHTML = shuffled.map((file, index) => {
    const number = String(index + 1).padStart(2, "0");

    return `
      <article class="work-card ${index === 0 ? "work-card-large" : ""} reveal">
        <div class="work-image">
          <img
            src="${encodeURI(file)}"
            alt="Artwork ${number} by Anurag Kaladhar"
            loading="lazy"
            style="width:100%;height:100%;object-fit:cover;display:block;"
          >
          <span class="image-index">${number} / ORIGINAL ART</span>
        </div>

        <div class="card-meta">
          <div>
            <h3>Original Artwork ${number}</h3>
            <p>ARTWORK / ANURAG KALADHAR</p>
          </div>
          <span class="card-number">${number}</span>
        </div>
      </article>
    `;
  }).join("");

  // Update the gallery note.
  const note = document.querySelector(".gallery-note");

  if (note) {
    note.innerHTML =
      "<span>✳</span> 18 ORIGINAL ARTWORKS — BY ANURAG KALADHAR.";
  }

  // Enable the existing reveal animation for the new cards.
  document.querySelectorAll(".work-card.reveal").forEach(card => {
    if (typeof observer !== "undefined") {
      observer.observe(card);
    }
  });
}
