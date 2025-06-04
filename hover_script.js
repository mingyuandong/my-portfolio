// JavaScript to handle image hover effects for all project buttons
document.addEventListener('DOMContentLoaded', function() {
    // Get all images with the hover-swap class
    const hoverImages = document.querySelectorAll('.hover-swap');
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return (window.innerWidth <= 768);
    }
    
    // Add event listeners to each project card
    document.querySelectorAll('.project-card').forEach(card => {
        // Find the hover-swap image within this card
        const img = card.querySelector('.hover-swap');
        
        if (img) {
            const defaultSrc = img.getAttribute('data-default-src');
            const hoverSrc = img.getAttribute('data-hover-src');
            let isGifPlaying = false;
            let gifTimeout = null;
            
            // Function to handle GIF playback and return to default image
            function playGifOnce() {
                if (hoverSrc && !isGifPlaying) {
                    isGifPlaying = true;
                    img.src = hoverSrc;
                    
                    // Create a new Image to detect when the GIF has played once
                    const tempImg = new Image();
                    tempImg.src = hoverSrc;
                    
                    // For GIFs, we need to estimate the duration
                    // Most GIFs in the project are around 2-3 seconds
                    // Using 3 seconds as a safe estimate
                    gifTimeout = setTimeout(() => {
                        img.src = defaultSrc;
                        isGifPlaying = false;
                    }, 3000); // 3 seconds for GIF to play once
                }
            }
            
            // Mobile: Implement IntersectionObserver for automatic GIF playback
            if (isMobileDevice()) {
                // Create an intersection observer to detect when image is fully visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        // If image is fully visible on screen
                        if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
                            // Wait 1 second before playing GIF
                            setTimeout(() => {
                                playGifOnce();
                            }, 1000);
                        }
                    });
                }, {
                    threshold: 0.9 // 90% of the element must be visible
                });
                
                // Start observing the image
                observer.observe(img);
                
                // Fix for mobile browser back button issue
                // Store the image source in sessionStorage before navigating away
                card.addEventListener('click', function() {
                    sessionStorage.setItem('lastClickedImage', img.src);
                });
                
                // Check if we need to restore image on page load
                if (sessionStorage.getItem('lastClickedImage')) {
                    img.src = defaultSrc; // Ensure image is visible
                    sessionStorage.removeItem('lastClickedImage');
                }
            } else {
                // Desktop: Add mouseenter event to change to hover image and play GIF once
                card.addEventListener('mouseenter', function() {
                    playGifOnce();
                });
                
                // Add mouseleave event to change back to default image and clear timeout
                card.addEventListener('mouseleave', function() {
                    if (gifTimeout) {
                        clearTimeout(gifTimeout);
                    }
                    if (defaultSrc) {
                        img.src = defaultSrc;
                        isGifPlaying = false;
                    }
                });
            }
        }
    });
});
