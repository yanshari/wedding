document.addEventListener('DOMContentLoaded', function() {

    // --- Automatic Gallery Page Generation ---
    const totalImages = 100; // The total number of images you have
    const galleryPages = [];

    for (let i = 1; i <= totalImages; i += 3) {
        const page = {
            main: {
                src: `images/section5/${i}.jpg`,
                caption: 'Our Memories',
                subCaption: `Image ${i}`
            },
            topRight: {
                src: `images/section5/${(i + 1) <= totalImages ? (i + 1) : 1}.jpg`,
                caption: 'Making History',
                subCaption: `Image ${(i + 1) <= totalImages ? (i + 1) : 1}`
            },
            bottomRight: {
                src: `images/section5/${(i + 2) <= totalImages ? (i + 2) : 2}.jpg`,
                caption: 'Good Times',
                subCaption: `Image ${(i + 2) <= totalImages ? (i + 2) : 2}`
            }
        };
        galleryPages.push(page);
    }
    // --- End of Generation ---


    // Get references to HTML elements
    const mainItem = document.getElementById('main-gallery-item');
    const mainImg = document.getElementById('main-gallery-img');
    const mainCaption = document.getElementById('main-gallery-caption');
    const mainSubCaption = document.getElementById('main-gallery-subcaption');

    const topRightItem = document.getElementById('top-right-item');
    const topRightImg = document.getElementById('top-right-img');
    const topRightCaption = document.getElementById('top-right-caption');
    const topRightSubCaption = document.getElementById('top-right-subcaption');

    const bottomRightItem = document.getElementById('bottom-right-item');
    const bottomRightImg = document.getElementById('bottom-right-img');
    const bottomRightCaption = document.getElementById('bottom-right-caption');
    const bottomRightSubCaption = document.getElementById('bottom-right-subcaption');

    const paginationContainer = document.getElementById('gallery-pagination-container');
    let currentPageIndex = 0;

    // --- NEW: Function to manage sliding pagination dots ---
    function updatePaginationDots() {
        paginationContainer.innerHTML = ''; // Clear existing dots
        const maxVisibleDots = 5;
        const totalPages = galleryPages.length;

        if (totalPages <= maxVisibleDots) {
            // If total pages are 5 or less, show all of them
            for (let i = 0; i < totalPages; i++) {
                createDot(i);
            }
        } else {
            // Calculate the window of dots to display
            let start = currentPageIndex - Math.floor(maxVisibleDots / 2);
            let end = currentPageIndex + Math.floor(maxVisibleDots / 2);

            // Adjust window if it's near the beginning
            if (start < 0) {
                start = 0;
                end = maxVisibleDots - 1;
            }
            // Adjust window if it's near the end
            if (end >= totalPages) {
                end = totalPages - 1;
                start = end - maxVisibleDots + 1;
            }

            for (let i = start; i <= end; i++) {
                createDot(i);
            }
        }
    }

    // Helper function to create a single dot
    function createDot(index) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (index === currentPageIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            updateGallery(index);
        });
        paginationContainer.appendChild(dot);
    }

    // Main function to update the gallery content
    function updateGallery(pageIndex) {
        if (pageIndex < 0 || pageIndex >= galleryPages.length) return;

        currentPageIndex = pageIndex; // Set the current index first
        const pageData = galleryPages[pageIndex];

        // Update main image content
        mainItem.href = pageData.main.src;
        mainImg.src = pageData.main.src;
        mainCaption.textContent = pageData.main.caption;
        mainSubCaption.textContent = pageData.main.subCaption;

        // Update top right image content
        topRightItem.href = pageData.topRight.src;
        topRightImg.src = pageData.topRight.src;
        topRightCaption.textContent = pageData.topRight.caption;
        topRightSubCaption.textContent = pageData.topRight.subCaption;

        // Update bottom right image content
        bottomRightItem.href = pageData.bottomRight.src;
        bottomRightImg.src = pageData.bottomRight.src;
        bottomRightCaption.textContent = pageData.bottomRight.caption;
        bottomRightSubCaption.textContent = pageData.bottomRight.subCaption;

        // Update the pagination dots display
        updatePaginationDots();
    }

    // Load the initial gallery page
    updateGallery(0);
});