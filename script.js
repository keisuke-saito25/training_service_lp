/* =============================================
   Java実務研修プログラム LP - JavaScript（白×青テーマ）
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    initTrafficAttribution();
    initTimerexLink();
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

/* ----- TimeRex 予約リンクの制御 -----
   URLが【TIMEREX_URL_HERE】プレースホルダのままの場合はボタンを非表示にし、
   代替のフォールバックメッセージを表示する。実URL差替後は自動でボタン表示に切り替わる。 */
function initTimerexLink() {
    const timerexLink = document.getElementById('timerexLink');
    if (!timerexLink) return;

    const isPlaceholder = timerexLink.href.includes('TIMEREX_URL_HERE');

    const ctaWrapper = document.getElementById('thanksCtaWrapper');
    const msgWithTimerex = document.getElementById('thanksMessageWithTimerex');
    const msgFallback = document.getElementById('thanksMessageFallback');
    const nextWithTimerex = document.getElementById('thanksNextWithTimerex');
    const nextFallback = document.getElementById('thanksNextFallback');

    if (isPlaceholder) {
        // URL未設定: ボタン非表示・フォールバックメッセージを表示
        return; // 既に hidden 属性が付いているので何もしない
    }

    // URL設定済: TimeRex導線を表示し、フォールバックを隠す
    if (ctaWrapper) ctaWrapper.hidden = false;
    if (msgWithTimerex) msgWithTimerex.hidden = false;
    if (msgFallback) msgFallback.hidden = true;
    if (nextWithTimerex) nextWithTimerex.hidden = false;
    if (nextFallback) nextFallback.hidden = true;

    // クリック時のGA4イベント
    timerexLink.addEventListener('click', () => {
        trackEvent('timerex_click', {
            source: 'thanks_page',
            link_url: timerexLink.href
        });
    });
}

/* ----- 流入元トラッキング（UTM / GCLID）-----
   Google広告等の流入元をlocalStorageに最大90日保持し、
   問い合わせフォーム送信時にWeb3Forms経由でスプレッドシート運用に引き渡す。
   将来のオフラインコンバージョンインポート（Google広告）の前提データにもなる。 */
function initTrafficAttribution() {
    const STORAGE_KEY = 'tb_attribution';
    const EXPIRY_DAYS = 90;
    const TRACKED_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'];
    const FIELD_MAP = {
        utm_source: 'formUtmSource',
        utm_medium: 'formUtmMedium',
        utm_campaign: 'formUtmCampaign',
        utm_content: 'formUtmContent',
        utm_term: 'formUtmTerm',
        gclid: 'formGclid',
        landing_page: 'formLandingPage',
        referrer: 'formReferrer',
    };

    const params = new URLSearchParams(window.location.search);
    let attribution = {};

    // 既存データ読み込み（期限切れなら破棄）
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const stored = JSON.parse(raw);
            const ageDays = (Date.now() - new Date(stored.captured_at).getTime()) / (1000 * 60 * 60 * 24);
            if (ageDays <= EXPIRY_DAYS) {
                attribution = stored;
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    } catch (e) { /* 破損データは無視 */ }

    // URLに新しい流入パラメータがあれば上書き（新しい広告クリックを優先）
    const hasNewAttribution = TRACKED_PARAMS.some(key => params.has(key));
    if (hasNewAttribution) {
        attribution = { captured_at: new Date().toISOString() };
        TRACKED_PARAMS.forEach(key => {
            if (params.has(key)) attribution[key] = params.get(key);
        });
        attribution.landing_page = window.location.href;
        attribution.referrer = document.referrer || '(direct)';
    } else if (!attribution.landing_page) {
        // 初回到達時のみ landing_page / referrer を記録
        attribution.captured_at = new Date().toISOString();
        attribution.landing_page = window.location.href;
        attribution.referrer = document.referrer || '(direct)';
    }

    // localStorageに保存（プライベートモード等で失敗する環境はスキップ）
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch (e) { /* 無視 */ }

    // hidden input に反映
    Object.entries(FIELD_MAP).forEach(([key, elemId]) => {
        const el = document.getElementById(elemId);
        if (el && attribution[key]) el.value = attribution[key];
    });
}

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

/* ----- ステップフォーム + 問い合わせフォーム送信 ----- */
function initStepForm() {
    const form = document.getElementById('stepForm');
    if (!form) return;

    // ステップ1・2の選択値を記録
    const formData = { age: '', experience: '' };

    form.querySelectorAll('.step-option:not(.step-final)').forEach(option => {
        option.addEventListener('click', () => {
            const nextStep = option.getAttribute('data-next');
            const value = option.getAttribute('data-value');
            if (!nextStep) return;

            // 現在のパネルを非表示
            const currentPanel = form.querySelector('.step-panel.active');
            const currentStepNum = currentPanel.getAttribute('data-step');

            // ステップ値を記録
            if (currentStepNum === '1') formData.age = value;
            if (currentStepNum === '2') formData.experience = value;

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

            // hiddenフィールドに値をセット
            const ageField = document.getElementById('formAgeRange');
            const expField = document.getElementById('formExperience');
            if (ageField) ageField.value = formData.age;
            if (expField) expField.value = formData.experience;

            // GA4: ステップフォーム進捗イベント
            trackEvent('step_form_progress', { step: currentStepNum, value: value });
        });
    });

    // 問い合わせフォーム送信
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // バリデーション
        const nameInput = document.getElementById('formName');
        const emailInput = document.getElementById('formEmail');
        let isValid = true;

        // エラー状態をリセット
        contactForm.querySelectorAll('.form-input, .form-select').forEach(el => {
            el.classList.remove('error');
        });

        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            nameInput.focus();
            isValid = false;
        }

        if (!emailInput.value.trim() || !emailInput.validity.valid) {
            emailInput.classList.add('error');
            if (isValid) emailInput.focus();
            isValid = false;
        }

        if (!isValid) return;

        // ボタンをローディング状態に
        const submitBtn = document.getElementById('formSubmitBtn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>送信中...';

        try {
            // Web3Forms API に送信
            const data = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (result.success) {
                // GA4: フォーム送信完了イベント
                trackEvent('step_form_complete', {
                    action: 'form_submitted',
                    age_range: formData.age,
                    experience: formData.experience,
                });

                // サンクス画面を表示
                const step3 = form.querySelector('.step-panel[data-step="3"]');
                const thanksPanel = document.getElementById('stepThanks');
                const dot3 = form.querySelector('.step-dot[data-step="3"]');

                if (step3) step3.classList.remove('active');
                if (thanksPanel) thanksPanel.classList.add('active');
                if (dot3) dot3.classList.replace('active', 'completed');

                // スクロール
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                throw new Error(result.message || '送信に失敗しました');
            }
        } catch (error) {
            // エラー時はボタンを戻す
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            alert('送信に失敗しました。お手数ですが、しばらく時間をおいて再度お試しください。');
            console.error('Form submission error:', error);
        }
    });
}

/* ----- カウントアップアニメーション ----- */
function initCountUp() {
    const counters = document.querySelectorAll('.achievement-number[data-count]');

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
