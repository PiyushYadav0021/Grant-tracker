// ========================================
// NAVIGATION
// ========================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling and active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards, benefit cards, etc.
const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .step-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========================================
// DASHBOARD PREVIEW TABS
// ========================================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========================================
// CHARTS (using Chart.js)
// ========================================

// Overview Chart
const overviewChartCtx = document.getElementById('overviewChart');
if (overviewChartCtx) {
    new Chart(overviewChartCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Savings',
                data: [1200, 1900, 1500, 2100, 2300, 2450],
                borderColor: '#7C3AED',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Analytics Chart
const analyticsChartCtx = document.getElementById('analyticsChart');
if (analyticsChartCtx) {
    new Chart(analyticsChartCtx, {
        type: 'bar',
        data: {
            labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [{
                label: 'Monthly Expenses',
                data: [2100, 1800, 2300, 1900, 2000, 2050],
                backgroundColor: [
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(59, 130, 246, 0.8)'
                ],
                borderRadius: 8,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ========================================
// TESTIMONIALS CAROUSEL
// ========================================

const testimonialsTrack = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.getElementById('carouselDots');

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

// Create dots
for (let i = 0; i < totalTestimonials; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    carouselDots.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    const offset = -currentTestimonial * 100;
    testimonialsTrack.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateCarousel();
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateCarousel();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    updateCarousel();
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials
let autoRotate = setInterval(nextTestimonial, 5000);

// Pause auto-rotate on hover
testimonialsTrack.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
});

testimonialsTrack.addEventListener('mouseleave', () => {
    autoRotate = setInterval(nextTestimonial, 5000);
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateCounter(element, target, duration = 2000, hasPrefix = false) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue;
        if (hasPrefix === '$') {
            if (target >= 1000000) {
                displayValue = `$${(current / 1000000).toFixed(1)}M+`;
            } else {
                displayValue = `$${Math.floor(current).toLocaleString()}`;
            }
        } else if (target < 10) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current).toLocaleString() + '+';
        }
        
        element.textContent = displayValue;
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                const prefix = stat.getAttribute('data-prefix');
                animateCounter(stat, target, 2000, prefix);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}Error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        inputElement.style.borderColor = '#EF4444';
    }
}

function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}Error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = '';
        inputElement.style.borderColor = '#E5E7EB';
    }
}

// Real-time validation on blur
const formInputs = ['name', 'email', 'subject', 'message'];

formInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            
            if (!value) {
                showError(inputId, 'This field is required');
            } else if (inputId === 'email' && !validateEmail(value)) {
                showError(inputId, 'Please enter a valid email address');
            } else {
                clearError(inputId);
            }
        });
        
        input.addEventListener('input', () => {
            clearError(inputId);
        });
    }
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        formInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            const value = input.value.trim();
            
            if (!value) {
                showError(inputId, 'This field is required');
                isValid = false;
            } else if (inputId === 'email' && !validateEmail(value)) {
                showError(inputId, 'Please enter a valid email address');
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            contactForm.style.opacity = '0.5';
            contactForm.style.pointerEvents = 'none';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                successMessage.classList.add('show');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    contactForm.style.opacity = '1';
                    contactForm.style.pointerEvents = 'auto';
                    successMessage.classList.remove('show');
                }, 3000);
            }, 1000);
        }
    });
}

// ========================================
// FAQ ACCORDION
// ========================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ========================================
// NEWSLETTER FORM
// ========================================

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        const email = input.value.trim();
        
        if (validateEmail(email)) {
            // Show success feedback
            const button = form.querySelector('button');
            const originalHTML = button.innerHTML;
            button.innerHTML = '✓';
            button.style.background = '#10B981';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
                input.value = '';
            }, 2000);
        } else {
            input.style.borderColor = '#EF4444';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
});

// ========================================
// SMOOTH SCROLL TO TOP
// ========================================

// Add a scroll to top button (optional)
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// ========================================
// PROGRESSIVE ENHANCEMENT
// ========================================

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Add keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevTestimonial();
    } else if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
});

// Focus management for mobile menu
mobileMenuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        // Focus first link when menu opens
        setTimeout(() => {
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        }, 300);
    }
});

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce scroll events
let scrollTimeout;
const originalScrollHandler = window.onscroll;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll handling logic here
    });
});

// ========================================
// TOUCH GESTURES FOR MOBILE (Testimonials)
// ========================================

let touchStartX = 0;
let touchEndX = 0;

testimonialsTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

testimonialsTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next
        nextTestimonial();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous
        prevTestimonial();
    }
}

// ========================================
// LAZY LOADING FOR IMAGES (if needed)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE MESSAGE (EASTER EGG)
// ========================================

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold; color: #7C3AED;');
console.log('%cLooking at the code? We love curious minds!', 'font-size: 14px; color: #6B7280;');
console.log('%cInterested in contributing? Reach out to us!', 'font-size: 14px; color: #6B7280;');

// ========================================
// ANALYTICS (Placeholder)
// ========================================

// Track page views, button clicks, etc.
function trackEvent(category, action, label) {
    // Integration with analytics service
    console.log('Event tracked:', { category, action, label });
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Click', 'Get Started');
    });
});

// ========================================
// INITIALIZATION
// ========================================

console.log('✓ SaveTrack website initialized successfully!');