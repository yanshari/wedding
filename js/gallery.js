(function ($) {
    'use strict';

    // Handle clicks on grid items
    $(document).on('click', '.grid-item', function (e) {
        e.preventDefault();
        const $img = $(this).find('img');
        const imgSrc = $img.attr('src').trim();

        $.magnificPopup.open({
            items: {
                src: imgSrc,
                type: 'image'
            },
            closeOnContentClick: true,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom',
            image: {
                verticalFit: true // ensure image fits viewport height
            },
            zoom: {
                enabled: true,
                duration: 300
            },
            opener: function () {
                return $img; // always return the actual <img>
            }
            // 👇 this reopens the inline popup after you close the image
            // callbacks: {
            //     close: function () {
            //         $.magnificPopup.open({
            //             items: {
            //                 src: '#memories-modal'
            //             },
            //             type: 'inline',
            //             mainClass: 'mfp-with-zoom'
            //         });
            //     }
            // }
        });
    });

})(jQuery);

// Initialize memories popup
$('.image-popup-memories').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-with-zoom',
    items: {
        src: '#memories-modal'
    },
    callbacks: {
        open: function () {
            $('body').addClass('mfp-active');
            // Get the title from the clicked element
            var clickedTitle = $(this.st.el).find('h2').text();
            // Update the modal title
            $('.modal-title h2').text(clickedTitle);

            // Get the folder name based on which thumbnail was clicked
            var folderName = '';
            switch (clickedTitle) {
                case 'Two Chubbies': folderName = 'one'; break;
                case 'Disney Sea': folderName = 'two'; break;
                case 'Peace!': folderName = 'three'; break;
                case 'Bears': folderName = 'four'; break;
                case 'Look!': folderName = 'five'; break;
                case 'Woooooo': folderName = 'six'; break;
                case 'And Me': folderName = 'seven'; break;
                case 'Flowers and ~!': folderName = 'eight'; break;
                case 'Beach': folderName = 'nine'; break;
            }

            // Clear existing memories content
            $('.memories-grid-container').empty();

            const imageCount = 8; // Change based on how many images you have
            const images = Array.from({ length: imageCount }, (_, i) => i + 1)
                .map(num => `images/gallery/modal-gallery/${folderName}/${num}.jpg`);

            images.forEach((src, idx) => {
                const img = new Image();
                img.src = src;
                img.onload = function () {
                    $('.memories-grid-container').append(`
            <div class="grid-item">
              <img src="${src}" alt="Gallery Image ${idx + 1}">
            </div>
          `);
                };
            });
        },
        close: function () {
            $('body').removeClass('mfp-active');
        }
    }
});
