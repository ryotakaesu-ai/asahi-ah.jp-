/**
 * あさひ動物病院 - JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Mobile Navigation
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelectorAll('.nav-mobile a');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(43, 158, 179, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Animations (Intersection Observer)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .info-card, .faq-item, .access-card'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ========================================
    // Active Navigation Highlight
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navDesktopLinks = document.querySelectorAll('.nav-desktop a');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navDesktopLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // Parallax Effect for Hero
    // ========================================
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        if (heroBg && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ========================================
    // Phone Number Click Tracking (Optional)
    // ========================================
    document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
        telLink.addEventListener('click', () => {
            // Google Analytics event tracking (if GA4 is set up)
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'Contact',
                    'event_label': 'Phone Call'
                });
            }
        });
    });
});

