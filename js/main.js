// صنعت نوین معرق چرم — main.js
document.addEventListener('DOMContentLoaded', () => {
  // ---------- Highlight current nav link ----------
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
      const parentGroup = link.closest('.nav-group');
      if (parentGroup) parentGroup.open = true;
    }
  });

  // Keep dropdown navigation tidy: only one group remains expanded.
  document.querySelectorAll('.main-nav .nav-group').forEach(group => {
    group.addEventListener('toggle', () => {
      if (group.open) {
        document.querySelectorAll('.main-nav .nav-group').forEach(other => {
          if (other !== group) other.open = false;
        });
      }
    });
  });

  // ---------- Smooth scroll for anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Mobile menu toggle ----------
  const header = document.querySelector('.site-header');
  if (header) {
    const container = header.querySelector('.container');
    const nav = header.querySelector('.main-nav');

    if (container && nav && !header.querySelector('.nav-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'nav-toggle';
      toggle.setAttribute('aria-label', 'منو');
      toggle.innerHTML = '☰';
      container.insertBefore(toggle, nav);

      toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        toggle.innerHTML = nav.classList.contains('open') ? '✕' : '☰';
      });
    }
  }

  // ---------- Header scroll effect ----------
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Reveal on scroll (IntersectionObserver) ----------
  const reveals = document.querySelectorAll('.reveal, .card, .content-block');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // Fallback
    reveals.forEach(el => el.classList.add('visible'));
  }
});
// One shared public counter for the whole site; hidden on inner pages.
(function initSiteCounter() {
  const namespace = 'deepdesigntechnology-design.github.io';
  const existing = document.querySelector('.counterapi');
  if (!existing) {
    const tracker = document.createElement('div');
    tracker.className = 'counterapi';
    tracker.setAttribute('ns', namespace);
    tracker.setAttribute('key', 'site-total');
    tracker.setAttribute('action', 'view');
    tracker.setAttribute('invisible', 'true');
    tracker.setAttribute('aria-hidden', 'true');
    tracker.style.display = 'none';
    document.body.appendChild(tracker);
  }
  const counterScript = document.createElement('script');
  counterScript.src = 'https://counterapi.com/c.js?ns=' + encodeURIComponent(namespace);
  counterScript.async = true;
  document.head.appendChild(counterScript);
})();

// Google Analytics 4
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TZD7CT7CNW';
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TZD7CT7CNW');
})();
