document.addEventListener('DOMContentLoaded', () => {
    // スクロールエフェクトを削除し、常に表示された状態で軽量なエフェクトを適用

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTAボタンのパルスアニメーション（定期的に）
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.animation = 'pulse 2s ease-in-out';
        }, 5000);
    });


    // アイドル画像は常に表示され、軽量なアニメーションのみ適用
    const floatingGirls = document.querySelectorAll('.floating-girl');
    floatingGirls.forEach((girl) => {
        girl.style.opacity = '1';
        girl.style.transform = 'translateY(0) scale(1)';
    });
});

// パルスアニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 10px 40px rgba(233, 30, 99, 0.4);
        }
        50% {
            box-shadow: 0 10px 40px rgba(233, 30, 99, 0.4), 0 0 0 8px rgba(233, 30, 99, 0.2);
        }
    }
`;
document.head.appendChild(style);



