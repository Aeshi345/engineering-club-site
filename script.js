// Lightbox Gallery Functionality
let currentImageIndex = 0;
let currentImageSet = [];
let pageInitialized = false;
let lightboxSource = 'gallery'; // Track which page the lightbox came from

function initPage() {
    if (!pageInitialized) {
        pageInitialized = true;

        // Get all gallery images
        const galleryImages = Array.from(document.querySelectorAll('.gallery-grid img'));
        
        // Get all event detail images
        const eventImages = Array.from(document.querySelectorAll('.event-images img'));

        // Add click handlers to gallery images
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                currentImageSet = galleryImages;
                lightboxSource = 'gallery';
                openLightbox(index);
            });
        });

        // Add click handlers to event images
        eventImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                currentImageSet = eventImages;
                lightboxSource = 'event';
                openLightbox(index);
            });
        });

        // Set total images count if the counter exists
        const totalImagesEl = document.getElementById('total-images');
        if (totalImagesEl) {
            totalImagesEl.textContent = galleryImages.length;
        }

        // Lightbox controls only if the lightbox exists
        const lightbox = document.getElementById('lightbox');
        const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
        const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
        const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

        if (lightbox && closeBtn && prevBtn && nextBtn) {
            closeBtn.addEventListener('click', closeLightbox);

            prevBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex - 1 + currentImageSet.length) % currentImageSet.length;
                updateLightboxImage();
            });

            nextBtn.addEventListener('click', function() {
                currentImageIndex = (currentImageIndex + 1) % currentImageSet.length;
                updateLightboxImage();
            });

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('active')) return;
                
                if (e.key === 'ArrowLeft') {
                    currentImageIndex = (currentImageIndex - 1 + currentImageSet.length) % currentImageSet.length;
                    updateLightboxImage();
                } else if (e.key === 'ArrowRight') {
                    currentImageIndex = (currentImageIndex + 1) % currentImageSet.length;
                    updateLightboxImage();
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        }
    }

    setupScrollReveal();
}

if (document.readyState !== 'loading') {
    initPage();
} else {
    document.addEventListener('DOMContentLoaded', initPage);
}

window.addEventListener('pageshow', initPage);

function setupScrollReveal() {
    const revealElements = document.querySelectorAll('section, .joinCard, .gallery img, .eventCard, .about img, .videoSection video, .event-images img');
    if (!revealElements.length) return;

    revealElements.forEach(el => {
        el.classList.remove('visible');
        el.classList.add('reveal');
    });

    void document.documentElement.offsetHeight;

    const revealCallback = (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
                obs.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(el => observer.observe(el));
    revealCallback(observer.takeRecords(), observer);
}

function openLightbox(index) {
    currentImageIndex = index;

    const lightbox = document.getElementById('lightbox');
    const totalImagesEl = document.getElementById('total-images');

    if (totalImagesEl) {
        totalImagesEl.textContent = currentImageSet.length;
    }

    lightbox.classList.add('active');
    updateLightboxImage();

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById('lightbox-image');
    const currentImageEl = document.getElementById('current-image');
    
    lightboxImg.src = currentImageSet[currentImageIndex].src;
    currentImageEl.textContent = currentImageIndex + 1;
}
