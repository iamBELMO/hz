// script.js - BELMO & TARIQ Website
document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

function initAll() {
    // 1. Preloader
    initPreloader();
    
    // 2. Navigation
    initNavigation();
    
    // 3. Theme Toggle
    initThemeToggle();
    
    // 4. Smooth Scroll
    initSmoothScroll();
    
    // 5. Counters Animation
    initCounters();
    
    // 6. Tabs System
    initTabs();
    
    // 7. Project Filter
    initProjectFilter();
    
    // 8. Contact Form
    initContactForm();
    
    // 9. Back to Top
    initBackToTop();
    
    // 10. Particles Background
    initParticles();
    
    // 11. Load Projects
    loadProjects();
    
    // 12. AI Assistant
    initAIAssistant();
    
    // 13. Design Challenge
    initDesignChallenge();
    
    // 14. Code Syntax Highlighting
    initCodeHighlighting();
    
    console.log('📍 BELMO & TARIQ Website Initialized Successfully!');
}

// 1. Preloader System
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (!preloader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Start particles after preloader
                setTimeout(() => {
                    if (window.particlesJS) {
                        particlesJS('particles-js', particleConfig);
                    }
                }, 500);
            }, 500);
        }
        
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${Math.round(progress)}%`;
    }, 50);
}

// 2. Navigation System
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileClose = document.getElementById('mobileClose');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Mobile Menu Toggle
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileClose && mobileNav) {
        mobileClose.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Active Link Highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Smooth scroll for anchor links
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            e.target !== navToggle) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 3. Theme Toggle System
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
        
        // Add transition effect
        document.body.classList.add('theme-changing');
        setTimeout(() => {
            document.body.classList.remove('theme-changing');
        }, 300);
    });
}

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (theme === 'dark') {
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
    } else {
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
    }
}

// 4. Smooth Scroll System
function initSmoothScroll() {
    // Hero scroll button
    const scrollIcon = document.querySelector('.scroll-icon');
    if (scrollIcon) {
        scrollIcon.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Counter Animation System
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => observer.observe(number));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// 6. Tabs System
function initTabs() {
    // About Section Tabs
    const aboutTabButtons = document.querySelectorAll('.tab-button');
    const aboutTabPanes = document.querySelectorAll('.tab-pane');
    
    aboutTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active button
            aboutTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding tab
            aboutTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${tabId}`) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Expertise Section Tabs
    const expertiseTabHeaders = document.querySelectorAll('.tab-header-item');
    const expertiseTabPanes = document.querySelectorAll('.tab-content-pane');
    
    expertiseTabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const tabId = header.getAttribute('data-tab');
            
            // Update active header
            expertiseTabHeaders.forEach(h => h.classList.remove('active'));
            header.classList.add('active');
            
            // Show corresponding tab
            expertiseTabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${tabId}-tab`) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// 7. Project Filter System
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectGrid = document.getElementById('projectsGrid');
    
    if (!filterButtons.length || !projectGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const categories = project.getAttribute('data-categories').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// 8. Contact Form System
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            showFormNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }
        
        // Simulate form submission
        showFormNotification('جاري إرسال رسالتك...', 'info');
        
        setTimeout(() => {
            showFormNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            contactForm.reset();
            
            // Add to local storage for demo
            saveContactRequest(formData);
        }, 2000);
    });
}

function validateForm(formData) {
    return formData.name && 
           formData.email && 
           formData.service && 
           formData.message;
}

function showFormNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#ff6b6b' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function saveContactRequest(formData) {
    let requests = JSON.parse(localStorage.getItem('contactRequests') || '[]');
    requests.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contactRequests', JSON.stringify(requests));
}

// 9. Back to Top System
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
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

// 10. Particles Background
function initParticles() {
    if (!window.particlesJS) return;
    
    // Configure particles
    window.particlesJS('particles-js', particleConfig);
}

const particleConfig = {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#64ffda" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
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
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
};

// 11. Projects Data
function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const projectsLoading = document.getElementById('projectsLoading');
    
    if (!projectsGrid) return;
    
    const projects = [
        {
            id: 1,
            title: "نظام توصيات ذكي",
            description: "نظام ذكاء اصطناعي متقدم لتوصية المنتجات باستخدام خوارزميات ML",
            category: "ai",
            technologies: ["Python", "TensorFlow", "React"],
            image: "project1"
        },
        {
            id: 2,
            title: "متجر إلكتروني متكامل",
            description: "متجر إلكتروني حديث مع نظام إدارة محتوى ودفع إلكتروني",
            category: "web ecommerce",
            technologies: ["React", "Node.js", "MongoDB"],
            image: "project2"
        },
        {
            id: 3,
            title: "هوية بصرية لشركة تكنولوجيا",
            description: "تصميم هوية بصرية متكاملة لشركة ناشئة في مجال التكنولوجيا",
            category: "design",
            technologies: ["Illustrator", "Figma", "Photoshop"],
            image: "project3"
        },
        {
            id: 4,
            title: "لوحة تحليل البيانات",
            description: "لوحة تحكم تفاعلية لتحليل وعرض البيانات والإحصائيات",
            category: "ai web",
            technologies: ["D3.js", "React", "Express"],
            image: "project4"
        },
        {
            id: 5,
            title: "تطبيق ويب تقدمي",
            description: "تطبيق ويب حديث يعمل دون اتصال مع إشعارات فورية",
            category: "web",
            technologies: ["PWA", "React", "Firebase"],
            image: "project5"
        },
        {
            id: 6,
            title: "تصميم شعارات احترافية",
            description: "مجموعة شعارات مبدعة لشركات مختلفة في مجالات متنوعة",
            category: "design",
            technologies: ["Illustrator", "Figma"],
            image: "project6"
        }
    ];
    
    // Simulate loading delay
    setTimeout(() => {
        if (projectsLoading) {
            projectsLoading.style.display = 'none';
        }
        
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }, 1500);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-categories', project.category);
    
    // Create card content
    card.innerHTML = `
        <div class="project-image" style="background: linear-gradient(135deg, #0a192f 0%, #112240 100%);">
            <div class="project-category">${getCategoryName(project.category.split(' ')[0])}</div>
            <div class="project-overlay">
                <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
        <div class="project-content">
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="#" class="project-link">
                <span>عرض المشروع</span>
                <i class="fas fa-arrow-left"></i>
            </a>
        </div>
    `;
    
    // Add animation
    setTimeout(() => {
        card.classList.add('visible');
    }, 100);
    
    return card;
}

function getCategoryName(category) {
    const categories = {
        ai: "ذكاء اصطناعي",
        web: "تطوير ويب",
        design: "تصميم",
        ecommerce: "متجر إلكتروني"
    };
    return categories[category] || category;
}

// 12. AI Assistant System
function initAIAssistant() {
    const aiInput = document.getElementById('aiInput');
    const btnSendAI = document.getElementById('btnSendAI');
    const btnVoice = document.getElementById('btnVoice');
    const chatMessages = document.getElementById('aiChatMessages');
    const quickActions = document.querySelectorAll('.quick-action');
    
    if (!chatMessages) return;
    
    // Send message on button click
    if (btnSendAI && aiInput) {
        btnSendAI.addEventListener('click', () => sendAIMessage(aiInput, chatMessages));
    }
    
    // Send message on Enter key
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAIMessage(aiInput, chatMessages);
            }
        });
    }
    
    // Voice input (simulated)
    if (btnVoice) {
        btnVoice.addEventListener('click', () => {
            simulateVoiceInput(aiInput);
        });
    }
    
    // Quick actions
    quickActions.forEach(action => {
        action.addEventListener('click', () => {
            const actionType = action.getAttribute('data-action');
            handleQuickAction(actionType, chatMessages);
        });
    });
}

function sendAIMessage(input, chatContainer) {
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user', chatContainer);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator(chatContainer);
    
    // Generate AI response after delay
    setTimeout(() => {
        removeTypingIndicator(chatContainer);
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai', chatContainer);
    }, 1500 + Math.random() * 1000);
}

function addChatMessage(text, sender, container) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const time = new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${formatMessage(text)}</p>
        </div>
        <div class="message-time">${time}</div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function formatMessage(text) {
    // Simple formatting for code snippets
    return text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
}

function showTypingIndicator(container) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function generateAIResponse(message) {
    const responses = {
        design: [
            "أقترح استخدام تصميم بسيط وأنيق مع ألوان متدرجة. جرب استخدام الظلال والتأثيرات ثلاثية الأبعاد لإضافة عمق للتصميم.",
            "للشعارات الحديثة، أنصح باستخدام الأشكال الهندسية البسيطة مع تدرجات الألوان. تأكد من أن الشعار يعمل بشكل جيد في الأحجام الصغيرة.",
            "تصميم UI ناجح يحتاج إلى: 1) تسلسل بصري واضح 2) ألوان متناسقة 3) مسافات مناسبة 4) تأثيرات حركية بسيطة."
        ],
        code: [
            "```javascript\n// نموذج كود زر بتأثيرات CSS\n.btn-modern {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 12px 30px;\n  border-radius: 25px;\n  transition: all 0.3s ease;\n}\n\n.btn-modern:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.2);\n}\n```",
            "لتحسين أداء موقعك: 1) استخدم lazy loading للصور 2) قلل حجم الملفات 3) استخدم CDN 4) فعالّ خدمة worker."
        ],
        color: [
            "لوحة ألوان حديثة: #0a192f (خلفية), #64ffda (لون أساسي), #ccd6f6 (نص), #8892b0 (نص ثانوي), #ff6b6b (تمييز)",
            "تدرج ألوان مناسب للعلامات التجارية: أزرق داكن (#0d1b2a) مع أخضر فاتح (#83e377) ورمادي (#e0e1dd)."
        ],
        idea: [
            "فكرة مشروع: منصة تعليمية تفاعلية تستخدم الذكاء الاصطناعي لتخصيص المحتوى التعليمي لكل طالب.",
            "لماذا لا تطور تطبيقاً يجمع بين الواقع المعزز والتصميم ثلاثي الأبعاد لتصميم المنازل؟"
        ]
    };
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('تصميم') || lowerMessage.includes('شكل') || lowerMessage.includes('شعار')) {
        return getRandomResponse(responses.design);
    } else if (lowerMessage.includes('كود') || lowerMessage.includes('برمجة') || lowerMessage.includes('برمج')) {
        return getRandomResponse(responses.code);
    } else if (lowerMessage.includes('لون') || lowerMessage.includes('ألوان') || lowerMessage.includes('لوحة')) {
        return getRandomResponse(responses.color);
    } else if (lowerMessage.includes('فكرة') || lowerMessage.includes('مشروع') || lowerMessage.includes('اقتراح')) {
        return getRandomResponse(responses.idea);
    } else {
        return "أهلاً! أنا مساعد BELMO الذكي. يمكنني مساعدتك في:\n• كتابة أكواد برمجية\n• اقتراح تصاميم وألوان\n• تقديم أفكار مشاريع\n• حل مشاكل برمجية\nكيف يمكنني مساعدتك اليوم؟";
    }
}

function getRandomResponse(responsesArray) {
    return responsesArray[Math.floor(Math.random() * responsesArray.length)];
}

function simulateVoiceInput(input) {
    const voiceMessages = [
        "أريد تصميم شعار عصري لشركة تكنولوجيا",
        "اكتب لي كود زر جميل بتأثيرات CSS",
        "اقترح لي ألوان لموقع تعليمي",
        "أعطني فكرة مشروع مبتكرة"
    ];
    
    const randomMessage = voiceMessages[Math.floor(Math.random() * voiceMessages.length)];
    
    // Simulate typing effect
    input.value = '';
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < randomMessage.length) {
            input.value += randomMessage.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            // Auto-send after typing
            setTimeout(() => {
                const event = new KeyboardEvent('keypress', { key: 'Enter' });
                input.dispatchEvent(event);
            }, 500);
        }
    }, 50);
}

function handleQuickAction(action, chatContainer) {
    const prompts = {
        design: "أريد تصميم واجهة مستخدم حديثة لتطبيق جوال، ما هي أفضل الممارسات؟",
        code: "اكتب لي كود نموذج تسجيل دخول باستخدام React و Tailwind CSS",
        color: "اقترح لي لوحة ألوان لموقع ويب تعليمي للأطفال",
        idea: "أعطني فكرة مشروع يجمع بين الذكاء الاصطناعي والتصميم الجرافيكي"
    };
    
    const prompt = prompts[action];
    if (prompt) {
        // Add user message
        addChatMessage(prompt, 'user', chatContainer);
        
        // Show typing indicator
        showTypingIndicator(chatContainer);
        
        // Generate AI response
        setTimeout(() => {
            removeTypingIndicator(chatContainer);
            const response = generateAIResponse(prompt);
            addChatMessage(response, 'ai', chatContainer);
        }, 1500);
    }
}

// 13. Design Challenge System
function initDesignChallenge() {
    const canvas = document.getElementById('designCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let currentTool = 'pen';
    let currentColor = '#64ffda';
    let lineWidth = 2;
    
    // Set canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Drawing functions
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = getMousePos(canvas, e);
    });
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const [x, y] = getMousePos(canvas, e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    });
    
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    
    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        [lastX, lastY] = getTouchPos(canvas, touch);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const touch = e.touches[0];
        const [x, y] = getTouchPos(canvas, touch);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    });
    
    canvas.addEventListener('touchend', () => isDrawing = false);
    
    // Tool selection
    document.querySelectorAll('.tool').forEach(tool => {
        tool.addEventListener('click', () => {
            document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            currentTool = tool.getAttribute('data-tool');
            
            switch(currentTool) {
                case 'pen':
                    currentColor = '#64ffda';
                    lineWidth = 2;
                    break;
                case 'shapes':
                    // Draw a simple shape
                    drawShape(ctx, canvas);
                    break;
                case 'gradient':
                    // Create gradient effect
                    createGradient(ctx, canvas);
                    break;
            }
        });
    });
    
    // Canvas controls
    document.getElementById('btnClearCanvas')?.addEventListener('click', () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    document.getElementById('btnSaveCanvas')?.addEventListener('click', () => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'تصميم-الشعار.png';
        link.href = dataUrl;
        link.click();
        showFormNotification('تم حفظ التصميم بنجاح!', 'success');
    });
    
    // Timer system
    let timerInterval;
    let minutes = 5;
    let seconds = 0;
    
    document.getElementById('btnStartTimer')?.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    });
    
    document.getElementById('btnPauseTimer')?.addEventListener('click', () => {
        clearInterval(timerInterval);
    });
    
    document.getElementById('btnResetTimer')?.addEventListener('click', () => {
        clearInterval(timerInterval);
        minutes = 5;
        seconds = 0;
        updateTimerDisplay();
    });
    
    function updateTimer() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                showFormNotification('انتهى الوقت! هل انتهيت من تصميم الشعار؟', 'info');
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }
    
    function updateTimerDisplay() {
        const timerMinutes = document.getElementById('timerMinutes');
        const timerSeconds = document.getElementById('timerSeconds');
        
        if (timerMinutes) timerMinutes.textContent = minutes.toString().padStart(2, '0');
        if (timerSeconds) timerSeconds.textContent = seconds.toString().padStart(2, '0');
    }
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return [
        evt.clientX - rect.left,
        evt.clientY - rect.top
    ];
}

function getTouchPos(canvas, touch) {
    const rect = canvas.getBoundingClientRect();
    return [
        touch.clientX - rect.left,
        touch.clientY - rect.top
    ];
}

function drawShape(ctx, canvas) {
    const shapes = ['circle', 'square', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;
    const size = 50;
    
    ctx.fillStyle = getRandomColor();
    
    switch(shape) {
        case 'circle':
            ctx.beginPath();
            ctx.arc(x, y, size/2, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'square':
            ctx.fillRect(x - size/2, y - size/2, size, size);
            break;
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(x, y - size/2);
            ctx.lineTo(x - size/2, y + size/2);
            ctx.lineTo(x + size/2, y + size/2);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

function createGradient(ctx, canvas) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(0.5, getRandomColor());
    gradient.addColorStop(1, getRandomColor());
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    const colors = ['#64ffda', '#ff6b6b', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 14. Code Syntax Highlighting
function initCodeHighlighting() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Simple syntax highlighting for JavaScript
        let code = block.textContent;
        
        // Highlight keywords
        const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            code = code.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        code = code.replace(/["']([^"']*)["']/g, '<span class="string">"$1"</span>');
        
        // Highlight comments
        code = code.replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
        
        // Highlight numbers
        code = code.replace(/\b\d+\b/g, '<span class="number">$&</span>');
        
        block.innerHTML = code;
    });
}

// Initialize everything
window.addEventListener('load', initAll);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
