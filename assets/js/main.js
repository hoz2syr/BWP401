/* 
    BWP401 - ملف JavaScript الرئيسي
    --------------------------------
    هذا الملف يحتوي على جميع الوظائف الديناميكية
    يمكن لأعضاء الفريق إضافة وظائف إضافية هنا
*/

// ==================
// عند تحميل الصفحة بالكامل
// ==================
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل المشروع بنجاح! 🚀');
    
    // استدعاء الوظائف الأساسية
    initContactForm();
    initScrollToTop();
    loadThemePreference();
});

// ==================
// التحقق من نموذج التواصل
// ==================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const alertsContainer = document.getElementById('alerts-container');
    
    if (form && alertsContainer) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على قيم النموذج
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // التحقق من صحة البيانات
            let isValid = true;
            let errorMessage = '';
            
            if (name.length < 3) {
                isValid = false;
                errorMessage = 'الاسم يجب أن يكون أكثر من 3 أحرف';
            } else if (!validateEmail(email)) {
                isValid = false;
                errorMessage = 'البريد الإلكتروني غير صالح';
            } else if (subject.length < 5) {
                isValid = false;
                errorMessage = 'الموضوع يجب أن يكون أكثر من 5 أحرف';
            } else if (message.length < 10) {
                isValid = false;
                errorMessage = 'الرسالة يجب أن تكون أكثر من 10 أحرف';
            }
            
            // عرض النتيجة
            if (isValid) {
                showAlert('تم إرسال الرسالة بنجاح! سنتواصل معك قريباً', 'success');
                form.reset();
                
                // حفظ البيانات في localStorage اختيارياً
                saveToLocalStorage('lastContact', { name, email, date: new Date().toISOString() });
            } else {
                showAlert(errorMessage, 'danger');
            }
        });
    }
}

// ==================
// التحقق من صحة البريد الإلكتروني
// ==================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==================
// عرض رسائل التنبيه (Bootstrap Alerts)
// ==================
function showAlert(message, type = 'info') {
    const alertsContainer = document.getElementById('alerts-container');
    
    if (alertsContainer) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        alertsContainer.appendChild(alertDiv);
        
        // إخفاء التنبيه تلقائياً بعد 5 ثواني
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// ==================
// زر العودة للأعلى
// ==================
function initScrollToTop() {
    // إنشاء الزر ديناميكياً
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'btn btn-primary scroll-top-btn';
    scrollBtn.innerHTML = '⬆️';
    scrollBtn.id = 'scroll-top-btn';
    document.body.appendChild(scrollBtn);
    
    // إظهار وإخفاء الزر عند التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // العودة للأعلى عند النقر
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================
// حفظ واسترجاع من localStorage
// ==================
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('خطأ في حفظ البيانات:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('خطأ في استرجاع البيانات:', e);
        return null;
    }
}

// ==================
// إدارة الوضع الداكن (Dark Mode)
// ==================
function loadThemePreference() {
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    saveToLocalStorage('theme', isDark ? 'dark' : 'light');
}

// ==================
// وظائف مساعدة إضافية
// ==================

// تكوين نمط التاريخ
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// تنفيذ أي كود بعد تحميل الصفحة بالكامل
console.log('✅ ملف JavaScript جاهز للعمل!');
