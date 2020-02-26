$(document).ready(function($) {
	/**
	 * Gets a measurement of the viewport that meshes with what is used by CSS
	 * media queries.
	 *
	 * Webkit browsers overlay the scrollbar on the window, while Gecko
	 * browsers put the scrollbar beside. Both of these behaviors are slightly
	 * different than what is used by CSS media queries...
	 */
	function viewport() {
		var e = window,
			a = 'inner'
		if (!window.hasOwnProperty('innerWidth')) {
			a = 'client'
			e = document.documentElement || document.body
		}
		return {
			width: e[a + 'Width'],
			height: e[a + 'Height']
		}
	}

	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]').not('[href="#0"]').not('[href="#medium"]').not('[href="#latest"]').click(function(event) {
			// On-page links
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate({
						scrollTop: target.offset().top - 100
					}, 500, function() {
						// Callback after animation
						// Must change focus!
						var $target = $(target);
						$target.focus();
						if ($target.is(":focus")) { // Checking if the target was focused
							return false;
						} else {
							$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
							$target.focus(); // Set focus again
						};
					});
				}
			}
		});

	/* Handle resizing header on scroll */
	$(window).resize(function() {
		var navbar = $('.navbar')
		var origOffsetY = navbar.offset().top

		function scroll() {
			if ($(window).scrollTop() >= 40) { //Updated to hard 40px to accomodate scrolling marquee
				$('header#masthead').addClass('scrolled fixed-top')
				$('body').addClass('scrolled')
			} else {
				$('header#masthead').removeClass('scrolled')
				$('body').removeClass('scrolled')
			}
		}
		document.onscroll = scroll
	}).resize()


	/* Initialize main nav toggle */
	$('.toggler').on('click', function() {
		$(this).toggleClass('is-active')
		$('.site-header').toggleClass('cover');
	})

	/* Slick Init */
	$('.news-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.milestone-slider').slick({
		infinite: true,
		slide: 'div',
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.chainhop-slider').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	/* Typewriter :: https://github.com/mattboldt/typed.js/ */

	if(  typeof Typed === "function" ) {

		var typed = new Typed("#typed", {
			stringsElement: '#typed-strings',
			typeSpeed: 50,
			backSpeed: 10,
			backDelay: 3000,
			smartBackspace: true,
			loop: false,
		});

		/* Subhead rotating text (sync's with typing text) */
	    var quotes = $(".quotes");
	    var quoteNum = quotes.length - 1;
	    var quoteIndex = -1;

	    function showNextQuote() {
			quoteIndex++;

	        if (quoteIndex == 0) {
		       quotes.eq(quoteIndex % quotes.length)
		            .fadeIn(500)
		            .delay(3800)
		            .fadeOut(500, showNextQuote);
			} else if (quoteIndex == quoteNum) {
			     quotes.eq(quoteIndex % quotes.length)
		            .fadeIn(500);
			} else {
			     quotes.eq(quoteIndex % quotes.length)
		            .fadeIn(500)
		            .delay(3000)
		            .fadeOut(500, showNextQuote);
			}
	    }

	    showNextQuote();


		$('.typed-cursor').text('');

    }

});