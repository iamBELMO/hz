    // JavaScript ضخم ومعقد للغاية للموقع

document.addEventListener('DOMContentLoaded', function() {
    console.log('موقع BELMO & TARIQ - جاري التحميل...');
    
    // تهيئة جميع المكونات
    initPreloader();
    initParticles();
    initTheme();
    initNavigation();
    initTabs();
    initCounters();
    initProjects();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initAnimations();
    
    console.log('جميع المكونات جاهزة!');
});

// ==================== Preloader ====================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.style.overflow = 'auto';
                
                // إطلاق بعض الرسوم المتحركة بعد التحميل
                setTimeout(() => {
                    document.querySelectorAll('.animate-on-load').forEach(el => {
                        el.classList.add('animated');
                    });
                }, 300);
            }, 500);
        }
    }, 100);
}

// ==================== Particle Background ====================
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#64ffda"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64ffda",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ==================== Theme Toggle ====================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // التحقق من تفضيلات المستخدم
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // تطبيق السمة المحفوظة أو تفضيل النظام
    if (savedTheme === 'light' || (!savedTheme && !prefersDarkScheme.matches)) {
        body.setAttribute('data-theme', 'light');
    }
    
    // تبديل السمة
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // تأثيرات بصرية إضافية
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// ==================== Navigation ====================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // تبديل القائمة الجوالة
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // إغلاق القائمة الجوالة
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // تحديث الروابط النشطة
            mobileLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // تحديث روابط التنقل الرئيسية
            const navId = link.getAttribute('href')?.substring(1);
            if (navId) {
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${navId}`) {
                        navLink.classList.add('active');
                    } else {
                        navLink.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // تحديث الروابط النشطة عند التمرير
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==================== Tabs ====================
function initTabs() {
    // تبويبات "من نحن"
    const aboutTabButtons = document.querySelectorAll('.tab-button');
    const aboutTabPanes = document.querySelectorAll('.tab-pane');
    
    aboutTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // تحديث الأزرار النشطة
            aboutTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // تحديد المحتوى النشط
            aboutTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${tabId}`) {
                    pane.classList.add('active');
                }
            });
            
            // تأثيرات بصرية
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // تبويبات "خبراتنا"
    const expertiseTabHeaders = document.querySelectorAll('.tab-header-item');
    const expertiseTabPanes = document.querySelectorAll('.tab-content-pane');
    
    expertiseTabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tabId = header.getAttribute('data-tab');
            
            // تحديد الرؤوس النشطة
            expertiseTabHeaders.forEach(h => h.classList.remove('active'));
            header.classList.add('active');
            
            // تحديد المحتوى النشط
            expertiseTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
            
            // تأثيرات بصرية
            header.style.transform = 'scale(0.95)';
            setTimeout(() => {
                header.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==================== Counters ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const startCounting = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const count = parseInt(element.innerText);
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            element.innerText = count + increment;
            setTimeout(() => startCounting(element), 10);
        } else {
            element.innerText = target;
        }
    };
    
    // بدء العد عند التمرير إلى القسم
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    startCounting(counter);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// ==================== Projects ====================
function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsLoading = document.getElementById('projectsLoading');
    
    if (!projectsGrid) return;
    
    // بيانات المشاريع (يمكن جلبها من ملف JSON)
    const projects = [
        {
            id: 1,
            title: "نظام توصيات ذكي للتجارة الإلكترونية",
            description: "نظام ذكاء اصطناعي يقدم توصيات منتجات مخصصة بناءً على سلوك المستخدم وتفضيلاته.",
            category: "ai",
            tech: ["Python", "TensorFlow", "React", "Node.js"],
            image: "ai-project-1"
        },
        {
            id: 2,
            title: "منصة تعليمية تفاعلية",
            description: "منصة تعليمية متكاملة مع واجهة مستخدم جذابة ونظام إدارة محتوى متقدم.",
            category: "web",
            tech: ["JavaScript", "React", "MongoDB", "Express"],
            image: "web-project-1"
        },
        {
            id: 3,
            title: "هوية بصرية لمطعم راقي",
            description: "تصميم هوية بصرية متكاملة تشمل الشعار والمواد التسويقية وتصميم الموقع.",
            category: "design",
            tech: ["Adobe Illustrator", "Photoshop", "Figma"],
            image: "design-project-1"
        },
        {
            id: 4,
            title: "متجر إلكتروني متقدم",
            description: "متجر إلكتروني سريع الاستجابة مع نظام دفع آمن وإدارة مخزون ذكية.",
            category: "ecommerce",
            tech: ["React", "Node.js", "MongoDB", "Stripe API"],
            image: "ecommerce-project-1"
        },
        {
            id: 5,
            title: "لوحة تحليل بيانات الأعمال",
            description: "لوحة تحكم تفاعلية تعرض مؤشرات الأداء الرئيسية باستخدام الرسوم البيانية المتقدمة.",
            category: "ai",
            tech: ["Python", "D3.js", "React", "FastAPI"],
            image: "ai-project-2"
        },
        {
            id: 6,
            title: "موقع شركة تكنولوجيا",
            description: "موقع شركة حديث مع تصميم جرافيكي متميز وتجربة مستخدم محسنة.",
            category: "web",
            tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
            image: "web-project-2"
        },
        {
            id: 7,
            title: "تطبيق ويب تقدمي للأخبار",
            description: "تطبيق ويب يعمل دون اتصال مع ميزات إشعارات فنية وتحديثات تلقائية.",
            category: "web",
            tech: ["PWA", "React", "Service Workers", "IndexedDB"],
            image: "web-project-3"
        },
        {
            id: 8,
            title: "حملة إعلانية متكاملة",
            description: "تصميم مواد إعلانية متكاملة لمنتج جديد يشمل فيديو ورسوم متحركة.",
            category: "design",
            tech: ["After Effects", "Illustrator", "Premiere Pro"],
            image: "design-project-2"
        }
    ];
    
    // عرض المشاريع
    function displayProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        const filteredProjects = filter === 'all' 
            ? projects 
            : projects.filter(project => project.category === filter);
        
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <div class="project-category">${getCategoryName(project.category)}</div>
                </div>
                <div class="project-content">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="#" class="project-link">
                        <span>عرض المشروع</span>
                        <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            `;
            
            // إضافة تأثيرات بصرية للصورة حسب الفئة
            const projectImage = projectCard.querySelector('.project-image');
            projectImage.style.background = getProjectGradient(project.category);
            
            projectsGrid.appendChild(projectCard);
        });
        
        // إخفاء مؤشر التحميل
        if (projectsLoading) {
            projectsLoading.style.display = 'none';
        }
        
        // إضافة تأثير الظهور
        setTimeout(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('visible');
            });
        }, 100);
    }
    
    // وظائف مساعدة
    function getCategoryName(category) {
        const categories = {
            'ai': 'ذكاء اصطناعي',
            'web': 'تطوير ويب',
            'design': 'تصميم جرافيكي',
            'ecommerce': 'متجر إلكتروني'
        };
        return categories[category] || category;
    }
    
    function getProjectGradient(category) {
        const gradients = {
            'ai': 'linear-gradient(135deg, #64ffda 0%, #52d1b2 100%)',
            'web': 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
            'design': 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
            'ecommerce': 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)'
        };
        return gradients[category] || 'var(--gradient-primary)';
    }
    
    // تهيئة المشاريع
    displayProjects();
    
    // إضافة معالجات الأحداث لأزرار الفلترة
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // تحديث الأزرار النشطة
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // عرض المشاريع المصفاة
            displayProjects(filter);
            
            // تأثيرات بصرية
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ==================== Contact Form ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // الحصول على بيانات النموذج
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // التحقق من صحة البيانات
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // محاكاة إرسال النموذج
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // في الواقع، هنا سيتم إرسال البيانات إلى الخادم
            console.log('تم إرسال النموذج:', formData);
            
            // إظهار رسالة النجاح
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // إعادة تعيين النموذج
            contactForm.reset();
            
            // استعادة حالة الزر
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // تأثيرات حقول الإدخال
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function showNotification(message, type) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إضافة حدث الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ==================== Scroll Effects ====================
function initScrollEffects() {
    // إضافة تأثيرات الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر التي تحتوي على تأثير الظهور
    const scrollElements = document.querySelectorAll('.team-member, .service-card, .showcase-item, .timeline-item, .benefit-item');
    scrollElements.forEach(el => observer.observe(el));
    
    // تأثير التعتيم للهيدر عند التمرير
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                header.style.boxShadow = 'var(--shadow-md)';
            } else {
                header.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// ==================== Back to Top ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== Animations ====================
function initAnimations() {
    // رسوم متحركة للعناصر العائمة
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        // إضافة تأخيرات مختلفة لكل شكل
        shape.style.animationDelay = `${index * 2}s`;
    });
    
    // تأثير الكتابة للنص في التيرمينال
    const terminalCode = document.querySelector('.terminal-body code');
    if (terminalCode) {
        const originalCode = terminalCode.textContent;
        terminalCode.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalCode.length) {
                terminalCode.textContent += originalCode.charAt(i);
                i++;
                setTimeout(typeWriter, 10);
            }
        }
        
    // بدء تأثير الكتابة عند التمرير إلى القسم
    const terminalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                terminalObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    terminalObserver.observe(document.querySelector('.code-terminal'));
    }
    
    // تأثيرات اهتزاز للأيقونات
    const icons = document.querySelectorAll('.service-icon, .showcase-icon, .benefit-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'shake 0.5s ease';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
    
    // إضافة CSS للاهتزاز
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: var(--text-primary);
            padding: 15px 20px;
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            border-left: 4px solid var(--accent-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: var(--success-color);
        }
        
        .notification.error {
            border-left-color: var(--highlight-color);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        .notification.success .notification-content i {
            color: var(--success-color);
        }
        
        .notification.error .notification-content i {
            color: var(--highlight-color);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 5px;
            margin-right: 10px;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
        
        .form-group.focused label {
            color: var(--accent-color);
        }
        
        .in-view {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);
}

// ==================== Window Load Event ====================
window.addEventListener('load', function() {
    // تحديث الأحجام بعد تحميل جميع الصور
    setTimeout(() => {
        // تحديث أرقام العد
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            if (counter.textContent === '0') {
                counter.textContent = counter.getAttribute('data-count');
            }
        });
    }, 1000);
    
    // إضافة تأثيرات إضافية بعد التحميل الكامل
    document.body.classList.add('fully-loaded');
    // Design Generator Functionality
class DesignGenerator {
    constructor() {
        this.designs = [];
        this.currentDesign = null;
        this.init();
    }
    
    init() {
        this.generateDesignPalettes();
        this.bindEvents();
        this.generateRandomDesign();
    }
    
    generateColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 70 + Math.floor(Math.random() * 30);
        const lightness = 30 + Math.floor(Math.random() * 40);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    generateDarkColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 60 + Math.floor(Math.random() * 30);
        const lightness = 10 + Math.floor(Math.random() * 20);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    generateLightColor() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = 40 + Math.floor(Math.random() * 30);
        const lightness = 70 + Math.floor(Math.random() * 25);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
    
    generateDesignPalettes() {
        for (let i = 0; i < 50; i++) {
            const palette = {
                id: i + 1,
                primary: this.generateColor(),
                secondary: this.generateColor(),
                accent: this.generateColor(),
                background: this.generateDarkColor(),
                text: this.generateLightColor(),
                cardBg: this.generateDarkColor(),
                headerBg: this.generateColor(),
                buttonBg: this.generateColor(),
                footerBg: this.generateDarkColor()
            };
            this.designs.push(palette);
        }
    }
    
    bindEvents() {
        document.querySelector('.btn-generate')?.addEventListener('click', () => {
            this.generateRandomDesign();
            this.showNotification('تم توليد تصميم جديد بنجاح!', 'success');
        });
        
        document.querySelector('.btn-save')?.addEventListener('click', () => {
            this.saveCurrentDesign();
        });
        
        document.querySelector('.btn-randomize')?.addEventListener('click', () => {
            this.randomizeColors();
            this.showNotification('تم خلط الألوان عشوائياً!', 'info');
        });
        
        document.querySelector('.btn-reset')?.addEventListener('click', () => {
            this.resetToDefault();
            this.showNotification('تم إعادة التعيين إلى التصميم الأساسي', 'info');
        });
        
        document.querySelector('#btnCopyCSS')?.addEventListener('click', () => {
            this.copyCSSToClipboard();
        });
        
        document.querySelectorAll('.color-box').forEach(box => {
            box.addEventListener('click', (e) => {
                const colorType = e.target.id.replace('color', '').toLowerCase();
                this.promptColorChange(colorType);
            });
        });
    }
    
    generateRandomDesign() {
        const randomIndex = Math.floor(Math.random() * this.designs.length);
        this.currentDesign = this.designs[randomIndex];
        this.applyDesign(this.currentDesign);
        this.updateDesignId(randomIndex + 1);
        this.generateCSSCode();
    }
    
    applyDesign(design) {
        document.getElementById('colorPrimary').style.backgroundColor = design.primary;
        document.getElementById('colorSecondary').style.backgroundColor = design.secondary;
        document.getElementById('colorAccent').style.backgroundColor = design.accent;
        document.getElementById('colorBackground').style.backgroundColor = design.background;
        document.getElementById('colorText').style.backgroundColor = design.text;
        
        document.getElementById('valuePrimary').textContent = this.rgbToHex(design.primary);
        document.getElementById('valueSecondary').textContent = this.rgbToHex(design.secondary);
        document.getElementById('valueAccent').textContent = this.rgbToHex(design.accent);
        document.getElementById('valueBackground').textContent = this.rgbToHex(design.background);
        document.getElementById('valueText').textContent = this.rgbToHex(design.text);
        
        const card = document.getElementById('designCard');
        const header = document.getElementById('cardHeader');
        const body = document.getElementById('cardBody');
        const footer = document.getElementById('cardFooter');
        const button = document.getElementById('designBtn');
        
        card.style.backgroundColor = design.cardBg;
        card.style.color = design.text;
        header.style.backgroundColor = design.headerBg;
        header.style.color = this.getContrastColor(design.headerBg);
        body.style.backgroundColor = design.background;
        footer.style.backgroundColor = design.footerBg;
        footer.style.color = design.text;
        button.style.backgroundColor = design.buttonBg;
        button.style.color = this.getContrastColor(design.buttonBg);
        button.style.borderColor = design.accent;
    }
    
    updateDesignId(id) {
        document.getElementById('designId').textContent = id;
    }
    
    randomizeColors() {
        if (!this.currentDesign) return;
        
        this.currentDesign.primary = this.generateColor();
        this.currentDesign.secondary = this.generateColor();
        this.currentDesign.accent = this.generateColor();
        this.currentDesign.background = this.generateDarkColor();
        this.currentDesign.text = this.generateLightColor();
        this.currentDesign.cardBg = this.generateDarkColor();
        this.currentDesign.headerBg = this.generateColor();
        this.currentDesign.buttonBg = this.generateColor();
        this.currentDesign.footerBg = this.generateDarkColor();
        
        this.applyDesign(this.currentDesign);
        this.generateCSSCode();
    }
    
    resetToDefault() {
        const defaultDesign = {
            primary: '#64ffda',
            secondary: '#112240',
            accent: '#ff6b6b',
            background: '#0a192f',
            text: '#ccd6f6',
            cardBg: '#112240',
            headerBg: '#0a192f',
            buttonBg: '#64ffda',
            footerBg: '#0a192f'
        };
        
        this.currentDesign = defaultDesign;
        this.applyDesign(defaultDesign);
        this.updateDesignId(0);
        this.generateCSSCode();
    }
    
    saveCurrentDesign() {
        if (!this.currentDesign) return;
        
        const savedList = document.getElementById('savedDesigns');
        const emptyState = savedList.querySelector('.empty-state');
        
        if (emptyState) {
            emptyState.remove();
        }
        
        const savedItem = document.createElement('div');
        savedItem.className = 'saved-item';
        savedItem.innerHTML = `
            <div class="saved-colors">
                <div class="mini-color" style="background: ${this.currentDesign.primary}"></div>
                <div class="mini-color" style="background: ${this.currentDesign.secondary}"></div>
                <div class="mini-color" style="background: ${this.currentDesign.accent}"></div>
                <div class="mini-color" style="background: ${this.currentDesign.background}"></div>
            </div>
            <div class="saved-info">
                <span class="saved-title">تصميم #${this.currentDesign.id || 'مخصص'}</span>
                <span class="saved-date">${new Date().toLocaleDateString('ar-EG')}</span>
            </div>
            <button class="btn-apply" title="تطبيق التصميم">
                <i class="fas fa-check"></i>
            </button>
            <button class="btn-delete" title="حذف التصميم">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        savedList.appendChild(savedItem);
        
        savedItem.querySelector('.btn-apply').addEventListener('click', () => {
            this.applyDesign(this.currentDesign);
            this.showNotification('تم تطبيق التصميم المحفوظ!', 'success');
        });
        
        savedItem.querySelector('.btn-delete').addEventListener('click', () => {
            savedItem.remove();
            this.showNotification('تم حذف التصميم المحفوظ', 'info');
        });
        
        this.showNotification('تم حفظ التصميم بنجاح!', 'success');
    }
    
    generateCSSCode() {
        if (!this.currentDesign) return;
        
        const cssCode = `
/* كود CSS المُولد تلقائياً */
:root {
  --primary-color: ${this.currentDesign.primary};
  --secondary-color: ${this.currentDesign.secondary};
  --accent-color: ${this.currentDesign.accent};
  --background-color: ${this.currentDesign.background};
  --text-color: ${this.currentDesign.text};
}

.design-card {
  background-color: ${this.currentDesign.cardBg};
  color: ${this.currentDesign.text};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card-header {
  background-color: ${this.currentDesign.headerBg};
  color: ${this.getContrastColor(this.currentDesign.headerBg)};
  padding: 20px;
  border-bottom: 2px solid var(--accent-color);
}

.design-btn {
  background-color: ${this.currentDesign.buttonBg};
  color: ${this.getContrastColor(this.currentDesign.buttonBg)};
  border: 2px solid ${this.currentDesign.accent};
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.design-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-footer {
  background-color: ${this.currentDesign.footerBg};
  color: ${this.currentDesign.text};
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
        `;
        
        document.getElementById('generatedCSS').textContent = cssCode;
    }
    
    copyCSSToClipboard() {
        const cssCode = document.getElementById('generatedCSS').textContent;
        navigator.clipboard.writeText(cssCode).then(() => {
            this.showNotification('تم نسخ كود CSS إلى الحافظة!', 'success');
        }).catch(err => {
            console.error('فشل نسخ النص: ', err);
            this.showNotification('فشل نسخ الكود، حاول مرة أخرى', 'error');
        });
    }
    
    promptColorChange(colorType) {
        const currentColor = this.currentDesign[colorType];
        const newColor = prompt(`أدخل لوناً جديداً لـ ${colorType} (HEX أو اسم اللون):`, currentColor);
        
        if (newColor && /^#[0-9A-F]{6}$/i.test(newColor) || /^[a-z]+$/i.test(newColor)) {
            this.currentDesign[colorType] = newColor;
            this.applyDesign(this.currentDesign);
            this.generateCSSCode();
            this.showNotification(`تم تغيير لون ${colorType} بنجاح!`, 'success');
        }
    }
    
    rgbToHex(rgb) {
        if (rgb.startsWith('#')) return rgb;
        
        if (rgb.startsWith('hsl')) {
            const match = rgb.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (match) {
                const h = parseInt(match[1]);
                const s = parseInt(match[2]);
                const l = parseInt(match[3]);
                return this.hslToHex(h, s, l);
            }
        }
        
        return rgb;
    }
    
    hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    
    getContrastColor(hexColor) {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 128 ? '#000000' : '#ffffff';
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `design-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                 type === 'error' ? 'exclamation-circle' : 
                                 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// تهيئة مُولد التصاميم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#design-generator')) {
        new DesignGenerator();
    }
});
});