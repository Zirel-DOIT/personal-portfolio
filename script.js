// 平滑滚动功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 为每个导航链接添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 阻止默认跳转行为
            
            // 获取目标section的ID
            const targetId = this.getAttribute('href');
            
            // 如果链接是#开头（内部锚点链接）
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // 使用平滑滚动到目标section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // 更新URL哈希（可选）
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // 为英雄区域的呼叫行动按钮也添加平滑滚动
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.pushState(null, null, targetId);
            }
        });
    }
});

// 添加滚动时的导航栏样式变化（可选增强功能）
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'rgba(51, 51, 51, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#333';
        header.style.backdropFilter = 'none';
    }
});

// 移动端菜单切换功能（可选增强功能）
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    const nav = document.querySelector('nav');
    nav.appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });
    
    // 在移动端显示菜单切换按钮
    function checkMobile() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            document.querySelector('.nav-links').style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            document.querySelector('.nav-links').style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkMobile);
    checkMobile();
}

// 初始化移动端菜单（如果需要可以取消注释）
// initMobileMenu();
