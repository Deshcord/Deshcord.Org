/* ===========================
   CUSTOMIZATION SETTINGS
   Change these values to update your counters!
   =========================== */
const charityStats = {
    moneyRaised: 125000,      // Total money raised in dollars
    peopleHelped: 5420,       // Number of people helped
    projectsCompleted: 87,    // Number of completed projects
    volunteers: 234           // Number of active volunteers
};

/* ===========================
   ANIMATED COUNTER FUNCTION
   =========================== */
function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas
        const formattedNumber = Math.floor(current).toLocaleString();
        element.textContent = prefix + formattedNumber + suffix;
    }, 16);
}

/* ===========================
   INTERSECTION OBSERVER
   Animates counters when they come into view
   =========================== */
function initCounters() {
    const statsSection = document.querySelector('.stats-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate each counter
                const moneyElement = document.getElementById('moneyRaised');
                const peopleElement = document.getElementById('peopleHelped');
                const projectsElement = document.getElementById('projectsCompleted');
                const volunteersElement = document.getElementById('volunteers');
                
                animateCounter(moneyElement, charityStats.moneyRaised, 2000, '$', '+');
                animateCounter(peopleElement, charityStats.peopleHelped, 2000, '', '+');
                animateCounter(projectsElement, charityStats.projectsCompleted, 2000);
                animateCounter(volunteersElement, charityStats.volunteers, 2000);
                
                // Only animate once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/* ===========================
   SMOOTH SCROLLING
   =========================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/* ===========================
   CONTACT FORM HANDLER
   =========================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You can integrate with email services like Formspree, EmailJS, or Netlify Forms
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            
            // Example integration with Formspree (uncomment and add your form ID):
            // const formData = new FormData(form);
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: { 'Accept': 'application/json' }
            // }).then(response => {
            //     if (response.ok) {
            //         alert('Thank you for your message!');
            //         form.reset();
            //     }
            // });
        });
    }
}

/* ===========================
   GALLERY IMAGE LOADING
   Optional: Add custom images here
   =========================== */
function loadCustomGallery() {
    // Uncomment and customize this array to add your own images
    /*
    const customImages = [
        {
            src: 'path/to/your/image1.jpg',
            title: 'Project Title 1',
            description: 'Project description'
        },
        {
            src: 'path/to/your/image2.jpg',
            title: 'Project Title 2',
            description: 'Project description'
        }
        // Add more images here
    ];
    
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = ''; // Clear default images
    
    customImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="gallery-overlay">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
    */
}

/* ===========================
   NAVBAR SCROLL EFFECT
   =========================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
}

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/* ===========================
   INITIALIZE ALL FUNCTIONS
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
    initCounters();
    initSmoothScroll();
    initContactForm();
    initNavbarScroll();
    initMobileMenu();
    loadCustomGallery();
    initDonationModal();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

/* ===========================
   DONATION MODAL
   =========================== */
function initDonationModal() {
    const modal = document.getElementById('donationModal');
    const donateButtons = document.querySelectorAll('a[href="#donate"]');
    const closeBtn = document.querySelector('.close-modal');
    
    // Open modal when clicking donate buttons
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy. Please copy manually: ' + textToCopy);
            });
        });
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/* ===========================
   UTILITY FUNCTIONS
   =========================== */

// Function to update a specific stat dynamically
function updateStat(statName, newValue) {
    const element = document.getElementById(statName);
    if (element) {
        let prefix = '';
        let suffix = '';
        
        if (statName === 'moneyRaised') {
            prefix = '$';
            suffix = '+';
        } else if (statName === 'peopleHelped') {
            suffix = '+';
        }
        
        animateCounter(element, newValue, 1000, prefix, suffix);
    }
}

// Example usage:
// updateStat('moneyRaised', 150000);
// updateStat('peopleHelped', 6000);
