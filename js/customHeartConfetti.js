(function() {
    const colors = ['#ff6b6b','#ff4757','#ff7f50','#ff1493','#ff69b4'];
    const maxHearts = 5; // Max hearts per scroll event

    window.addEventListener('scroll', () => {
        for (let i = 0; i < maxHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';

            // Random horizontal position
            heart.style.left = Math.random() * window.innerWidth + 'px';

            // Random color
            heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random size
            const size = 12 + Math.random() * 16; // 12px to 28px
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';

            // Random animation duration
            const duration = 1.5 + Math.random() * 1.5; // 1.5s to 3s
            heart.style.animationDuration = duration + 's';

            document.body.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
    });
})();
