/* =============================================
   Java実務研修プログラム LP - JavaScript（白×青テーマ）
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFAQ();
    initStepForm();
    initCountUp();
});

/* ----- スティッキーナビ ----- */
function initStickyNav() {
    const nav = document.getElementById('stickyNav');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
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

/* ----- カウントアップアニメーション ----- */
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    animateCount(el, target);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, target) {
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}
