// ============================================
// スクロールアニメーション - 改善版
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // 一度アニメーションが実行されたら監視を停止
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ============================================
// 初期化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // コンテンツブロックのアニメーション設定
    const contentBlocks = document.querySelectorAll('.content-block[data-animate]');
    contentBlocks.forEach((block, index) => {
        block.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(block);
    });

    // ヒーローセクションのパララックス効果（軽量化）
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;
                    hero.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // CTAボタンのインタラクティブ効果
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        // マウス移動時の光の効果
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });

        // クリック時のリップル効果
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#register') {
                e.preventDefault();
                const target = href === '#' ? document.body : document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // スクロールインジケーターのクリック
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // パフォーマンス最適化: スクロールイベントのスロットリング
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // スクロール方向に応じた処理（必要に応じて）
            if (currentScroll > lastScrollTop) {
                // 下にスクロール
            } else {
                // 上にスクロール
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, 100);
    }, { passive: true });
});

// ============================================
// リサイズ時の最適化
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // リサイズ後の処理（必要に応じて）
    }, 250);
}, { passive: true });



