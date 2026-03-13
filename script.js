const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const navDropdowns = document.querySelectorAll('.nav-dropdown');

const closeAllDropdowns = () => {
  navDropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    dropdown.classList.remove('open');
    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
};

navDropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector('.dropdown-trigger');

  if (!trigger) {
    return;
  }

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const willOpen = !dropdown.classList.contains('open');
    closeAllDropdowns();

    if (willOpen) {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', () => {
  closeAllDropdowns();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAllDropdowns();
  }
});

if (mainNav) {
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (menuToggle && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      closeAllDropdowns();
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const form = document.querySelector('.contact-form');
const note = document.getElementById('formNote');

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'Thanks! Your message has been received. We will contact you soon.';
    form.reset();
  });
}

const appointmentForms = document.querySelectorAll('.appointment-form');
appointmentForms.forEach((appointmentForm) => {
  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let status = appointmentForm.querySelector('.appointment-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'appointment-status';
      appointmentForm.appendChild(status);
    }

    status.textContent = 'Thanks! Your appointment request was received. Our team will contact you shortly.';
    appointmentForm.reset();
  });
});

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialsPrev = document.getElementById('testimonialsPrev');
const testimonialsNext = document.getElementById('testimonialsNext');

if (testimonialsCarousel && testimonialsPrev && testimonialsNext) {
  const getScrollAmount = () => Math.max(280, Math.floor(testimonialsCarousel.clientWidth * 0.9));

  testimonialsPrev.addEventListener('click', () => {
    testimonialsCarousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  testimonialsNext.addEventListener('click', () => {
    testimonialsCarousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });
}

const compareRanges = document.querySelectorAll('.ba-range');
compareRanges.forEach((range) => {
  const compare = range.closest('.ba-compare');
  if (!compare) {
    return;
  }

  const syncPosition = () => {
    compare.style.setProperty('--pos', `${range.value}%`);
  };

  range.addEventListener('input', syncPosition);
  syncPosition();
});