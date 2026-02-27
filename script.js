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
    initCountdown();
    initEvidenceCountUp();
    initAnalyticsEvents();
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
                // GA4: FAQ開閉イベント
                trackEvent('faq_open', { question: btn.textContent.trim().replace(/[+\-]/g, '').trim() });
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
            const value = option.getAttribute('data-value');
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

            // GA4: ステップフォーム進捗イベント
            trackEvent('step_form_progress', { step: currentStepNum, value: value });
        });
    });

    // GA4: フォーム最終ステップクリック
    const finalBtn = form.querySelector('.step-final');
    if (finalBtn) {
        finalBtn.addEventListener('click', () => {
            trackEvent('step_form_complete', { action: 'reservation_click' });
        });
    }
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

/* ----- カウントダウンタイマー ----- */
function initCountdown() {
    const timer = document.getElementById('countdownTimer');
    if (!timer) return;

    // 月末の23:59:59を締切とする
    function getDeadline() {
        const now = new Date();
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        return lastDay;
    }

    const deadline = getDeadline();

    function update() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            document.getElementById('cdDays').textContent = '00';
            document.getElementById('cdHours').textContent = '00';
            document.getElementById('cdMinutes').textContent = '00';
            document.getElementById('cdSeconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
        document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cdMinutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cdSeconds').textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* ----- 実証データカウントアップ ----- */
function initEvidenceCountUp() {
    const counters = document.querySelectorAll('.evidence-number[data-count]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    const isDecimal = el.getAttribute('data-decimal') === 'true';
                    animateEvidenceCount(el, target, isDecimal);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
}

function animateEvidenceCount(el, target, isDecimal) {
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        if (isDecimal) {
            el.textContent = (current / 10).toFixed(1);
        } else {
            el.textContent = current;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isDecimal) {
                el.textContent = (target / 10).toFixed(1);
            } else {
                el.textContent = target;
            }
        }
    }

    requestAnimationFrame(update);
}

/* =============================================
   GA4 コンバージョンイベントトラッキング
   ============================================= */

// 安全な gtag 呼び出しラッパー（GA4未設定時もエラーにならない）
function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, params || {});
    }
}

function initAnalyticsEvents() {
    // --- CTAボタンクリックトラッキング ---
    document.querySelectorAll('.btn-primary, .nav-cta-btn, .nav-quick-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            // ボタンの位置を特定
            let location = 'unknown';
            if (btn.closest('.hero')) location = 'hero';
            else if (btn.closest('.mini-cta')) location = 'mini_cta';
            else if (btn.closest('.section-cta')) location = 'final_cta';
            else if (btn.closest('.sticky-nav')) location = 'nav';

            trackEvent('cta_click', { button_location: location, button_text: btn.textContent.trim() });
        });
    });

    // --- スクロール深度トラッキング ---
    const scrollThresholds = [25, 50, 75, 100];
    const firedThresholds = new Set();

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (docHeight <= 0) return;

        const scrollPercent = Math.round((scrollTop / docHeight) * 100);

        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !firedThresholds.has(threshold)) {
                firedThresholds.add(threshold);
                trackEvent('scroll_depth', { depth_percent: threshold });
            }
        });
    }, { passive: true });
}
