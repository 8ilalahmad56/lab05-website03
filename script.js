/* ============================================================
   Bilal Ahmad Portfolio — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. Scroll Progress Bar ─────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ── 2. Back-to-Top ─────────────────────────────────── */
  const bttBtn = document.getElementById('back-to-top-btn');
  function updateBtt() {
    if (!bttBtn) return;
    if (window.scrollY > 300) bttBtn.classList.add('visible');
    else bttBtn.classList.remove('visible');
  }
  if (bttBtn) {
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── 3. Scroll Reveal ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── 4. Skill Bar Animation ─────────────────────────── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width') || '0%';
          setTimeout(() => { target.style.width = width; }, 150);
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillBars.forEach((bar) => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
  });

  /* ── 5. Hamburger Mobile Menu ───────────────────────── */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav    = document.getElementById('mobile-nav');
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', open);
      const icon = hamburgerBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = open ? 'close' : 'menu';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', false);
        const icon = hamburgerBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', false);
        const icon = hamburgerBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      }
    });
  }

  /* ── 6. Active Nav Link (multi-page) ───────────────── */
  function setActiveNav() {
    const page = document.body.getAttribute('data-page');
    if (!page) return;
    const pageMap = {
      home:         'index.html',
      about:        'about.html',
      skills:       'skills.html',
      projects:     'projects.html',
      education:    'education.html',
      experience:   'experience.html',
      certificates: 'certificates.html',
      contact:      'contact.html',
    };
    const filename = pageMap[page];
    const allLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    allLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      const base = href.split('/').pop();
      if (
        base === filename ||
        (page === 'home' && (base === '' || base === 'index.html' || href === '/'))
      ) {
        link.classList.add('active');
      }
    });
  }
  setActiveNav();

  /* ── 7. Contact Form ────────────────────────────────── */
  const form = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]" style="animation:spin 1s linear infinite">progress_activity</span><span>Sending…</span>`;
      }
      setTimeout(() => {
        if (formFeedback) {
          formFeedback.classList.remove('hidden');
          formFeedback.style.cssText = 'display:block;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.4);color:#34d399;padding:.875rem 1rem;border-radius:.75rem;font-family:var(--font-code);font-size:.75rem;margin-bottom:.5rem;';
          formFeedback.innerHTML = `<span class="material-symbols-outlined" style="vertical-align:middle;font-size:1rem;">check_circle</span> Message sent successfully! Bilal will reply within 24 hours.`;
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">send</span><span>Send Message</span>`;
        }
      }, 1400);
    });
  }

  /* ── 8. Flashcard Flip ──────────────────────────────── */
  document.querySelectorAll('.flashcard-wrapper').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  /* ── 9. Download CV ─────────────────────────────────── */
  document.querySelectorAll('[data-action="download-cv"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'documents/Bilal_Ahmad_Resume.pdf';
      link.download = 'Bilal_Ahmad_Resume.pdf';
      link.target = '_blank';
      link.click();
    });
  });

  /* ── Scroll listener (progress + btt) ──────────────── */
  window.addEventListener('scroll', () => {
    updateProgress();
    updateBtt();
  }, { passive: true });

  // Init
  updateProgress();
  updateBtt();
})();
