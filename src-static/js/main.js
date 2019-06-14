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
    return { width: e[a + 'Width'], height: e[a + 'Height'] }
  }
  $windowWidth = viewport().width

  /* Handle resizing header on scroll */
  $(window)
    .resize(function() {
      if ($windowWidth >= 992) {
        var navbar = $('.navbar')
        var origOffsetY = navbar.offset().top

        function scroll() {
          if ($(window).scrollTop() >= origOffsetY) {
            $('header#masthead').addClass('scrolled fixed-top')
            $('body').css('padding-top', '110px')
          } else {
            $('header#masthead').removeClass('scrolled fixed-top')
            $('body').css('padding-top', '0')
          }
        }
        document.onscroll = scroll
      }
    })
    .resize()

  /* Initialize main nav toggle */
  $('.toggler').on('click', function() {
    $(this).toggleClass('is-active')
  })
})
