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
	$windowWidth = viewport().width
	// Select all links with hashes
	$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]').not('[href="#0"]').click(function(event) {
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
		if ($windowWidth >= 992) {
			var navbar = $('.navbar')
			var origOffsetY = navbar.offset().top

			function scroll() {
				if ($(window).scrollTop() >= origOffsetY) {
					$('header#masthead').addClass('scrolled fixed-top')
					$('body').addClass('scrolled')
				} else {
					$('header#masthead').removeClass('scrolled fixed-top')
					$('body').removeClass('scrolled')
				}
			}
			document.onscroll = scroll
		}
	}).resize()
	/* Initialize main nav toggle */
	$('.toggler').on('click', function() {
		$(this).toggleClass('is-active')
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
					slidesToShow: 5
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
});