// Initialize Lucide Icons
lucide.createIcons();

// Get current year for footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Typing effect for hero text
const typingTextElement = document.getElementById('typing-text');
const phrases = [
  'A Front-End Developer',
  'A Problem Solver',
  'A Web Enthusiast',
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

// Smooth scrolling and active navigation link highlighting
document.querySelectorAll('nav a').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    // Allow the "Resume" link to behave normally if it's not a hash link
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
  // Get the scroll position, adjusting for the fixed header
  const scrollY = window.pageYOffset + 100; // Add header height as offset

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
