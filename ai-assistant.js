// ai-assistant.js
class AIAssistant {
    constructor() {
        this.messages = [];
        this.isListening = false;
        this.recognition = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAIResponses();
        this.initSpeechRecognition();
    }

    setupEventListeners() {
        document.getElementById('btnSendAI')?.addEventListener('click', () => this.sendMessage());
        document.getElementById('aiInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        document.getElementById('btnVoice')?.addEventListener('click', () => this.toggleVoiceInput());
        
        // Quick actions
        document.querySelectorAll('.quick-action').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'ar-SA';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('aiInput').value = transcript;
                this.sendMessage();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showNotification('حدث خطأ في التعرف على الصوت', 'error');
            };
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.showNotification('متصفحك لا يدعم التعرف على الصوت', 'error');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            document.getElementById('btnVoice').innerHTML = '<i class="fas fa-microphone"></i>';
            this.showNotification('تم إيقاف الاستماع', 'info');
        } else {
            this.recognition.start();
            this.isListening = true;
            document.getElementById('btnVoice').innerHTML = '<i class="fas fa-microphone-slash"></i>';
            this.showNotification('جاري الاستماع... تحدث الآن', 'info');
        }
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const message = input.value.trim();
        
        if (!message) return;

        // إضافة رسالة المستخدم
        this.addMessage(message, 'user');
        input.value = '';

        // محاكاة معالجة الذكاء الاصطناعي
        this.showTypingIndicator();
        
        // تأخير لمحاكاة معالجة الذكاء الاصطناعي
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.generateAIResponse(message);
            this.addMessage(response, 'ai');
            this.speakResponse(response);
        }, 1500 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('aiChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${time}</div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // حفظ الرسالة
        this.messages.push({ text, sender, time });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('aiChatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'message ai-message';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    loadAIResponses() {
        this.responses = {
            greetings: [
                "مرحباً! أنا مساعد BELMO الذكي. كيف يمكنني مساعدتك اليوم؟",
                "أهلاً وسهلاً! أنا هنا لمساعدتك في التصميم والبرمجة.",
                "مرحباً بك! أنا مساعد الذكاء الاصطناعي الخاص بـ BELMO."
            ],
            design: [
                "أقترح استخدام ألوان داكنة مع لمسات من الأزرق الكهربائي لتبدو حديثة.",
                "جرب تصميم بسيط وأنيق مع مساحات بيضاء واسعة.",
                "لماذا لا تجرب تدرجات الألوان مع تأثيرات الشفافية؟"
            ],
            code: [
                "```javascript\n// نموذج لكود JavaScript حديث\nconst innovativeCode = {\n  features: ['ES6+', 'Async/Await', 'Modules'],\n  tools: ['React', 'Node.js', 'Webpack']\n};\n```",
                "جرب استخدام TypeScript لتحسين جودة الكود وتقليل الأخطاء.",
                "أقترح استخدام React مع Next.js لتطبيقات الويب الحديثة."
            ],
            color: [
                "لوحة ألوان مقترحة: #0a192f (خلفية), #64ffda (لون أساسي), #ccd6f6 (نص)",
                "جرب تدرج من الأزرق الداكن إلى الفيروزي لتبدو احترافية.",
                "ألوان مقترحة للعلامة التجارية: #FF6B6B, #4ECDC4, #FFE66D"
            ],
            idea: [
                "فكرة: تطبيق يجمع بين الذكاء الاصطناعي والتصميم لإنشاء هويات تلقائياً.",
                "لماذا لا تطور نظام توصيات ذكي للمصممين؟",
                "فكرة مشروع: منصة تعاونية للمصممين والمطورين."
            ],
            default: [
                "هذا سؤال مثير للاهتمام! دعني أفكر في أفضل إجابة.",
                "يمكنني مساعدتك في ذلك. هل يمكنك توضيح أكثر؟",
                "لدي عدة أفكار حول هذا الموضوع. أيهما تفضل؟"
            ]
        };
    }

    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('تصميم') || lowerMessage.includes('شكل') || lowerMessage.includes('واجهة')) {
            return this.getRandomResponse('design');
        } else if (lowerMessage.includes('كود') || lowerMessage.includes('برمجة') || lowerMessage.includes('برمج')) {
            return this.getRandomResponse('code');
        } else if (lowerMessage.includes('لون') || lowerMessage.includes('ألوان') || lowerMessage.includes('لوحة')) {
            return this.getRandomResponse('color');
        } else if (lowerMessage.includes('فكرة') || lowerMessage.includes('مشروع') || lowerMessage.includes('اقتراح')) {
            return this.getRandomResponse('idea');
        } else if (lowerMessage.includes('مرحبا') || lowerMessage.includes('اهلا') || lowerMessage.includes('سلام')) {
            return this.getRandomResponse('greetings');
        } else {
            return this.getRandomResponse('default');
        }
    }

    getRandomResponse(type) {
        const responses = this.responses[type] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickAction(action) {
        const responses = {
            design: "أقترح تصميم واجهة مستخدم حديثة باستخدام Figma. ابدأ بشاشة رئيسية بسيطة مع تنقل سهل.",
            code: "إليك نموذج كود React حديث:\n```jsx\nconst ModernComponent = () => {\n  const [state, setState] = useState(null);\n  return (\n    <div>\n      <h1>مكون حديث</h1>\n    </div>\n  );\n};\n```",
            color: "لوحة ألوان مقترحة:\n• الأساسي: #0a192f\n• الثانوي: #64ffda\n• النص: #ccd6f6\n• التمييز: #ff6b6b",
            idea: "فكرة مشروع: تطبيق ذكاء اصطناعي يولد تصاميم ويب تلقائياً بناءً على وصف المستخدم."
        };

        this.addMessage(responses[action], 'ai');
    }

    speakResponse(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `ai-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : '#64ffda'};
            color: #0a192f;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة مساعد الذكاء الاصطناعي
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ai-interactive')) {
        new AIAssistant();
    }
});