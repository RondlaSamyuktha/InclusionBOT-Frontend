// Category switching functionality
function showCategory(categoryName) {
    // Hide all category sections
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected category section
    const selectedSection = document.getElementById(categoryName);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked nav button
    const clickedButton = document.querySelector(`[onclick="showCategory('${categoryName}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Smooth scroll to top of main content
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set default active category (rights)
    showCategory('rights');

    // Add click event listeners to nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showCategory(category);
        });
    });

    // Add smooth scrolling for footer links
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For now, prevent default and show alert
            // In a real application, these would link to actual resources
            e.preventDefault();
            alert('This link would take you to external resources. In a production environment, these would be properly linked.');
        });
    });

    // Add animation delay for law cards
    const lawCards = document.querySelectorAll('.law-card');
    lawCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
    const activeButton = document.querySelector('.nav-btn.active');
    const currentIndex = navButtons.indexOf(activeButton);

    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navButtons[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < navButtons.length - 1) {
        navButtons[currentIndex + 1].click();
    }
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe law cards for animations
document.addEventListener('DOMContentLoaded', function() {
    const lawCards = document.querySelectorAll('.law-card');
    lawCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});