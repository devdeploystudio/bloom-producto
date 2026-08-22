document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCountdown();
  initRipple();
  initCursorGlow();
  initProductTilt();
  initEmailForm();
});

function initReveal() {
  const targets = document.querySelectorAll('.card, .flavor-pill, .cta-card, .features h2, .flavors h2, .tagline-content, .lifestyle-media, .lifestyle-content');
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

function initCountdown() {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 12);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const diff = launchDate - new Date();
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

function initRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initCursorGlow() {
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);

  const hero = document.querySelector('.hero');

  hero.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
  hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  hero.addEventListener('mousemove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

function initProductTilt() {
  const product = document.querySelector('.product-frame');
  const heroVisual = document.querySelector('.hero-visual');
  if (!product || !heroVisual) return;

  heroVisual.addEventListener('mousemove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

    product.style.transform = `rotateY(${x * 25}deg) rotateX(${y * -25}deg)`;
  });

  heroVisual.addEventListener('mouseleave', () => {
    product.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

function initEmailForm() {
  const form = document.getElementById('emailForm');
  const input = document.getElementById('emailInput');
  const message = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!input.value) return;

    message.textContent = `¡Listo! Te avisamos a ${input.value} apenas abramos la preventa.`;
    launchConfetti();
    form.reset();
  });
}

function launchConfetti() {
  const colors = ['#d98b86', '#c06864', '#eeb79c', '#d9a24e', '#f6d9d2'];
  const pieceCount = 60;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const left = Math.random() * 100;
    const duration = 2 + Math.random() * 1.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isRound = Math.random() > 0.5;

    piece.style.left = `${left}vw`;
    piece.style.background = color;
    piece.style.animationDuration = `${duration}s`;
    piece.style.borderRadius = isRound ? '50%' : '2px';

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
  }
}
