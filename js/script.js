/* ================================
   FOOTBALL UNIVERSE - MAIN JS
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ================================
       1. ACTIVE NAV LINK (auto highlight)
       ================================ */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    /* ================================
       2. SCROLL REVEAL ANIMATION
       ================================ */
    const revealElements = document.querySelectorAll(
        'section, .card, .player-card, .match-card, article'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* ================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
       ================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ================================
       4. BACK TO TOP BUTTON
       ================================ */
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.id = 'backToTop';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ================================
       5. MOBILE MENU TOGGLE
       ================================ */
    const nav = document.querySelector('nav');
    if (nav) {
        // Hamburger button
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        nav.insertBefore(hamburger, nav.firstChild);

        hamburger.addEventListener('click', () => {
            nav.classList.toggle('menu-open');
            hamburger.innerHTML = nav.classList.contains('menu-open') ? '✕' : '☰';
        });

        // Close menu when link clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('menu-open');
                hamburger.innerHTML = '☰';
            });
        });
    }

    /* ================================
       6. LIVE MATCH COUNTDOWN (optional)
       ================================ */
    const countdowns = document.querySelectorAll('[data-countdown]');
    countdowns.forEach(el => {
        const target = new Date(el.dataset.countdown).getTime();
        const timer = setInterval(() => {
            const now = Date.now();
            const diff = target - now;
            if (diff <= 0) {
                el.textContent = 'LIVE NOW';
                clearInterval(timer);
                return;
            }
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);
            el.textContent = `${d}d ${h}h ${m}m ${s}s`;
        }, 1000);
    });

    /* ================================
       7. NAVBAR SHRINK ON SCROLL
       ================================ */
    window.addEventListener('scroll', () => {
        if (!nav) return;
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    /* ================================
       8. TYPING EFFECT FOR HERO TITLE (optional)
       ================================ */
    const typingTarget = document.querySelector('[data-typing]');
    if (typingTarget) {
        const words = JSON.parse(typingTarget.dataset.typing);
        let wordIndex = 0, charIndex = 0, deleting = false;

        function type() {
            const current = words[wordIndex];
            typingTarget.textContent = current.substring(0, charIndex);

            if (!deleting && charIndex < current.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (deleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                if (!deleting) {
                    deleting = true;
                    setTimeout(type, 1500);
                } else {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, 300);
                }
            }
        }
        type();
    }

    /* ================================
       9. SIMPLE SEARCH FILTER (for tables/lists)
       ================================ */
    const searchInput = document.querySelector('[data-search]');
    if (searchInput) {
        const targetSelector = searchInput.dataset.search;
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            document.querySelectorAll(targetSelector).forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    /* ================================
       10. CARD HOVER TILT EFFECT (subtle)
       ================================ */
    document.querySelectorAll('.card, .player-card, .match-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ================================
       11. CONSOLE SIGNATURE
       ================================ */
    console.log('%c⚽ FOOTBALL UNIVERSE ⚽', 'color:#00ff80;font-size:18px;font-weight:bold;');
    console.log('%cBuilt with passion for the beautiful game.', 'color:#f5f5f5;font-size:12px;');
});