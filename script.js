// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const htmlElement = document.documentElement;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
  document.body.classList.add('dark-mode');
  htmlElement.style.colorScheme = 'dark';
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isCurrentlyDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isCurrentlyDark);
  htmlElement.style.colorScheme = isCurrentlyDark ? 'dark' : 'light';
});

// Publication Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    publicationItems.forEach(item => {
      if (filter === 'all') {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.animation = 'fadeInUp 0.5s ease-out';
        }, 0);
      } else {
        if (item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.animation = 'fadeInUp 0.5s ease-out';
          }, 0);
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.timeline-item, .project-card, .award-item').forEach(el => {
  observer.observe(el);
});

// Active navigation highlighting on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'var(--primary-color)';
    } else {
      link.style.color = '';
    }
  });
});

// Smooth page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
