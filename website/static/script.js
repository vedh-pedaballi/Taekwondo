// Loading States and Smooth Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Add page transition class
    document.body.classList.add('page-transition');
    
    // Add smooth scroll to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced navigation interactions
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeIn 0.6s ease-out forwards';
    });

    // Enhanced card animations
    const cards = document.querySelectorAll('.achievement-item, .event-card, .winner-pod');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });

    // Enhanced gallery interactions - REMOVED to avoid conflicts with Gallery template
    // The Gallery template has its own JavaScript implementation

    // Loading spinner for dynamic content
    function showLoadingSpinner(container) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        container.appendChild(spinner);
        return spinner;
    }

    function hideLoadingSpinner(spinner) {
        if (spinner && spinner.parentElement) {
            spinner.remove();
        }
    }

    // Enhanced form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Loading...';
                submitBtn.disabled = true;
                
                // Re-enable after a delay (for demo purposes)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.button, .register-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Enhanced lightbox interactions
    const lightboxItems = document.querySelectorAll('.lightbox-item');
    lightboxItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Enhanced stats animations
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element) {
        const finalNumber = parseInt(element.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentNumber) + '+';
        }, 30);
    }

    // Enhanced mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            this.setAttribute('aria-expanded', 
                this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Enhanced back button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'translateX(-15px) scale(0.9)';
            setTimeout(() => {
                window.history.back();
            }, 300);
        });
    }

    // Performance optimization: Debounce scroll events
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

    // Apply debouncing to scroll events - remove the undefined requestTick function
    // const debouncedScrollHandler = debounce(requestTick, 16);
    // window.addEventListener('scroll', debouncedScrollHandler);

    // Simplified image loading - remove skeleton states that cause issues
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Handle image error
        img.addEventListener('error', function() {
            this.src = '/static/images/placeholder.jpg';
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 

// Dropdown functionality
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    
    if (!dropdownBtn.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Gallery functionality - REMOVED to avoid conflicts with Gallery template
// The Gallery template has its own JavaScript implementation

// Page Transition Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transitions
    initializePageTransitions();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize loading states
    initializeLoadingStates();
});

function initializePageTransitions() {
    const mainElement = document.querySelector('main');
    
    // Add entrance animation
    mainElement.style.opacity = '0';
    mainElement.style.transform = 'translateY(20px)';
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
        mainElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        mainElement.style.opacity = '1';
        mainElement.style.transform = 'translateY(0)';
    });
    
    // Handle navigation transitions
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin) && 
            !link.href.includes('#') && !link.href.includes('javascript:')) {
            e.preventDefault();
            
            // Add exit animation
            mainElement.style.transform = 'translateY(-20px)';
            mainElement.style.opacity = '0';
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.section, .achievement-item, .event-card, .winner-pod');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initializeLoadingStates() {
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.button, .register-button, .login-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.innerHTML = '<span class="loading-spinner"></span> Loading...';
                
                // Remove loading state after a delay (for demo purposes)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
                }, 2000);
            }
        });
        
        // Store original text
        button.setAttribute('data-original-text', button.innerHTML);
    });
}

// Enhanced form animations
function animateFormSubmission(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
        group.classList.add('form-animate');
    });
}

// Add form submission listeners
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            animateFormSubmission(this);
        });
    });
});

// Card hover effects
function initializeCardEffects() {
    const cards = document.querySelectorAll('.achievement-item, .event-card, .winner-pod');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize card effects
document.addEventListener('DOMContentLoaded', initializeCardEffects);

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Parallax effect for hero sections
function initializeParallax() {
    const heroSections = document.querySelectorAll('.hero-section, .events-hero');
    heroSections.forEach(hero => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Initialize parallax
document.addEventListener('DOMContentLoaded', initializeParallax);

// Enhanced dropdown animations
function enhanceDropdown() {
    const dropdown = document.querySelector('.dropdown-menu');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    
    if (dropdown && dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (dropdown.classList.contains('show')) {
                dropdown.style.animation = 'dropdownSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    dropdown.classList.remove('show');
                    dropdown.style.animation = '';
                }, 300);
            } else {
                dropdown.classList.add('show');
                dropdown.style.animation = 'dropdownSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    }
}

// Initialize enhanced dropdown
document.addEventListener('DOMContentLoaded', enhanceDropdown);

// Add CSS for new animations
const additionalStyles = `
    @keyframes dropdownSlideOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .form-animate {
        animation: formSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 