// JavaScript to handle image hover effects for all project buttons
document.addEventListener('DOMContentLoaded', function() {
    // Get all images with the hover-swap class
    const hoverImages = document.querySelectorAll('.hover-swap');
    
    // Add event listeners to each project card
    document.querySelectorAll('.project-card').forEach(card => {
        // Find the hover-swap image within this card
        const img = card.querySelector('.hover-swap');
        
        if (img) {
            const defaultSrc = img.getAttribute('data-default-src');
            const hoverSrc = img.getAttribute('data-hover-src');
            
            // Add mouseenter event to change to hover image
            card.addEventListener('mouseenter', function() {
                if (hoverSrc) {
                    img.src = hoverSrc;
                }
            });
            
            // Add mouseleave event to change back to default image
            card.addEventListener('mouseleave', function() {
                if (defaultSrc) {
                    img.src = defaultSrc;
                }
            });
        }
    });
});
