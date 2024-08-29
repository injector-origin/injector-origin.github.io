// Initialize Material Design Components
mdc.autoInit();

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle card animations
function handleCardAnimations() {
    const cards = document.querySelectorAll('.mdc-card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('mdc-card--visible');
        }
    });
}

// Listen for scroll and resize events
window.addEventListener('scroll', handleCardAnimations);
window.addEventListener('resize', handleCardAnimations);

// Initial check in case cards are already in the viewport
handleCardAnimations();

// Modal Interaction
const learnMoreBtn = document.getElementById('learn-more-btn');
const learnMoreModal = document.getElementById('learn-more-modal');
const closeModalBtn = document.querySelector('.modal .close-btn');

learnMoreBtn.addEventListener('click', () => {
    learnMoreModal.classList.add('modal-show');
});

closeModalBtn.addEventListener('click', () => {
    learnMoreModal.classList.remove('modal-show');
});

window.addEventListener('click', (event) => {
    if (event.target === learnMoreModal) {
        learnMoreModal.classList.remove('modal-show');
    }
});

// Tooltip Initialization
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseover', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipEl = document.createElement('div');
        tooltipEl.classList.add('mdc-tooltip');
        tooltipEl.textContent = tooltipText;
        document.body.appendChild(tooltipEl);

        const rect = tooltip.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
        tooltipEl.style.top = `${rect.top - tooltipRect.height - 10}px`;
        tooltipEl.classList.add('mdc-tooltip--visible');
    });

    tooltip.addEventListener('mouseout', () => {
        const tooltipEl = document.querySelector('.mdc-tooltip');
        if (tooltipEl) {
            tooltipEl.classList.remove('mdc-tooltip--visible');
            setTimeout(() => tooltipEl.remove(), 300);
        }
    });
});

// Accordion Functionality
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        const panel = accordion.nextElementSibling;
        const isOpen = panel.style.display === 'block';
        panel.style.display = isOpen ? 'none' : 'block';
        accordion.setAttribute('aria-expanded', !isOpen);
    });
});

// Carousel Functionality
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carouselImages = document.querySelector('.carousel-images');
let currentIndex = 0;

function updateCarousel() {
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;
    const offset = -100 * currentIndex;

    carouselImages.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    const images = document.querySelectorAll('.carousel-images img').length;
    currentIndex = (currentIndex <= 0) ? images - 1 : currentIndex - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    const images = document.querySelectorAll('.carousel-images img').length;
    currentIndex = (currentIndex >= images - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(span => span.textContent = '');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (!name) {
        document.getElementById('name-error').textContent = 'Name is required.';
        isValid = false;
    }

    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required.';
        isValid = false;
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            isValid = false;
        }
    }

    if (!message) {
        document.getElementById('message-error').textContent = 'Message is required.';
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        formFeedback.textContent = 'Message sent successfully!';
        formFeedback.style.color = '#4caf50'; // Green color for success

        // Simulate form submission delay
        setTimeout(() => {
            contactForm.reset(); // Clear form fields
            formFeedback.textContent = '';
        }, 1000);
    } else {
        formFeedback.textContent = 'Please correct the errors above.';
        formFeedback.style.color = '#f44336'; // Red color for errors
    }
});
