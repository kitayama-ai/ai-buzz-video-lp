// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// コンテンツブロックにアニメーションを適用
document.addEventListener('DOMContentLoaded', () => {
    const contentBlocks = document.querySelectorAll('.content-block');
    contentBlocks.forEach(block => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(40px)';
        block.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(block);
    });

    // ヒーローセクションのパララックス効果
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // CTAボタンのパルスアニメーション
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.animation = 'pulse 2s ease-in-out';
        }, 5000);
    });
});

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



