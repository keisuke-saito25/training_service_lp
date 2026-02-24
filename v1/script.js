/* =============================================
   Java実務研修プログラム LP - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initFAQ();
  initStepForm();
  initParticles();
});

/* ----- スティッキーナビ ----- */
function initStickyNav() {
  const nav = document.getElementById('stickyNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ----- モバイルメニュー ----- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // メニューリンクをクリックしたら閉じる
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
}

/* ----- スムーズスクロール ----- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ----- スクロールアニメーション ----- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

/* ----- FAQ アコーディオン ----- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // 他のすべてを閉じる
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        activeItem.classList.remove('active');
        activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // クリックされたアイテムをトグル
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ----- ステップフォーム ----- */
function initStepForm() {
  const form = document.getElementById('stepForm');
  if (!form) return;

  form.querySelectorAll('.step-option:not(.step-final)').forEach(option => {
    option.addEventListener('click', () => {
      const nextStep = option.getAttribute('data-next');
      if (!nextStep) return;

      // 現在のパネルを非表示
      const currentPanel = form.querySelector('.step-panel.active');
      const currentStepNum = currentPanel.getAttribute('data-step');

      currentPanel.classList.remove('active');

      // 次のパネルを表示
      const nextPanel = form.querySelector(`.step-panel[data-step="${nextStep}"]`);
      if (nextPanel) {
        nextPanel.classList.add('active');
      }

      // プログレスドットを更新
      const currentDot = form.querySelector(`.step-dot[data-step="${currentStepNum}"]`);
      const nextDot = form.querySelector(`.step-dot[data-step="${nextStep}"]`);

      if (currentDot) currentDot.classList.replace('active', 'completed');
      if (nextDot) nextDot.classList.add('active');
    });
  });
}

/* ----- ヒーローパーティクル ----- */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');

    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';

    const size = 2 + Math.random() * 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // 色のランダム化（グリーン系 or ブルー系）
    if (Math.random() > 0.5) {
      particle.style.background = '#00e676';
    } else {
      particle.style.background = '#448aff';
    }

    container.appendChild(particle);
  }
}
