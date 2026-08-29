import './style.css';

// Active Nav Link Logic
const handleActiveLink = () => {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('.cm-nav-link, .cm-mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
};

// Navbar Background on Scroll
const header = document.querySelector('.cm-header');
const handleHeaderScroll = () => {
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Scroll Reveal Logic
const setupScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
};

// Mobile Menu Handler
const setupMobileMenu = () => {
  const toggleBtn = document.querySelector('.cm-mobile-toggle');
  const mobileMenu = document.querySelector('.cm-mobile-menu');
  const links = document.querySelectorAll('.cm-mobile-link');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
};

// Category Filter on Projects Page
const setupProjectFilters = () => {
  const filterBtns = document.querySelectorAll('.cm-filter-btn');
  const projectCards = document.querySelectorAll('.cm-project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Copy Email to Clipboard
const setupCopyEmail = () => {
  const copyBtn = document.getElementById('cmCopyEmailBtn');
  const copyTextEl = document.getElementById('cmCopyEmailText');

  if (copyBtn && copyTextEl) {
    copyBtn.addEventListener('click', async () => {
      const email = copyTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#10b981';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = '';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  }
};

// Contact Form Handler with Direct Email Notification
const setupContactForm = () => {
  const form = document.getElementById('cmContactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.cm-btn-submit');
    const originalContent = submitBtn.innerHTML;

    const name = document.getElementById('clientName')?.value.trim() || '';
    const email = document.getElementById('clientEmail')?.value.trim() || '';
    const projectType = form.querySelector('input[name="projectType"]:checked')?.value || 'General Inquiry';
    const message = document.getElementById('clientMessage')?.value.trim() || '';

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://formsubmit.co/ajax/kutijoshua76@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${name} (${projectType})`,
          _replyto: email,
          name: name,
          email: email,
          projectFocus: projectType,
          message: message,
          _template: 'table'
        })
      });

      if (response.ok) {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Notification Sent to Josh!';
        submitBtn.style.background = '#10b981';
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 5000);
      } else {
        throw new Error('Form submission returned non-OK status');
      }
    } catch (err) {
      console.warn('Direct notification API submission fallback:', err);
      const mailtoUrl = `mailto:kutijoshua76@gmail.com?subject=${encodeURIComponent('Project Inquiry: ' + projectType + ' - ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nProject: ' + projectType + '\n\nMessage:\n' + message)}`;
      window.location.href = mailtoUrl;

      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Opening Email Client...';
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 5000);
    }
  });
};

// Initialize All Listeners
document.addEventListener('DOMContentLoaded', () => {
  handleActiveLink();
  handleHeaderScroll();
  setupScrollReveal();
  setupMobileMenu();
  setupProjectFilters();
  setupCopyEmail();
  setupContactForm();
});

window.addEventListener('scroll', handleHeaderScroll);
