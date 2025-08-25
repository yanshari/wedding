(function ($) {
	'use strict';

	// Initialize gallery popup
	$('.image-popup-gallery').magnificPopup({
		type: 'inline',
		mainClass: 'mfp-with-zoom',
		items: {
			src: '#gallery-modal'
		},
		callbacks: {
			open: function() {
				$('body').addClass('mfp-active');
			},
			close: function() {
				$('body').removeClass('mfp-active');
			}
		}
	});

	// Handle clicks on grid items
	$(document).on('click', '.grid-item', function() {
		var imgSrc = $(this).find('img').attr('src');
		$.magnificPopup.open({
			items: {
				src: imgSrc
			},
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom',
			zoom: {
				enabled: true,
				duration: 300
			}
		});
	});

})(jQuery);

// Initialize gallery popup
$('.image-popup-gallery').magnificPopup({
	type: 'inline',
	mainClass: 'mfp-with-zoom',
	items: {
		src: '#gallery-modal'
	},
	callbacks: {
		open: function() {
			$('body').addClass('mfp-active');
			// Get the title from the clicked element
			var clickedTitle = $(this.st.el).find('h2').text();
			// Update the modal title
			$('.modal-title h2').text(clickedTitle);

			// Get the folder name based on which thumbnail was clicked
			var folderName = '';
			switch(clickedTitle) {
				case 'Two Chubbies':
					folderName = 'one';
					break;
				case 'Disney Sea':
					folderName = 'two';
					break;
				case 'Peace!':
					folderName = 'three';
					break;
				case 'Bears':
					folderName = 'four';
					break;
				case 'Look!':
					folderName = 'five';
					break;
				case 'Woooooo':
					folderName = 'six';
					break;
                case 'And Me':
                    folderName = 'seven';
                    break;
                case 'Flowers and ~!':
                    folderName = 'eight';
                    break;
                case 'Beach':
                    folderName = 'nine';
                    break;
			}

			// Clear existing gallery content
			$('.gallery-grid-container').empty();

			// Create an array with image numbers (assuming you have numbered your images)
			// Adjust the range based on how many images you have in each folder
			const imageCount = 9; // Change this number based on how many images you have
			const images = Array.from({length: imageCount}, (_, i) => i + 1)
				.map(num => `images/gallery/modal-gallery/${folderName}/${num}.jpg`);

			// Create grid rows for every 3 images
			for(let i = 0; i < images.length; i += 3) {
				let row = $('<div class="gallery-grid-row"></div>');

				// Add up to 3 images in this row
				for(let j = i; j < Math.min(i + 3, images.length); j++) {
					// Create image element with error handling
					const img = new Image();
					img.src = images[j];

					// Only add the image if it loads successfully
					img.onload = function() {
						row.append(`
                            <div class="grid-item">
                                <img src="${images[j]}" alt="Gallery Image ${j + 1}">
                            </div>
                        `);
					};
				}

				$('.gallery-grid-container').append(row);
			}
		},
		close: function() {
			$('body').removeClass('mfp-active');
		}
	}
});

// Handle clicks on grid items (for image zoom)
$(document).on('click', '.grid-item', function() {
	var imgSrc = $(this).find('img').attr('src');
	$.magnificPopup.open({
		items: {
			src: imgSrc
		},
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300
		}
	});
});







































;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	
	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
	});


}());