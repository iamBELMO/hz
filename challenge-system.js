// challenge-system.js
class ChallengeSystem {
    constructor() {
        this.currentTime = 300; // 5 دقائق بالثواني
        this.timerInterval = null;
        this.isRunning = false;
        this.canvas = null;
        this.ctx = null;
        this.currentTool = 'pen';
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.init();
    }

    init() {
        this.initCanvas();
        this.setupEventListeners();
        this.updateTimerDisplay();
    }

    initCanvas() {
        this.canvas = document.getElementById('designCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setCanvasSize();
        
        // إعداد أحداث الرسم
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // أحداث اللمس
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.startDrawing(touch);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.draw(touch);
        });
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    }

    setCanvasSize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth - 40;
        this.canvas.height = 400;
    }

    setupEventListeners() {
        // أدوات المؤقت
        document.getElementById('btnStartTimer')?.addEventListener('click', () => this.startTimer());
        document.getElementById('btnPauseTimer')?.addEventListener('click', () => this.pauseTimer());
        document.getElementById('btnResetTimer')?.addEventListener('click', () => this.resetTimer());
        
        // أدوات الرسم
        document.querySelectorAll('.tool').forEach(tool => {
            tool.addEventListener('click', (e) => {
                this.setTool(e.currentTarget.dataset.tool);
            });
        });
        
        // أدوات التحكم بالرسم
        document.getElementById('btnClearCanvas')?.addEventListener('click', () => this.clearCanvas());
        document.getElementById('btnSaveCanvas')?.addEventListener('click', () => this.saveCanvas());
        document.getElementById('btnShareCanvas')?.addEventListener('click', () => this.shareCanvas());
        
        // تحديث حجم الـ canvas عند تغيير حجم النافذة
        window.addEventListener('resize', () => this.setCanvasSize());
    }

    startTimer() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime--;
                this.updateTimerDisplay();
                
                // تحذير عندما يتبقى 30 ثانية
                if (this.currentTime === 30) {
                    this.showTimeWarning();
                }
                
                // انتهاء الوقت
                if (this.currentTime === 0) {
                    this.endChallenge();
                }
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.currentTime = 300;
        this.updateTimerDisplay();
        this.clearCanvas();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        
        document.getElementById('timerMinutes').textContent = 
            minutes.toString().padStart(2, '0');
        document.getElementById('timerSeconds').textContent = 
            seconds.toString().padStart(2, '0');
        
        // تحديث دائرة المؤقت
        const circle = document.querySelector('.timer-circle circle');
        if (circle) {
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (this.currentTime / 300) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        }
    }

    setTool(tool) {
        this.currentTool = tool;
        
        // تحديث الواجهة
        document.querySelectorAll('.tool').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelector(`.tool[data-tool="${tool}"]`)?.classList.add('active');
        
        // تغيير مؤشر الماوس
        const cursorMap = {
            pen: 'crosshair',
            shapes: 'cell',
            text: 'text',
            gradient: 'grab',
            effects: 'pointer'
        };
        this.canvas.style.cursor = cursorMap[tool] || 'default';
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
    }

    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.getToolColor();
        
        switch (this.currentTool) {
            case 'pen':
                this.ctx.moveTo(this.lastX, this.lastY);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
                break;
                
            case 'shapes':
                this.ctx.rect(x - 25, y - 25, 50, 50);
                this.ctx.stroke();
                break;
                
            case 'text':
                this.ctx.font = '20px Arial';
                this.ctx.fillStyle = this.getToolColor();
                this.ctx.fillText('نص', x, y);
                break;
                
            case 'gradient':
                const gradient = this.ctx.createLinearGradient(this.lastX, this.lastY, x, y);
                gradient.addColorStop(0, this.getToolColor());
                gradient.addColorStop(1, '#ff6b6b');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x - 30, y - 30, 60, 60);
                break;
        }
        
        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    getToolColor() {
        const colors = {
            pen: '#64ffda',
            shapes: '#2196F3',
            text: '#333',
            gradient: '#FF9800',
            effects: '#9C27B0'
        };
        return colors[this.currentTool] || '#64ffda';
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    saveCanvas() {
        const link = document.createElement('a');
        link.download = 'تصميم-التحدي.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
        
        this.showNotification('تم حفظ التصميم بنجاح!', 'success');
    }

    async shareCanvas() {
        if (navigator.share) {
            try {
                const blob = await new Promise(resolve => 
                    this.canvas.toBlob(resolve, 'image/png')
                );
                const file = new File([blob], 'تصميم.png', { type: 'image/png' });
                
                await navigator.share({
                    title: 'تصميمي في تحدي BELMO & TARIQ',
                    text: 'شاهد التصميم الذي أنشأته!',
                    files: [file]
                });
            } catch (err) {
                console.error('Error sharing:', err);
                this.showNotification('لم يتم المشاركة', 'error');
            }
        } else {
            this.showNotification('المشاركة غير مدعومة في متصفحك', 'info');
        }
    }

    showTimeWarning() {
        // تأثير صوتي (يمكن استبداله بملف صوتي)
        const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
        audio.volume = 0.5;
        audio.play().catch(() => {});
        
        // تأثير بصري
        document.querySelector('.timer-circle').style.animation = 'pulse 1s infinite';
        
        this.showNotification('⏰ بقي 30 ثانية فقط!', 'warning');
    }

    endChallenge() {
        this.pauseTimer();
        this.showNotification('⏰ انتهى الوقت! أحسنت العمل', 'success');
        
        // عرض النتيجة
        const score = this.calculateScore();
        this.showResult(score);
    }

    calculateScore() {
        // حساب النقاط بناءً على الوقت والجودة (محاكاة)
        const timeBonus = Math.min(this.currentTime * 2, 200);
        const complexityBonus = 500; // محاكاة
        return 300 + timeBonus + complexityBonus;
    }

    showResult(score) {
        const modal = document.createElement('div');
        modal.className = 'challenge-result-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🎉 أحسنت! اكتمل التحدي</h3>
                <div class="score-display">
                    <div class="score-value">${score}</div>
                    <div class="score-label">نقطة</div>
                </div>
                <p>لقد أكملت التحدي بنجاح! شارك تصميمك مع الأصدقاء.</p>
                <div class="modal-actions">
                    <button class="btn-modal" id="btnShareResult">مشاركة</button>
                    <button class="btn-modal" id="btnNewChallenge">تحدي جديد</button>
                    <button class="btn-modal" id="btnCloseModal">إغلاق</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            .challenge-result-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: var(--primary-color);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                width: 90%;
                border: 3px solid var(--accent-color);
                animation: slideUp 0.5s ease;
            }
            
            .score-display {
                margin: 30px 0;
            }
            
            .score-value {
                font-size: 4rem;
                font-weight: 900;
                color: var(--accent-color);
                text-shadow: 0 0 20px rgba(100, 255, 218, 0.5);
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .btn-modal {
                padding: 12px 25px;
                background: var(--accent-color);
                color: var(--primary-color);
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .btn-modal:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 20px rgba(100, 255, 218, 0.3);
            }
            
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // أحداث الأزرار
        document.getElementById('btnShareResult')?.addEventListener('click', () => this.shareCanvas());
        document.getElementById('btnNewChallenge')?.addEventListener('click', () => {
            modal.remove();
            this.resetTimer();
            this.startTimer();
        });
        document.getElementById('btnCloseModal')?.addEventListener('click', () => modal.remove());
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'challenge-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b6b' : 
                        type === 'warning' ? '#FF9800' : '#64ffda'};
            color: #0a192f;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// تهيئة نظام التحديات
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('challenges')) {
        new ChallengeSystem();
    }
});