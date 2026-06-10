(function () {
    'use strict';

    function initDailyQuote() {
        const el = document.getElementById('dailyQuote');
        if (!el) return;
        const quotes = [
            'Kopi terbaik adalah yang menemani obrolan paling jujur.',
            'Malam yang sunyi, kopi yang hangat, hati yang bicara.',
            'Terkadang yang kamu butuh cuma secangkir kopi dan tempat duduk yang nyaman.',
            'Trotoar bukan hanya tempat lewat, tapi tempat singgah untuk cerita.',
            'Setiap tegukan kopi adalah jeda dari hiruk pikuk dunia.',
            'Kopi yang baik tidak pernah membohongi perasaan.',
            'Di setiap cangkir ada cerita yang menunggu untuk dibagikan.',
            'Hujan di luar, kopi di tangan, damai di hati.',
        ];
        el.textContent = '"' + quotes[Math.floor(Math.random() * quotes.length)] + '"';
    }

    function initCurrentTime() {
        const el = document.getElementById('currentTime');
        if (!el) return;
        function update() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            el.textContent = hours + ':' + minutes + ' WIB';
        }
        update();
        setInterval(update, 10000);
    }

    function initOpenStatus() {
        const el = document.getElementById('openStatus');
        if (!el) return;
        const now = new Date();
        const day = now.getDay();
        const minuteOfDay = now.getHours() * 60 + now.getMinutes();

        let isOpen = false;
        if (day >= 1 && day <= 4) {
            isOpen = minuteOfDay >= 1110 && minuteOfDay < 1440;
        } else if (day === 5) {
            isOpen = minuteOfDay >= 1020 && minuteOfDay < 1440;
        } else if (day === 6) {
            isOpen = minuteOfDay >= 1020 || minuteOfDay < 120;
        } else if (day === 0) {
            isOpen = minuteOfDay >= 1020 && minuteOfDay < 1440;
        }

        el.textContent = isOpen ? 'Buka' : 'Tutup';
        el.style.color = isOpen ? '#6db36d' : '#c0392b';
    }

    function initNewsletter() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input && input.value.trim()) {
                alert('Terima kasih! Kamu akan mendapat update dari Trotoar Coffee.');
                input.value = '';
            }
        });
    }

    function initGalleryPreview() {
        const items = document.querySelectorAll('[data-gallery]');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxVideo = document.getElementById('lightboxVideo');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        const lightboxCounter = document.getElementById('lightboxCounter');

        if (!items.length || !lightbox) return;

        const mediaItems = Array.from(items).map((item) => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            if (video) return { src: video.querySelector('source') ? video.querySelector('source').src : video.src, type: 'video' };
            if (img) return { src: img.src, type: 'image' };
            return null;
        }).filter(Boolean);

        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const item = mediaItems[currentIndex];
            if (item.type === 'video') {
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = item.src;
                lightboxVideo.load();
                lightboxVideo.play();
                lightbox.classList.add('show-video');
            } else {
                lightboxVideo.pause();
                lightboxVideo.src = '';
                lightboxVideo.style.display = 'none';
                lightboxImg.style.display = 'block';
                lightboxImg.src = item.src;
                lightbox.classList.remove('show-video');
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateCounter();
        }

        function closeLightbox() {
            lightboxVideo.pause();
            lightboxVideo.src = '';
            lightbox.classList.remove('active');
            lightbox.classList.remove('show-video');
            lightboxImg.style.display = 'block';
            document.body.style.overflow = '';
        }

        function navigate(direction) {
            lightboxVideo.pause();
            currentIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;
            const item = mediaItems[currentIndex];
            if (item.type === 'video') {
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = item.src;
                lightboxVideo.load();
                lightboxVideo.play();
                lightbox.classList.add('show-video');
            } else {
                lightboxVideo.pause();
                lightboxVideo.src = '';
                lightboxVideo.style.display = 'none';
                lightboxImg.style.display = 'block';
                lightboxImg.src = item.src;
                lightbox.classList.remove('show-video');
            }
            updateCounter();
        }

        function updateCounter() {
            if (lightboxCounter) lightboxCounter.textContent = currentIndex + 1 + ' / ' + mediaItems.length;
        }

        items.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigate(-1));
        if (lightboxNext) lightboxNext.addEventListener('click', () => navigate(1));
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }

    function initHeroParallax() {
        const heroBg = document.getElementById('heroBg');
        const hero = document.querySelector('.hero');
        if (!heroBg || !hero) return;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroBg.style.transform = 'scale(1.08) translate(' + (x * 12) + 'px, ' + (y * 8) + 'px)';
        });
        hero.addEventListener('mouseleave', () => { heroBg.style.transform = 'scale(1.05)'; });
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, target);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach((el) => observer.observe(el));
    }

    function animateCounter(el, target) {
        const duration = 2000;
        const start = performance.now();
        const isLarge = target >= 1000;

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            if (isLarge) {
                el.textContent = (current >= 1000)
                    ? (current / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
                    : current.toString();
            } else {
                el.textContent = current.toString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = isLarge
                    ? (target / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
                    : target.toString();
            }
        }
        requestAnimationFrame(update);
    }

    function init() {
        initDailyQuote();
        initCurrentTime();
        initOpenStatus();
        initNewsletter();
        initGalleryPreview();
        initHeroParallax();
        initCounters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
