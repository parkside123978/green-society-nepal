// This function runs once the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle Logic ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }


    // --- Scroll Reveal Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-slide-up');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Unobserve after animation to save resources
                    // observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }


    // --- Modal Lightbox Gallery Logic ---
    const modal = document.getElementById('gallery-modal');
    // IMPORTANT: If the modal element doesn't exist on the current page, stop running this gallery code.
    if (!modal) {
        return; 
    }

    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const galleryButtons = document.querySelectorAll('.btn-view-gallery');

    let currentImages = [];
    let currentIndex = 0;

    function showImage(index) {
        if (currentImages[index]) {
            modalImage.src = currentImages[index].trim(); // .trim() removes any accidental whitespace
        }
    }

    function openModal(images) {
        currentImages = images;
        currentIndex = 0;
        showImage(currentIndex);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    galleryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.project-detail-card');
            const imagesString = card.dataset.images;
            if (imagesString) {
                const images = imagesString.split(',');
                openModal(images);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Close if clicking on the dark overlay
            closeModal();
        }
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showImage(currentIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
    
});