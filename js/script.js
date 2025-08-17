// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('.mobile-nav-toggle');
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Swipe interactions
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            console.log('Swipe up detected');
        } else {
            console.log('Swipe down detected');
        }
    }
}

// Responsive Matrix Rain density
function handleResize() {
    const screenWidth = window.innerWidth;
    const matrixRainElements = document.querySelectorAll('.matrix-rain');
    if (screenWidth < 768) {
        matrixRainElements.forEach((element, index) => {
            if (index % 2 === 0) element.style.display = 'none';
        });
    } else {
        matrixRainElements.forEach(element => {
            element.style.display = 'block';
        });
    }
}
window.addEventListener('resize', handleResize);
handleResize();

// Intersection Observer animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);
document.querySelectorAll('.section, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

// Matrix rain effect
function createMatrix() {
    const matrix = document.getElementById('matrix');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const screenWidth = window.innerWidth;
    const rainCount = screenWidth < 768 ? 20 : screenWidth < 1024 ? 35 : 50;
    for (let i = 0; i < rainCount; i++) {
        const rain = document.createElement('div');
        rain.className = 'matrix-rain';
        rain.style.left = Math.random() * 100 + '%';
        rain.style.animationDelay = Math.random() * 10 + 's';
        rain.style.animationDuration = (Math.random() * 10 + 5) + 's';
        let text = '';
        const textLength = screenWidth < 768 ? 10 : 20;
        for (let j = 0; j < textLength; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        rain.innerHTML = text;
        matrix.appendChild(rain);
    }
}
createMatrix();

// Smooth scrolling
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

// Glitch effect on skill-card hover
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
       
