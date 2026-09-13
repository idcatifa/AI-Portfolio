/* ============================================
   Atifa Khan — Portfolio Script
   Vanilla JS · Typing · Reveal · Menu · etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Console welcome
    console.log('%c♡ Welcome to Atifa Khan\'s Portfolio', 'color: #e84a7f; font-size: 14px; font-weight: bold;');
    console.log('%cLearn · Build · Explore', 'color: #c44569; font-size: 12px;');

    initTypingAnimation();
    initScrollReveal();
    initMobileMenu();
    initBackToTop();
    initCursorGlow();
    initNavbarScroll();
    createSparkles();
});

/* ---------- Typing Animation ---------- */
function initTypingAnimation() {
    const roles = [
        "Software Engineering Student",
        "Aspiring Software Engineer",
        "Future Researcher",
        "Technology Enthusiast"
    ];

    const el = document.getElementById('typingText');
    if (!el) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const PAUSE_COMPLETE = 1800;
    const PAUSE_BEFORE_NEXT = 400;

    function type() {
        const current = roles[roleIndex];

        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(type, PAUSE_COMPLETE);
                return;
            }
            setTimeout(type, TYPE_SPEED);
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, PAUSE_BEFORE_NEXT);
                return;
            }
            setTimeout(type, DELETE_SPEED);
        }
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = roles[0];
        return;
    }

    setTimeout(type, 600);
}

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveals.forEach(el => el.classList.add('show'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!hamburger || !mobileMenu) return;

    function toggleMenu() {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggleMenu();
        }
    });
}

/* ---------- Back to Top ---------- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- Cursor Glow (desktop only) ---------- */
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    // Disable on touch / small screens
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isNarrow = window.innerWidth < 850;

    if (isTouch || isNarrow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        glow.style.display = 'none';
        return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.classList.add('active');
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });

    function animateGlow() {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

/* ---------- Navbar scroll state ---------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ---------- Floating Sparkles ---------- */
function createSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const symbols = ['✦', '♡', '·', '✧', '⋆'];
    const count = 18;

    for (let i = 0; i < count; i++) {
        const spark = document.createElement('span');
        spark.className = 'sparkle';
        spark.textContent = symbols[i % symbols.length];
        spark.style.left = Math.random() * 100 + '%';
        spark.style.animationDuration = (12 + Math.random() * 10) + 's';
        spark.style.animationDelay = (Math.random() * 14) + 's';
        spark.style.fontSize = (0.55 + Math.random() * 0.5) + 'rem';
        container.appendChild(spark);
    }
}