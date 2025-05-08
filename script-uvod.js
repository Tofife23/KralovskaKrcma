const slider = document.getElementById('slider');
const cards = Array.from(slider.children);
let activeIndex = 0;
let startX = 0;
let isDragging = false;
let isTransitioning = false; // ochrana proti spam klikání
const INTERVAL_TIME = 3000;
let autoSlide = null;

// --- INIT ---
function init() {
  bindCardClickEvents(); // 1. přidat click listenery jen jednou
  updateActiveCard();
  startAutoSlide();
  initSwipeEvents();     // 4. touchmove swipe
}

// --- AUTO SLIDE ---
function startAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    if (!isTransitioning) next();
  }, INTERVAL_TIME);
}

function stopAutoSlide() {
  if (autoSlide) clearInterval(autoSlide);
}

// --- ACTIVE CARD ---
function updateActiveCard() {
  cards.forEach(card => card.classList.remove('active'));
  cards[activeIndex].classList.add('active');
  isTransitioning = true;
  setTimeout(() => {
    isTransitioning = false;
  }, 300); // přechodová ochrana
}

// --- CLICK NA KARTU ---
function bindCardClickEvents() {
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (isTransitioning || activeIndex === index) return;
      activeIndex = index;
      updateActiveCard();
      startAutoSlide(); // 5. restart po ručním výběru
    });
  });
}

// --- NEXT / PREV ---
function next() {
  if (isTransitioning) return;
  activeIndex = (activeIndex + 1) % cards.length;
  updateActiveCard();
}

function prev() {
  if (isTransitioning) return;
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateActiveCard();
}

// --- SWIPE ---
function initSwipeEvents() {
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAutoSlide();
  });

  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 50) {
      isDragging = false;
      if (diff > 0) prev();
      else next();
      startAutoSlide();
    }
  });

  slider.addEventListener('touchend', () => {
    isDragging = false;
  });

  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    stopAutoSlide();
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
    isDragging = false;
    startAutoSlide();
  });
}

// --- HOVER STOP ---
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// --- START ---
init();

// Easter Egg
  const tajnaSekvence = "nevimcodelat";
  let zadano = "";

  window.addEventListener("keydown", (e) => {
    zadano += e.key.toLowerCase();

    // Ořízni na délku sekvence
    if (zadano.length > tajnaSekvence.length) {
      zadano = zadano.slice(-tajnaSekvence.length);
    }

    // Porovnání se sekvencí
    if (zadano === tajnaSekvence) {
      alert("Dej si u nás pivo 🍺");
      
      document.body.style.background = "linear-gradient(to right, #ff758c, #ff7eb3)";
    }
  });

// Psaní po staru
    const text = "„Kde i král chlastá jako prase!“"; // Text, který se má „psát“
  const typingElement = document.getElementById("typing");
  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 150); // rychlost psaní (ms)
    }
  }

  type();

