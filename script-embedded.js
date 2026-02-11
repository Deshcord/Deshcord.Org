// ===================================
// DONOR DATA - EDIT THIS SECTION
// ===================================

// Named/Anonymous Donors (shows on wall and rotation)
const namedDonors = [
    {
        name: "Md. Rahman Khan",
        amount: 15000,
        date: "2024-01-20",
        message: "For the children's education",
        anonymous: false
    },
    {
        name: "Ayesha Siddiqua",
        amount: 10000,
        date: "2024-01-25",
        message: "In memory of my mother",
        anonymous: false
    },
    {
        name: "Anonymous Supporter",
        amount: 8000,
        date: "2024-02-01",
        message: "Every child deserves a meal",
        anonymous: true
    },
    {
        name: "Kamal Hossain",
        amount: 7500,
        date: "2024-02-08",
        message: "Keep up the great work!",
        anonymous: false
    }
];

// Silent Donations (just amounts - no names, no display)
const silentDonations = [
    500,
    1000,
    10,
    200,
    750,
    2500
];

// ===================================
// AUTOMATIC CALCULATIONS - DON'T EDIT BELOW
// ===================================

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Animate the stats counters
function animateCounter(elementId, targetValue, duration = 2000, prefix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(currentValue).toLocaleString();
    }, 16);
}

// Load and rotate donors
let currentDonorIndex = 0;

function loadDonorsForRotation() {
    // Calculate totals
    const namedTotal = namedDonors.reduce((sum, donor) => sum + donor.amount, 0);
    const silentTotal = silentDonations.reduce((sum, amount) => sum + amount, 0);
    const totalRaised = namedTotal + silentTotal;
    
    // Update counters
    animateCounter('moneyRaised', totalRaised, 2000, '$');
    animateCounter('peopleHelped', 5420, 2000);
    animateCounter('volunteers', 234, 2000);
    
    // Update navbar total raised
    const navbarAmount = document.querySelector('.navbar-raised-amount');
    if (navbarAmount) {
        let current = 0;
        const increment = totalRaised / 125;
        const timer = setInterval(() => {
            current += increment;
            if (current >= totalRaised) {
                current = totalRaised;
                clearInterval(timer);
            }
            navbarAmount.textContent = '$' + Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Start rotating donors (only named donors)
    if (namedDonors.length > 0) {
        rotateDonor();
        setInterval(rotateDonor, 3000); // Change every 3 seconds
    }
}

function rotateDonor() {
    const donorNameElement = document.querySelector('.donor-name-rotating');
    if (!donorNameElement || namedDonors.length === 0) return;
    
    const donor = namedDonors[currentDonorIndex];
    const displayName = donor.anonymous ? 'Anonymous Supporter' : donor.name;
    const amount = '$' + donor.amount.toLocaleString();
    
    // Fade out
    donorNameElement.style.opacity = '0';
    
    setTimeout(() => {
        donorNameElement.textContent = `${displayName} - ${amount}`;
        // Fade in
        donorNameElement.style.opacity = '1';
    }, 300);
    
    currentDonorIndex = (currentDonorIndex + 1) % namedDonors.length;
}

// Donation Modal
const donateButtons = document.querySelectorAll('a[href="#donate"]');
const modal = document.getElementById('donationModal');
const closeModal = document.querySelector('.close-modal');

donateButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const textToCopy = button.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            const originalText = button.textContent;
            button.textContent = '✓ Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Copied: ' + textToCopy);
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#donate') return; // Skip donate links, handled by modal
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDonorsForRotation();
});

// Export data for donor page
if (typeof window !== 'undefined') {
    window.donorData = {
        namedDonors: namedDonors,
        silentDonations: silentDonations
    };
}
