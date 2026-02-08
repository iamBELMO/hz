// design-generator.js

// أداة تولد تصاميم فريدة باستخدام خوارزميات عشوائية ذكية
class DesignGenerator {
  constructor() {
    this.designs = [];
    this.currentDesign = null;
    this.init();
  }
  
  init() {
    this.generateDesignPalettes();
    this.createGeneratorUI();
    this.bindEvents();
    this.generateRandomDesign();
  }
  
  generateColor() {
    // توليد لون عشوائي باستخدام خوارزميات ذكية
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
    // توليد 50 لوحة ألوان عشوائية باستخدام خوارزميات ذكية
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
  
  createGeneratorUI() {
    const generatorHTML = `
      <section class="design-generator-section" id="design-generator">
        <div class="section-header">
          <div class="section-badge">إبداع TARIQ</div>
          <h2 class="section-title">مُولد التصاميم الذكي</h2>
          <p class="section-description">أداة متقدمة تولد تصاميم فريدة باستخدام خوارزميات ذكية</p>
        </div>
        
        <div class="design-generator">
          <div class="generator-info">
            <h3><i class="fas fa-palette"></i> مُولد تصاميم TARIQ الذكي</h3>
            <p>انقر على زر التوليد لإنشاء تصاميم فريدة باستخدام خوارزميات ذكية. يمكنك حفظ التصاميم التي تعجبك!</p>
          </div>
          
          <div class="generator-controls">
            <button class="btn-generate btn-primary">
              <i class="fas fa-bolt"></i> توليد تصميم جديد
            </button>
            <button class="btn-save btn-outline">
              <i class="fas fa-save"></i> حفظ التصميم
            </button>
            <button class="btn-randomize btn-outline">
              <i class="fas fa-random"></i> خلط عشوائي
            </button>
            <button class="btn-reset btn-outline">
              <i class="fas fa-redo"></i> إعادة تعيين
            </button>
          </div>
          
          <div class="design-preview-area">
            <div class="color-palette-display" id="colorPalette">
              <h4>لوحة الألوان</h4>
              <div class="palette-colors">
                <div class="palette-item">
                  <div class="color-box" id="colorPrimary"></div>
                  <span class="color-label">الأساسي</span>
                  <span class="color-value" id="valuePrimary">#64ffda</span>
                </div>
                <div class="palette-item">
                  <div class="color-box" id="colorSecondary"></div>
                  <span class="color-label">الثانوي</span>
                  <span class="color-value" id="valueSecondary">#112240</span>
                </div>
                <div class="palette-item">
                  <div class="color-box" id="colorAccent"></div>
                  <span class="color-label">مميز</span>
                  <span class="color-value" id="valueAccent">#ff6b6b</span>
                </div>
                <div class="palette-item">
                  <div class="color-box" id="colorBackground"></div>
                  <span class="color-label">الخلفية</span>
                  <span class="color-value" id="valueBackground">#0a192f</span>
                </div>
                <div class="palette-item">
                  <div class="color-box" id="colorText"></div>
                  <span class="color-label">النص</span>
                  <span class="color-value" id="valueText">#ccd6f6</span>
                </div>
              </div>
            </div>
            
            <div class="design-application">
              <h4>معاينة التصميم</h4>
              <div class="design-card" id="designCard">
                <div class="card-header" id="cardHeader">
                  <h4>بطاقة تصميم #<span id="designId">1</span></h4>
                  <div class="card-badge">جديد</div>
                </div>
                <div class="card-body" id="cardBody">
                  <p>هذا تصميم تم توليده تلقائياً باستخدام خوارزميات ذكية. يمكنك تجربة الألوان والتصميم.</p>
                  <div class="card-features">
                    <span class="feature-tag">ذكي</span>
                    <span class="feature-tag">حديث</span>
                    <span class="feature-tag">فريد</span>
                  </div>
                  <button class="design-btn" id="designBtn">زر تجريبي</button>
                </div>
                <div class="card-footer" id="cardFooter">
                  <span>تم التوليد بواسطة مُولد تصاميم TARIQ</span>
                  <div class="footer-icons">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-share-alt"></i>
                    <i class="fas fa-download"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="design-code-output">
            <h4><i class="fas fa-code"></i> كود CSS المُولد</h4>
            <div class="code-container">
              <pre><code id="generatedCSS">/* سيظهر كود CSS هنا */</code></pre>
              <button class="btn-copy" id="btnCopyCSS">
                <i class="fas fa-copy"></i> نسخ الكود
              </button>
            </div>
          </div>
          
          <div class="saved-designs">
            <h4><i class="fas fa-bookmark"></i> التصاميم المحفوظة</h4>
            <div class="saved-list" id="savedDesigns">
              <div class="empty-state">
                <i class="fas fa-palette"></i>
                <p>لا توجد تصاميم محفوظة بعد. قم بحفظ التصاميم التي تعجبك!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    
    // إضافته بعد قسم "عملنا"
    const processSection = document.querySelector('.process-section');
    if (processSection) {
      processSection.insertAdjacentHTML('afterend', generatorHTML);
    } else {
      document.querySelector('.projects-section').insertAdjacentHTML('afterend', generatorHTML);
    }
  }
  
  bindEvents() {
    // زر التوليد
    document.querySelector('.btn-generate')?.addEventListener('click', () => {
      this.generateRandomDesign();
      this.showNotification('تم توليد تصميم جديد بنجاح!', 'success');
    });
    
    // زر الحفظ
    document.querySelector('.btn-save')?.addEventListener('click', () => {
      this.saveCurrentDesign();
    });
    
    // زر الخلط العشوائي
    document.querySelector('.btn-randomize')?.addEventListener('click', () => {
      this.randomizeColors();
      this.showNotification('تم خلط الألوان عشوائياً!', 'info');
    });
    
    // زر إعادة التعيين
    document.querySelector('.btn-reset')?.addEventListener('click', () => {
      this.resetToDefault();
      this.showNotification('تم إعادة التعيين إلى التصميم الأساسي', 'info');
    });
    
    // زر نسخ الكود
    document.querySelector('#btnCopyCSS')?.addEventListener('click', () => {
      this.copyCSSToClipboard();
    });
    
    // الأحداث على مربعات الألوان
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
    // تطبيق الألوان على لوحة العرض
    document.getElementById('colorPrimary').style.backgroundColor = design.primary;
    document.getElementById('colorSecondary').style.backgroundColor = design.secondary;
    document.getElementById('colorAccent').style.backgroundColor = design.accent;
    document.getElementById('colorBackground').style.backgroundColor = design.background;
    document.getElementById('colorText').style.backgroundColor = design.text;
    
    // تحديث القيم النصية
    document.getElementById('valuePrimary').textContent = this.rgbToHex(design.primary);
    document.getElementById('valueSecondary').textContent = this.rgbToHex(design.secondary);
    document.getElementById('valueAccent').textContent = this.rgbToHex(design.accent);
    document.getElementById('valueBackground').textContent = this.rgbToHex(design.background);
    document.getElementById('valueText').textContent = this.rgbToHex(design.text);
    
    // تطبيق التصميم على البطاقة
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
    
    // خلط الألوان بشكل عشوائي
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
    // إعادة التعيين إلى التصميم الأساسي للموقع
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
    
    // إضافة إلى القائمة المحفوظة
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
    
    // إضافة أحداث للأزرار
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
  
  // دوال مساعدة
  rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    
    // تحويل hsl إلى hex (تبسيط)
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
    // حساب التباين لإرجاع لون نص مناسب
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }
  
  showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
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
    
    // إظهار الإشعار
    setTimeout(() => notification.classList.add('show'), 10);
    
    // إغلاق الإشعار
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
    
    // إزالة تلقائية بعد 5 ثوانٍ
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// تهيئة المُولد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  new DesignGenerator();
});