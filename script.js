// ===========================
// 1. Mobile Menu Toggle
// ===========================

const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// ===========================
// 2. Back to Top Button
// ===========================

const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===========================
// 3. Dark Mode Toggle
// ===========================

const darkToggle = document.getElementById('dark-toggle');

if (darkToggle) {
    darkToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            darkToggle.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkToggle.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkToggle.textContent = '☀️';
    }
}

// ===========================
// 4. Animated Counters
// ===========================

const counters = document.querySelectorAll('.counter');
let counted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(interval);
            } else {
                counter.textContent = current + '+';
            }
        };

        const interval = setInterval(updateCounter, 30);
    });
}

function checkCounters() {
    const impactSection = document.getElementById('impact');
    if (impactSection) {
        const rect = impactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !counted) {
            counted = true;
            animateCounters();
        }
    }
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', function() {
    setTimeout(checkCounters, 500);
});

// ===========================
// 5. Scroll Animation
// ===========================

const sections = document.querySelectorAll('section');

function revealSections() {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealSections);
window.addEventListener('load', function() {
    setTimeout(revealSections, 300);
});

// ===========================
// 6. Gallery Slider
// ===========================

const sliderWrapper = document.getElementById('sliderWrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = slides.length;
let autoPlayInterval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto play
startAutoPlay();

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
}

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    });

    sliderContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoPlay();
    });
} // ===========================
// 7. Join Form Submission (With PHP)
// ===========================

const joinForm = document.getElementById('joinForm');
const joinSuccess = document.getElementById('joinSuccess');

if (joinForm) {
    joinForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(joinForm);

        // Debug: See what data is being sent
        console.log('Sending data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }

        // Show loading state
        const submitBtn = joinForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Send data to PHP
        fetch('./join_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                if (data.success) {
                    joinForm.style.display = 'none';
                    joinSuccess.textContent = '✅ ' + data.message;
                    joinSuccess.style.display = 'block';

                    // Reset form after 5 seconds
                    setTimeout(() => {
                        joinForm.reset();
                        joinForm.style.display = 'block';
                        joinSuccess.style.display = 'none';
                    }, 5000);
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Connection error: ' + error.message + '\nPlease check if the server is running.');
            });
    });
}