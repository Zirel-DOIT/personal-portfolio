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

// 添加滚动时的导航栏样式变化
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
    
    // 导航链接滚动高亮功能
    highlightActiveNavLink();
});

// 导航链接滚动高亮功能
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';
    
    // 获取当前可见的section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // 为对应的导航链接添加active类
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 页面加载时也执行一次高亮
document.addEventListener('DOMContentLoaded', function() {
    highlightActiveNavLink();
    
    // 初始化主题切换功能
    initThemeToggle();
    
    // 初始化滚动动画
    initScrollAnimation();
});

// 滚动动画功能
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    // 检查元素是否在视口中
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // 当元素进入视口时添加动画类
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 从localStorage获取用户主题偏好
    const savedTheme = localStorage.getItem('theme');
    
    // 设置初始主题
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }
    
    // 主题切换按钮点击事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // 切换主题
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // 更新按钮图标
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // 保存用户选择到localStorage
        localStorage.setItem('theme', newTheme);
    });
    
    // 监听系统主题变化
    prefersDarkScheme.addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    });
}

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
