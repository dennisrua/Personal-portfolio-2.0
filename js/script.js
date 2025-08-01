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

// Netlify Forms with JavaScript Submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const encodedData = new URLSearchParams(formData).toString();

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedData,
    });

    if (response.ok) {
      formMessage.textContent =
        'Thank you for your message! I will get back to you soon.';
      formMessage.style.color = '#10B981';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed.');
    }
  } catch (error) {
    formMessage.textContent =
      'Oops! Something went wrong. Please try again later.';
    formMessage.style.color = '#EF4444'; // Tailwind's red-500 for error
    console.error('Error submitting form:', error);
  }
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
