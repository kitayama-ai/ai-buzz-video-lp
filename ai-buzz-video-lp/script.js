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

    // ファーストビュー画像のマウス追従効果
    const heroImage = document.querySelector('.hero-main-image');
    const heroSection = document.querySelector('.hero');
    
    if (heroImage && heroSection) {
        heroImage.classList.add('mouse-follow');
        
        let animationId = null;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // マウス位置から中心への距離に基づいて動きを計算
            targetX = ((e.clientX - centerX) / rect.width) * 15; // -15px to 15px
            targetY = ((e.clientY - centerY) / rect.height) * 15; // -15px to 15px
            
            if (!animationId) {
                const animate = () => {
                    // スムーズな追従（イージング）
                    currentX += (targetX - currentX) * 0.1;
                    currentY += (targetY - currentY) * 0.1;
                    
                    // 浮遊アニメーションと組み合わせ
                    const floatY = Math.sin(Date.now() / 2000) * 8;
                    heroImage.style.transform = `translate(${currentX}px, ${currentY + floatY}px) scale(1.01)`;
                    
                    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
                        animationId = requestAnimationFrame(animate);
                    } else {
                        animationId = null;
                    }
                };
                animate();
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
            const reset = () => {
                currentX += (targetX - currentX) * 0.1;
                currentY += (targetY - currentY) * 0.1;
                const floatY = Math.sin(Date.now() / 2000) * 8;
                heroImage.style.transform = `translate(${currentX}px, ${currentY + floatY}px) scale(1)`;
                
                if (Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
                    requestAnimationFrame(reset);
                } else {
                    heroImage.style.transform = '';
                }
            };
            reset();
        });
    }

    // スクロール時に女の子が登場するアニメーション
    const floatingGirls = document.querySelectorAll('.floating-girl');
    floatingGirls.forEach((girl, index) => {
        girl.style.opacity = '0';
        girl.style.transform = 'translateY(100px) scale(0.8)';
        girl.style.transition = `opacity 1s ease-out ${index * 0.2}s, transform 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2}s`;
        
        const girlObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.3 });
        
        girlObserver.observe(girl);
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



