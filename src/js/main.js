// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initFAQ();
    initWaitlistForm();
    initSmoothScrolling();
    initScrollToTop();
    initHeaderScroll();
    initAnimationOnScroll();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('nav__menu--active');
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('nav__menu--active');
        }
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add scroll animation class to elements
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .faq-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// ===== ANIMATION ON SCROLL =====
function initAnimationOnScroll() {
    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasPlus = text.includes('+');
    const isZero = text.toLowerCase().includes('zero');
    
    if (isZero) return; // Don't animate "Zero"
    
    const number = parseInt(text.replace(/[^\d]/g, ''));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = number / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (hasPercent) displayValue += '%';
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, stepDuration);
}

// ===== FAQ FUNCTIONALITY =====
function initFAQ() {
    // Category switching
    const categoryBtns = document.querySelectorAll('.faq__category-btn');
    const categoryContents = document.querySelectorAll('.faq__category-content');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Remove active class from all buttons and contents
            categoryBtns.forEach(b => b.classList.remove('faq__category-btn--active'));
            categoryContents.forEach(c => c.classList.remove('faq__category-content--active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('faq__category-btn--active');
            document.querySelector(`[data-category="${category}"].faq__category-content`).classList.add('faq__category-content--active');
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-item__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('faq-item--active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('faq-item--active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('faq-item--active');
            }
        });
    });
}

// ===== WAITLIST FORM FUNCTIONALITY =====
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('waitlist-success');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.email || !data.firstName) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Track conversion event (Google Analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'send_to': 'GA_MEASUREMENT_ID/CONVERSION_ID',
                        'value': 1.0,
                        'currency': 'AUD'
                    });
                }
                
                // Show success notification
                showNotification('Successfully joined the waitlist! Check your email for next steps.', 'success');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Store user data in localStorage for analytics
                localStorage.setItem('waitlistSignup', JSON.stringify({
                    email: data.email,
                    firstName: data.firstName,
                    providerType: data.providerType,
                    state: data.state,
                    timestamp: new Date().toISOString()
                }));
                
            }, 2000); // Simulate network delay
        });
    }
}

// ===== UTILITY FUNCTIONS =====

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification__close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== SCROLL TO TOP FUNCTIONALITY =====
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.style.transform = 'translateY(-3px)';
        scrollToTopBtn.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', () => {
        scrollToTopBtn.style.transform = 'translateY(0)';
        scrollToTopBtn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// ===== PERFORMANCE OPTIMIZATION =====

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ANALYTICS TRACKING =====

// Track button clicks
function trackButtonClick(buttonText, section) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'Button',
            'event_label': buttonText,
            'custom_parameter_1': section
        });
    }
}

// Track scroll depth
function initScrollDepthTracking() {
    const scrollDepths = [25, 50, 75, 100];
    const trackedDepths = new Set();
    
    const trackScrollDepth = debounce(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                trackedDepths.add(depth);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {
                        'event_category': 'Scroll Depth',
                        'event_label': `${depth}%`,
                        'value': depth
                    });
                }
            }
        });
    }, 500);
    
    window.addEventListener('scroll', trackScrollDepth);
}

// Track time on page
function initTimeTracking() {
    const startTime = Date.now();
    
    // Track time milestones
    const timeIntervals = [30, 60, 120, 300]; // seconds
    const trackedTimes = new Set();
    
    setInterval(() => {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        
        timeIntervals.forEach(interval => {
            if (timeOnPage >= interval && !trackedTimes.has(interval)) {
                trackedTimes.add(interval);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        'name': 'time_on_page',
                        'value': interval
                    });
                }
            }
        });
    }, 1000);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for custom elements
function initKeyboardNavigation() {
    // FAQ keyboard navigation
    const faqQuestions = document.querySelectorAll('.faq-item__question');
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
    
    // Category buttons keyboard navigation
    const categoryBtns = document.querySelectorAll('.faq__category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
}

// Focus management
function initFocusManagement() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== FORM ENHANCEMENTS =====

// Real-time form validation
function initFormValidation() {
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('firstName');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'var(--alert-red)';
                showFieldError(emailInput, 'Please enter a valid email address');
            } else {
                emailInput.style.borderColor = '';
                hideFieldError(emailInput);
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.style.borderColor === 'var(--alert-red)') {
                emailInput.style.borderColor = '';
                hideFieldError(emailInput);
            }
        });
    }
    
    if (firstNameInput) {
        firstNameInput.addEventListener('blur', () => {
            if (!firstNameInput.value.trim()) {
                firstNameInput.style.borderColor = 'var(--alert-red)';
                showFieldError(firstNameInput, 'First name is required');
            } else {
                firstNameInput.style.borderColor = '';
                hideFieldError(firstNameInput);
            }
        });
        
        firstNameInput.addEventListener('input', () => {
            if (firstNameInput.style.borderColor === 'var(--alert-red)') {
                firstNameInput.style.borderColor = '';
                hideFieldError(firstNameInput);
            }
        });
    }
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--alert-red);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    initScrollDepthTracking();
    initTimeTracking();
    initKeyboardNavigation();
    initFocusManagement();
    initFormValidation();
});

// ===== CSS ANIMATIONS (to be added to CSS) =====
const additionalCSS = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notification__close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}
`;

// Add additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

