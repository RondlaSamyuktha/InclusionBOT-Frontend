// Lawyer Directory Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    animateCardsOnLoad();
});

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterLawyers(searchTerm);
    });
}

// Filter by Region
function filterByRegion(region) {
    // Update active button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));

    const clickedButton = document.querySelector(`[onclick="filterByRegion('${region}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Filter cards
    const lawyerCards = document.querySelectorAll('.lawyer-card');
    lawyerCards.forEach(card => {
        if (region === 'all') {
            card.classList.remove('hidden');
        } else {
            const cardRegion = card.getAttribute('data-region');
            if (cardRegion === region) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });

    // Smooth scroll to results
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Combined Search and Filter Function
function filterLawyers(searchTerm) {
    const lawyerCards = document.querySelectorAll('.lawyer-card');
    const activeRegion = document.querySelector('.filter-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];

    lawyerCards.forEach(card => {
        const cardRegion = card.getAttribute('data-region');
        const lawyerName = card.querySelector('h3').textContent.toLowerCase();
        const country = card.querySelector('.country').textContent.toLowerCase();
        const expertise = card.querySelector('.expertise p').textContent.toLowerCase();
        const languages = Array.from(card.querySelectorAll('.language-tag')).map(tag => tag.textContent.toLowerCase());

        // Check if card matches search term
        const matchesSearch = searchTerm === '' ||
            lawyerName.includes(searchTerm) ||
            country.includes(searchTerm) ||
            expertise.includes(searchTerm) ||
            languages.some(lang => lang.includes(searchTerm));

        // Check if card matches region filter
        const matchesRegion = activeRegion === 'all' || cardRegion === activeRegion;

        // Show/hide card based on both filters
        if (matchesSearch && matchesRegion) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Initialize Filter Buttons
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const region = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            filterByRegion(region);
        });
    });
}

// Contact Lawyer Function
function contactLawyer(name, email) {
    // Create a modal or alert for contact
    const subject = encodeURIComponent(`Gender Equality Legal Consultation - ${name}`);
    const body = encodeURIComponent(`Dear ${name},\n\nI am writing to inquire about your legal services regarding gender equality matters.\n\nPlease let me know how we can proceed with a consultation.\n\nBest regards,\n[Your Name]`);

    // For demo purposes, show an alert. In production, this would open email client
    const message = `Contact ${name}\n\nEmail: ${email}\n\nSubject: ${decodeURIComponent(subject)}\n\nA new email window will open with a pre-filled message.`;
    alert(message);

    // Open email client
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}

// View Profile Function
function viewProfile(profileId) {
    // In a real application, this would navigate to a detailed profile page
    // For demo purposes, show profile information in a modal or alert
    const lawyerCard = document.querySelector(`[data-profile="${profileId}"]`) ||
                      document.querySelector(`[onclick*="viewProfile('${profileId}')"]`).closest('.lawyer-card');

    if (lawyerCard) {
        const name = lawyerCard.querySelector('h3').textContent;
        const country = lawyerCard.querySelector('.country').textContent;
        const expertise = lawyerCard.querySelector('.expertise p').textContent;
        const experience = lawyerCard.querySelector('.experience p').textContent;

        const profileInfo = `
👤 ${name}
📍 ${country}

🎓 Expertise:
${expertise}

💼 Experience:
${experience}

📧 Click "Contact" to get in touch for legal consultation.
        `;

        alert(`Lawyer Profile:\n\n${profileInfo}`);
    }
}

// Animate Cards on Load
function animateCardsOnLoad() {
    const lawyerCards = document.querySelectorAll('.lawyer-card');

    lawyerCards.forEach((card, index) => {
        // Add a slight delay for each card
        setTimeout(() => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        }, index * 100);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    const searchInput = document.getElementById('searchInput');

    // Focus search on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }

    // Clear search on Escape
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        filterLawyers('');
    }
});

// Add smooth scrolling for anchor links
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

// Add loading states for better UX
function showLoadingState() {
    const cards = document.querySelectorAll('.lawyer-card');
    cards.forEach(card => card.classList.add('loading'));
}

function hideLoadingState() {
    const cards = document.querySelectorAll('.lawyer-card');
    cards.forEach(card => card.classList.remove('loading'));
}

// Debounce search input for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced search
const debouncedSearch = debounce(function(searchTerm) {
    filterLawyers(searchTerm);
}, 300);

// Update search functionality to use debounced version
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        debouncedSearch(searchTerm);
    });
}

// Add intersection observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe lawyer cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const lawyerCards = document.querySelectorAll('.lawyer-card');
    lawyerCards.forEach(card => {
        observer.observe(card);
    });
});

// Add error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Selector "${selector}" not found:`, error);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Selector "${selector}" not found:`, error);
        return [];
    }
}