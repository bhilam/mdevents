// ======================================
// CURRENT YEAR
// ======================================

document.getElementById('current-year').textContent =
        new Date().getFullYear();

// ======================================
// NAVBAR
// ======================================

const navbar = document.getElementById('navbar');
const logoImg = document.getElementById('logo-img');

let isMenuOpen = false;

window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 50;

    if (isScrolled || isMenuOpen) {
        navbar.classList.add('bg-black', 'py-4', 'shadow-xl');
        navbar.classList.remove('bg-transparent', 'py-8');

        logoImg.classList.add('w-10', 'md:w-12');
        logoImg.classList.remove('w-12', 'md:w-16');

    } else {
        navbar.classList.add('bg-transparent', 'py-8');
        navbar.classList.remove('bg-black', 'py-4', 'shadow-xl');

        logoImg.classList.add('w-12', 'md:w-16');
        logoImg.classList.remove('w-10', 'md:w-12');
    }
});

// ======================================
// MOBILE MENU
// ======================================

const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const menuText = document.getElementById('menu-text');
const logo = document.querySelector('nav a[href="#home"]');

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {

        mobileMenu.classList.remove('-translate-y-full');
        mobileMenu.classList.add('translate-y-0');

        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');

        menuText.textContent = 'Close';

        logo.classList.add(
                'opacity-0',
                'scale-90',
                'pointer-events-none'
                );

        const items = document.querySelectorAll('.menu-item');

        items.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('show');
            }, 120 * i);
        });

    } else {

        mobileMenu.classList.add('-translate-y-full');
        mobileMenu.classList.remove('translate-y-0');

        closeIcon.classList.add('hidden');
        menuIcon.classList.remove('hidden');

        menuText.textContent = 'Menu';

        logo.classList.remove(
                'opacity-0',
                'scale-90',
                'pointer-events-none'
                );

        document.querySelectorAll('.menu-item')
                .forEach(item => {
                    item.classList.remove('show');
                });
    }
}

// MENU BUTTON
document
        .getElementById('menuToggleBtn')
        .addEventListener('click', toggleMenu);

// CLOSE MENU WHEN LINK CLICKED
document
        .querySelectorAll('.mobile-menu-link')
        .forEach(link => {
            link.addEventListener('click', () => {

                toggleMenu();

                setTimeout(() => {

                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);

                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }

                }, 300);
            });
        });

// ======================================
// PORTFOLIO CAROUSELS
// ======================================

function initCarousels() {

    const carousels =
            document.querySelectorAll('.overflow-hidden.relative');

    carousels.forEach(container => {

        const slides =
                container.querySelectorAll('.carousel-slide');

        if (slides.length <= 1)
            return;

        let index = 0;

        setInterval(() => {

            slides[index].classList.remove('opacity-100');
            slides[index].classList.add('opacity-0');

            index = (index + 1) % slides.length;

            slides[index].classList.remove('opacity-0');
            slides[index].classList.add('opacity-100');

        }, 2500);

    });
}

// ======================================
// TESTIMONIALS
// ======================================

let activeTestimonial = 0;
const totalTestimonials = 4;

// PREVIEW TEXT
function initTestimonialPreviews() {

    document
            .querySelectorAll('.testimonial-preview')
            .forEach(el => {

                const text = el.getAttribute('data-full');

                if (!text)
                    return;

                const cleaned = text
                        .replace(/\\n/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim();

                const firstSentence =
                        cleaned.match(/[^.!?]+[.!?]+/)?.[0] || cleaned;

                el.textContent = firstSentence.trim();
            });
}

// UPDATE SLIDES
function updateTestimonials() {

    for (let i = 0; i < totalTestimonials; i++) {

        const slide =
                document.getElementById(`testimonial-${i}`);

        const dot =
                document.getElementById(`dot-${i}`);

        if (i === activeTestimonial) {

            slide.classList.remove(
                    'opacity-0',
                    'translate-y-8',
                    '-z-10',
                    'pointer-events-none'
                    );

            slide.classList.add(
                    'opacity-100',
                    'translate-y-0',
                    'z-10'
                    );

            dot.classList.remove(
                    'bg-stone-600',
                    'w-2'
                    );

            dot.classList.add(
                    'bg-[#d4af37]',
                    'w-6'
                    );

        } else {

            slide.classList.add(
                    'opacity-0',
                    'translate-y-8',
                    '-z-10',
                    'pointer-events-none'
                    );

            slide.classList.remove(
                    'opacity-100',
                    'translate-y-0',
                    'z-10'
                    );

            dot.classList.add(
                    'bg-stone-600',
                    'w-2'
                    );

            dot.classList.remove(
                    'bg-[#d4af37]',
                    'w-6'
                    );
        }
    }
}

function nextTestimonial() {
    activeTestimonial =
            (activeTestimonial + 1) % totalTestimonials;

    updateTestimonials();
}

function prevTestimonial() {
    activeTestimonial =
            (activeTestimonial - 1 + totalTestimonials)
            % totalTestimonials;

    updateTestimonials();
}

function setTestimonial(index) {
    activeTestimonial = index;
    updateTestimonials();
}

// ======================================
// TESTIMONIAL MODAL
// ======================================

const testimonialModal =
        document.getElementById('testimonialModal');

const testimonialModalText =
        document.getElementById('testimonialModalText');

function openTestimonial(button) {

    let fullText =
            button.getAttribute('data-full') || '';

    fullText = fullText.replace(/\\n/g, '\n');

    testimonialModal.classList.remove('hidden');
    testimonialModal.classList.add('flex');

    document.body.classList.add('overflow-hidden');

    testimonialModalText.style.opacity = 0;
    testimonialModalText.textContent = fullText;

    requestAnimationFrame(() => {

        testimonialModalText.style.transition =
                'opacity 600ms ease';

        testimonialModalText.style.opacity = 1;
    });
}

function closeTestimonial() {

    testimonialModal.classList.add('hidden');
    testimonialModal.classList.remove('flex');

    document.body.classList.remove('overflow-hidden');
}

// OPEN MODAL BUTTONS
document
        .querySelectorAll('.open-testimonial-btn')
        .forEach(button => {

            button.addEventListener('click', () => {
                openTestimonial(button);
            });

        });

// CLOSE BUTTON
document
        .getElementById('closeModalBtn')
        .addEventListener('click', closeTestimonial);

// OVERLAY CLICK CLOSE
testimonialModal.addEventListener('click', e => {

    const modalContent =
            testimonialModal.querySelector('div');

    if (!modalContent.contains(e.target)) {
        closeTestimonial();
    }
});

// ======================================
// TESTIMONIAL CONTROLS
// ======================================

document
        .getElementById('nextTestimonialBtn')
        .addEventListener('click', nextTestimonial);

document
        .getElementById('prevTestimonialBtn')
        .addEventListener('click', prevTestimonial);

// DOTS
document
        .querySelectorAll('[data-index]')
        .forEach(dot => {

            dot.addEventListener('click', () => {

                const index =
                        parseInt(dot.dataset.index);

                setTestimonial(index);
            });
        });

// ======================================
// MOBILE SWIPE
// ======================================

let touchStartX = 0;
let touchEndX = 0;

const testimonialContainer =
        document.querySelector(
                '#testimonials .relative.min-h-\\[250px\\]'
                );

if (testimonialContainer) {

    testimonialContainer.addEventListener(
            'touchstart',
            e => {
                touchStartX =
                        e.changedTouches[0].screenX;
            },
            {passive: true}
    );

    testimonialContainer.addEventListener(
            'touchend',
            e => {

                touchEndX =
                        e.changedTouches[0].screenX;

                handleSwipeGesture();

            },
            {passive: true}
    );
}

function handleSwipeGesture() {

    const swipeDistance =
            touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50)
        return;

    if (swipeDistance < 0) {
        nextTestimonial();
    } else {
        prevTestimonial();
    }
}

// GOOGLE SHEETS SUBMISSION
const form = document.getElementById("bookingForm");
form.addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        await fetch(
            "https://script.google.com/macros/s/AKfycbxlMqLztP7LdugOQQPuAud8krNqT3X16hfhadljiWEJ1I-QK0uhtMpT3k_RcRJ3emhi/exec",
            {
                method: "POST",
				mode: "no-cors",
                body: formData
            }
        );

        document.getElementById("successMessage").classList.remove("hidden");
        form.reset();
    } catch(error) {
        console.error(error);
        alert("Submission failed.");
    }
});

document.getElementById("closeSuccess").addEventListener("click", () => {
        document
            .getElementById("successMessage")
            .classList.add("hidden");
    });
	
// ======================================
// INITIALIZATION
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    initCarousels();
    initTestimonialPreviews();
    updateTestimonials();
});
