(function () {
    'use strict';

    const navbar = document.getElementById('pageNavbar');
    const hamburger = document.getElementById('pageHamburger');
    const mobileOverlay = document.getElementById('pageMobileOverlay');
    const mobileLinks = document.querySelectorAll('[data-close]');
    const navbarLinks = document.querySelectorAll('.navbar-link');
    const scrollThreshold = 60;

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
        if (hamburger.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    function setActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        navbarLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            }
        });
    }

    function handleSmoothScroll(e) {
        const link = e.currentTarget;
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#') && !targetId.includes('.html')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (hamburger && hamburger.classList.contains('active')) {
                    closeMobileMenu();
                }
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    navbarHeight -
                    10;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        }
    }

    function bindEvents() {
        if (!navbar) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleNavbarScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function (e) {
                if (e.target === mobileOverlay) {
                    closeMobileMenu();
                }
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && hamburger && hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && hamburger && hamburger.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        navbarLinks.forEach((link) => {
            link.addEventListener('click', handleSmoothScroll);
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', handleSmoothScroll);
        });
    }

    function init() {
        handleNavbarScroll();
        setActiveNavLink();
        bindEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
