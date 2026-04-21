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

const aboutGalleryPages = document.getElementById('aboutGalleryPages');
const aboutGalleryDots = document.querySelectorAll('.about-gallery-dot');

if (aboutGalleryPages && aboutGalleryDots.length > 0) {
  let activeSlide = 0;

  const setAboutSlide = (index) => {
    const max = aboutGalleryDots.length - 1;
    activeSlide = Math.max(0, Math.min(index, max));
    aboutGalleryPages.style.transform = `translateX(-${activeSlide * 100}%)`;

    aboutGalleryDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeSlide);
    });
  };

  aboutGalleryDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slide = Number(dot.getAttribute('data-slide') || '0');
      setAboutSlide(slide);
    });
  });

  setAboutSlide(0);
}

const testimonialSliders = document.querySelectorAll('[data-testimonials-slider]');
testimonialSliders.forEach((slider) => {
  const track = slider.querySelector('.testimonials-track');
  if (!track) {
    return;
  }

  const indicators = slider.parentElement?.querySelectorAll('.testimonials-indicators .about-gallery-dot') || [];
  let activeSlide = 0;
  const maxSlide = Math.max(0, track.children.length - 1);

  const setSlide = (index) => {
    activeSlide = Math.max(0, Math.min(index, maxSlide));
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    indicators.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === activeSlide);
    });
  };

  indicators.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = Number(dot.getAttribute('data-slide') || '0');
      setSlide(slideIndex);
    });
  });

  setSlide(0);
});

const galleryLightbox = document.getElementById('galleryLightbox');
const galleryLightboxImg = document.getElementById('galleryLightboxImg');
const galleryLightboxClose = document.getElementById('galleryLightboxClose');
const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
const galleryLightboxNext = document.getElementById('galleryLightboxNext');
const galleryItems = document.querySelectorAll('.about-gallery-item');
let activeGalleryIndex = 0;

const showGalleryImage = (index) => {
  if (!galleryLightbox || !galleryLightboxImg || galleryItems.length === 0) {
    return;
  }

  const maxIndex = galleryItems.length - 1;
  activeGalleryIndex = index < 0 ? maxIndex : index > maxIndex ? 0 : index;

  const activeItem = galleryItems[activeGalleryIndex];
  const activeImage = activeItem?.querySelector('img');

  if (!activeItem || !activeImage) {
    return;
  }

  galleryLightboxImg.setAttribute('src', activeItem.getAttribute('data-full') || activeImage.getAttribute('src') || '');
  galleryLightboxImg.setAttribute('alt', activeImage.getAttribute('alt') || 'Expanded gallery image');
};

const closeGalleryLightbox = () => {
  if (!galleryLightbox || !galleryLightboxImg) {
    return;
  }

  galleryLightbox.classList.remove('open');
  galleryLightbox.setAttribute('aria-hidden', 'true');
  galleryLightboxImg.setAttribute('src', '');
  document.body.style.overflow = '';
};

if (galleryLightbox && galleryLightboxImg && galleryItems.length > 0) {
  galleryItems.forEach((item, itemIndex) => {
    item.addEventListener('click', () => {
      activeGalleryIndex = itemIndex;
      showGalleryImage(activeGalleryIndex);
      galleryLightbox.classList.add('open');
      galleryLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
}

if (galleryLightboxClose) {
  galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
}

if (galleryLightboxPrev) {
  galleryLightboxPrev.addEventListener('click', (event) => {
    event.stopPropagation();
    showGalleryImage(activeGalleryIndex - 1);
  });
}

if (galleryLightboxNext) {
  galleryLightboxNext.addEventListener('click', (event) => {
    event.stopPropagation();
    showGalleryImage(activeGalleryIndex + 1);
  });
}

if (galleryLightbox) {
  galleryLightbox.addEventListener('click', (event) => {
    if (event.target === galleryLightbox) {
      closeGalleryLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeGalleryLightbox();
  }

  if (!galleryLightbox || !galleryLightbox.classList.contains('open')) {
    return;
  }

  if (event.key === 'ArrowLeft') {
    showGalleryImage(activeGalleryIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    showGalleryImage(activeGalleryIndex + 1);
  }
});

const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
  const formatStat = (value, suffix = '') => new Intl.NumberFormat('en-US').format(value) + suffix;
  let statsAnimated = false;

  const animateStat = (element) => {
    const target = Number(element.getAttribute('data-target') || '0');
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      element.textContent = formatStat(value, suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = formatStat(target, suffix);
      }
    };

    requestAnimationFrame(tick);
  };

  const statsObserver = new IntersectionObserver(
    (entries, observerEntries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || statsAnimated) {
          return;
        }

        statsAnimated = true;
        statNumbers.forEach((stat) => animateStat(stat));
        observerEntries.unobserve(entry.target);
      });
    },
    { threshold: 0.35 }
  );

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
}




