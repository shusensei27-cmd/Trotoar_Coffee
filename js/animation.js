(function () {
    'use strict';

    function initCustomCursor() {
        const cursor = document.getElementById('customCursor');
        const trail = document.getElementById('cursorTrail');
        if (!cursor || !trail) return;

        let mouseX = -100, mouseY = -100, trailX = -100, trailY = -100;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function updateTrail() {
            trailX += (mouseX - trailX) * 0.12;
            trailY += (mouseY - trailY) * 0.12;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            requestAnimationFrame(updateTrail);
        }
        updateTrail();

        const hoverTargets = document.querySelectorAll('a, button, [tabindex], .menu-card, .gallery-item, .sticky-note');
        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });

        document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '0.3'; });
    }

    function initProgressBar() {
        const fill = document.getElementById('progressBarFill');
        if (!fill) return;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            fill.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }, { passive: true });
    }

    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        const fill = document.getElementById('backToTopFill');
        if (!btn) return;
        const circumference = 131.95;
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            btn.classList.toggle('visible', scrollTop > 400);
            if (fill) fill.style.strokeDashoffset = circumference * (1 - progress);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function initRevealObserver() {
        const elements = document.querySelectorAll('.reveal-fade-up');
        if (!elements.length) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 });
        elements.forEach((el) => observer.observe(el));
    }

    function initMagnetic() {
        document.querySelectorAll('[data-magnetic]').forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
        });
    }

    function initRipple() {
        document.querySelectorAll('[data-ripple]').forEach((btn) => {
            btn.addEventListener('click', function (e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    function initLoadingScreen() {
        const loader = document.getElementById('loadingScreen');
        if (!loader) return;
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('hidden'), 600);
        });
        setTimeout(() => loader.classList.add('hidden'), 2500);
    }

    function init() {
        initLoadingScreen();
        initCustomCursor();
        initProgressBar();
        initBackToTop();
        initRevealObserver();
        initMagnetic();
        initRipple();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
