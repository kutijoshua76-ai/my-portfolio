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

  // Handle active highlighting for new dropdown menu-item
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('highlight');
    if (href === currentPage) {
      link.classList.add('highlight');
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

// --- NEW HOME PAGE LOGIC ---

// New Theme Toggle
const themeToggleNew = document.getElementById('theme-toggle-new');
if (themeToggleNew) {
  themeToggleNew.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

// New Home Page Menu Dropdown
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (menuToggle && dropdownMenu) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdownMenu.classList.contains('hidden');
    if (isHidden) {
      dropdownMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      dropdownMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });

  document.addEventListener('click', (e) => {
    if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      dropdownMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
}

// BlurText Logic
const blurTextElements = document.querySelectorAll('.blur-text-wrapper');

if (blurTextElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  blurTextElements.forEach(el => {
    const text = el.getAttribute('data-text') || '';
    const animateBy = el.getAttribute('data-animate-by') || 'words';
    const direction = el.getAttribute('data-direction') || 'top';
    const delay = parseInt(el.getAttribute('data-delay')) || 100;

    const segments = animateBy === 'words' ? text.split(' ') : text.split('');
    el.innerHTML = '';

    segments.forEach((segment, i) => {
      const span = document.createElement('span');
      span.textContent = segment + (animateBy === 'words' && i < segments.length - 1 ? '\u00A0' : '');
      
      // Set initial transform based on direction
      const yOffset = direction === 'top' ? '-20px' : '20px';
      span.style.transform = `translateY(${yOffset})`;
      span.style.transitionDelay = `${i * delay}ms`;
      
      el.appendChild(span);
    });

    observer.observe(el);
  });
}
