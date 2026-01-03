// スクロールアニメーション
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // セクション要素にアニメーションを適用
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // ヒーローセクション以外
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
            observer.observe(section);
        }
    });

    // 問題リストアイテム
    const problemItems = document.querySelectorAll('.problem-item');
    problemItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });

    // レシピグリッドアイテム
    const recipeItems = document.querySelectorAll('.recipe-item');
    recipeItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`;
        observer.observe(item);
    });

    // 詳細リストアイテム
    const detailItems = document.querySelectorAll('.detail-list li');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(item);
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

    // CTAボタンのパルスアニメーション（定期的に）
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.animation = 'pulse 2s ease-in-out';
        }, 5000);
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



