document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.querySelector('.hamburger');
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Sticky Navigation Bar & Active Link Highlighting
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight; // Account for sticky header
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > header.offsetHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        highlightActiveLink();
    });

    // Initial highlight on load
    highlightActiveLink();


    // Hamburger Menu for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Scroll-to-top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Dark/Light Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    } else {
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            sunIcon.classList.remove('active');
            moonIcon.classList.add('active');
        } else {
            localStorage.setItem('theme', 'light');
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }
    });

    // Contact Form Validation (Client-side JavaScript only)
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('invalid'));

        // Name validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            document.getElementById('name-error').textContent = 'Name is required.';
            nameInput.classList.add('invalid');
            isValid = false;
        }

        // Email validation
        const emailInput = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            document.getElementById('email-error').textContent = 'Email is required.';
            emailInput.classList.add('invalid');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            emailInput.classList.add('invalid');
            isValid = false;
        }

        // Message validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            document.getElementById('message-error').textContent = 'Message is required.';
            messageInput.classList.add('invalid');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            document.getElementById('message-error').textContent = 'Message must be at least 10 characters long.';
            messageInput.classList.add('invalid');
            isValid = false;
        }

        if (isValid) {
            // If validation passes, you can simulate a submission or send data (e.g., to an API)
            alert('Form submitted successfully! (This is a demo, no actual submission)');
            contactForm.reset(); // Clear the form
        }
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    const skillsSection = document.getElementById('skills');

    const animateSkills = () => {
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) { // When 75% of the section is visible
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.setProperty('--skill-level-width', width); // Set custom property for animation
                bar.style.animation = 'fillSkillBar 1.5s ease-out forwards';
            });
            window.removeEventListener('scroll', animateSkills); // Remove listener after animation
        }
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Run on load in case section is already in view
});