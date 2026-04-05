import './style.css'

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.documentElement; // Using documentElement (html) for data-theme

const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

// Initialize Theme
applyTheme(getCurrentTheme());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add('active');
    }
  });
};

// Navbar Background on Scroll
const nav = document.querySelector('nav');
const handleNavScroll = () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};

// Active Nav Link Logic
const navLinks = document.querySelectorAll('.nav-links a');

const handleActiveLink = () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
};

// Initialize
window.addEventListener('scroll', () => {
  revealOnScroll();
  handleNavScroll();
});

// Run once on load
revealOnScroll();
handleNavScroll();
handleActiveLink();

// Typing Animation Logic
const textElement = document.getElementById('typing-text');
const roleText = "I am a web developer";
let index = 0;
let isDeleting = false;

const type = () => {
  const currentText = isDeleting ? roleText.substring(0, index--) : roleText.substring(0, index++);
  textElement.textContent = currentText;

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && index > roleText.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
};

// Start typing animation
if (textElement) {
  type();
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
// 'nav' is already declared at the top of the file

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Close menu when clicking links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// Smooth Scroll (already implemented above, but ensures logic is consistent)
