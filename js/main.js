//
// Custom JavaScript for the Wedding Website
//

document.addEventListener('DOMContentLoaded', function() {

    // Example: Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if the link points to a section ID
            if(this.hash.length > 0) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});


//
// Custom JavaScript for the Wedding Website
//

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for internal links (keep this)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.hash.length > 0) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // COUNTDOWN TIMER LOGIC
    // ===================================
    const countdownEl = document.getElementById('countdown-timer');
    // Set the date we're counting down to: November 11, 2025
    const countdownDate = new Date("Nov 11, 2025 00:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countdownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element
        countdownEl.innerHTML =
            `<span class="timer-segment">${days}<small>Days</small></span>` +
            `<span class="timer-separator">:</span>` +
            `<span class="timer-segment">${hours}<small>Hours</small></span>` +
            `<span class="timer-separator">:</span>` +
            `<span class="timer-segment">${minutes}<small>Mins</small></span>` +
            `<span class="timer-separator">:</span>` +
            `<span class="timer-segment">${seconds}<small>Secs</small></span>`;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            countdownEl.innerHTML = `<span class="h4 text-danger">THE DAY IS HERE!</span>`;
        }
    }, 1000);

});

// js/main.js (Add this function to the bottom of the DOMContentLoaded block)

// ===================================
// SCRAPBOOK SCROLL ANIMATION LOGIC
// ===================================
const timelineItems = document.querySelectorAll('.timeline-item');

const observerOptions = {
    root: null, // relative to viewport
    rootMargin: '0px',
    threshold: 0.5 // trigger when 50% of the item is visible
};

const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('timeline-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// You also need to add the initial hidden state and animation to CSS:
// See below for the required CSS to add to section2-story.css