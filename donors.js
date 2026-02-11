// Get data from script.js (embedded data)
let allDonors = [];
let silentTotal = 0;

// Load donors data from embedded script
async function loadDonors() {
    try {
        // Get data from window.donorData (set by script.js)
        if (window.donorData) {
            allDonors = window.donorData.namedDonors;
            const silentDonations = window.donorData.silentDonations;
            silentTotal = silentDonations.reduce((sum, amount) => sum + amount, 0);
        } else {
            // Fallback: try to fetch from JSON files
            const response = await fetch('donors.json');
            allDonors = await response.json();
            
            try {
                const silentResponse = await fetch('silent-donations.json');
                const silentData = await silentResponse.json();
                silentTotal = silentData.silentDonations.reduce((sum, amount) => sum + amount, 0);
            } catch (error) {
                console.log('No silent donations file found');
                silentTotal = 0;
            }
        }
        
        // Calculate and update stats
        updateStats();
        
        // Display top donors
        displayTopDonors();
        
        // Display all donors
        displayAllDonors(allDonors);
        
    } catch (error) {
        console.error('Error loading donors:', error);
        document.getElementById('donorsGrid').innerHTML = '<p class="error-message">Unable to load donor information. Please try again later.</p>';
    }
}

// Update statistics
function updateStats() {
    const totalDonors = allDonors.length;
    const namedTotal = allDonors.reduce((sum, donor) => sum + donor.amount, 0);
    const grandTotal = namedTotal + silentTotal;
    const livesChanged = Math.floor(grandTotal / 100) * 5;
    
    animateNumber('totalDonors', totalDonors);
    animateNumber('totalAmountDonated', grandTotal, true);
    animateNumber('totalLivesChanged', livesChanged);
}

// Animate number counting
function animateNumber(elementId, finalValue, isCurrency = false) {
    const element = document.getElementById(elementId);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = finalValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
            current = finalValue;
            clearInterval(timer);
        }
        
        if (isCurrency) {
            element.textContent = '$' + Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, duration / steps);
}

// Display top 3 donors on podium
function displayTopDonors() {
    const topDonors = [...allDonors]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);
    
    const podium = document.getElementById('topDonorsPodium');
    
    if (topDonors.length === 0) {
        podium.innerHTML = '<p class="no-donors">Be the first to donate!</p>';
        return;
    }
    
    // Reorder for podium effect: 2nd, 1st, 3rd
    const podiumOrder = [topDonors[1], topDonors[0], topDonors[2]].filter(Boolean);
    const medals = ['🥈', '🥇', '🥉'];
    const positions = ['second', 'first', 'third'];
    
    podium.innerHTML = podiumOrder.map((donor, index) => `
        <div class="podium-card ${positions[index]}">
            <div class="podium-medal">${medals[index]}</div>
            <div class="podium-rank">#${index === 1 ? 1 : index === 0 ? 2 : 3}</div>
            <div class="podium-name">${donor.anonymous ? 'Anonymous Supporter' : donor.name}</div>
            <div class="podium-amount">$${donor.amount.toLocaleString()}</div>
            ${donor.message ? `<div class="podium-message">"${donor.message}"</div>` : ''}
            <div class="podium-date">${formatDate(donor.date)}</div>
        </div>
    `).join('');
}

// Display all donors
function displayAllDonors(donors) {
    const grid = document.getElementById('donorsGrid');
    
    if (donors.length === 0) {
        grid.innerHTML = '<p class="no-donors">No donors to display yet. Be the first!</p>';
        return;
    }
    
    grid.innerHTML = donors.map(donor => `
        <div class="donor-card">
            <div class="donor-icon">🤝</div>
            <div class="donor-info">
                <div class="donor-name">${donor.anonymous ? '🔒 Anonymous Supporter' : donor.name}</div>
                <div class="donor-amount">$${donor.amount.toLocaleString()}</div>
                ${donor.message ? `<div class="donor-message">"${donor.message}"</div>` : ''}
                <div class="donor-date">📅 ${formatDate(donor.date)}</div>
            </div>
        </div>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Sort donors
function sortDonors(sortBy) {
    let sorted = [...allDonors];
    
    switch(sortBy) {
        case 'amount':
            sorted.sort((a, b) => b.amount - a.amount);
            break;
        case 'recent':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'name':
            sorted.sort((a, b) => {
                const nameA = a.anonymous ? 'Anonymous Supporter' : a.name;
                const nameB = b.anonymous ? 'Anonymous Supporter' : b.name;
                return nameA.localeCompare(nameB);
            });
            break;
    }
    
    displayAllDonors(sorted);
}

// Search donors
function searchDonors(query) {
    const filtered = allDonors.filter(donor => {
        const name = donor.anonymous ? 'Anonymous Supporter' : donor.name;
        return name.toLowerCase().includes(query.toLowerCase());
    });
    
    displayAllDonors(filtered);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load donors
    loadDonors();
    
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            sortDonors(currentSort);
        });
    });
    
    // Search
    const searchInput = document.getElementById('donorSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchDonors(e.target.value);
        });
    }
});
