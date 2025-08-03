lucide.createIcons();

document.getElementById('current-year').textContent = new Date().getFullYear();

const typingTextElement = document.getElementById('typing-text');
const phrases = [
  'A Front-End Developer',
  'A Problem Solver',
  'A Web Enthusiast',
  'A Collaborative Team Player',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = 100; // Typing speed
  if (isDeleting) {
    typeSpeed /= 2; // Faster deleting
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end of phrase
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before typing next phrase
  }

  setTimeout(typeWriter, typeSpeed);
}

// Mobile menu elements and functions
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMenuButton = document.getElementById('close-menu-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const body = document.body; // Reference to the body element

function openMobileMenu() {
  mobileMenuOverlay.classList.add('open');
  body.classList.add('no-scroll');
  lucide.createIcons();
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('open');
  body.classList.remove('no-scroll');
}

// Event listeners for mobile menu buttons
mobileMenuButton.addEventListener('click', openMobileMenu);
closeMenuButton.addEventListener('click', closeMobileMenu);

// Smooth scrolling and active navigation link highlighting
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
    } else if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  const scrollY = window.pageYOffset + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionId = section.getAttribute('id');

    // Check if the current scroll position is within the section
    if (scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight) {
      current = sectionId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Carousel functionality for testimonials
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const testimonials = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.dot');
  let index = 0;
  let autoScrollInterval;

  function updateCarousel() {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot) => dot.classList.remove('bg-orange-500'));
    dots.forEach((dot) => dot.classList.add('bg-gray-500'));
    dots[index].classList.remove('bg-gray-500');
    dots[index].classList.add('bg-orange-500');
  }

  function nextSlide() {
    index = (index + 1) % testimonials.length;
    updateCarousel();
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 6000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  nextBtn.addEventListener('click', () => {
    stopAutoScroll();
    nextSlide();
    startAutoScroll();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoScroll();
    index = (index - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
    startAutoScroll();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stopAutoScroll();
      index = parseInt(dot.getAttribute('data-index'));
      updateCarousel();
      startAutoScroll();
    });
  });

  // Pause auto-scroll on hover
  testimonials.addEventListener('mouseenter', stopAutoScroll);
  testimonials.addEventListener('mouseleave', startAutoScroll);

  // Initialize
  updateCarousel();
  startAutoScroll();
});

// Set initial active link on page load and start typing effect
window.addEventListener('load', () => {
  const firstSection = document.getElementById('home');
  if (firstSection) {
    const navLinkHome = document.querySelector('a[href="#home"]');
    if (navLinkHome) {
      navLinkHome.classList.add('active');
    }
  }
  typeWriter(); // Start the typing animation
});
