window.onload = function() {
  var scroll = $(window).scrollTop();
  if (scroll == 0) {
      $('.navbar').addClass('top');
  }
}

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (scroll == 0) {
      $('.navbar').addClass('top');
  } else {
      $('.navbar').removeClass('top');
  }
});


jQuery(function($) {

  // Check our viewport width and set a var
  var viewportWidth = $(window).width();
  // console.log(viewportWidth);

  if ((viewportWidth) >= 768 ) {
    var navHeight = 105;
  } else {
    var navHeight = 65;
  }

  $( window ).resize(function() {
    // Check our viewport width and set a var
    var viewportWidth = $(window).width();
    // console.log(viewportWidth);

    if ((viewportWidth) >= 768 ) {
      var navHeight = 105;
    } else {
      var navHeight = 65;
    }
  });

  // Particle Top
  particlesJS.load('top-particle', '/json/particlesjs-config.json', function() {
    // console.log('callback - top particles.js config loaded');
  });


  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

  // Add animation triggers to the site-sections
  var win = $(window);
  var allSects = $(".site-section");

  allSects.each(function(i, el) {
    var el = $(el);
    if (el.visible(true).top + navHeight) {
      el.addClass("already-visible");
    }
  });

  win.scroll(function(event) {
    allSects.each(function(i, el) {
      var el = $(el);
      if (el.visible(true)) {
        el.addClass("come-in");
      }
    });
  });



  // Animate the timeline once.

  $('.timeline').scrollLeft($('.timeline').width());


});

(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

    var $t            = $(this),
        $w            = $(window),
        viewTop       = $w.scrollTop(),
        viewBottom    = viewTop + $w.height(),
        _top          = $t.offset().top,
        _bottom       = _top + $t.height(),
        compareTop    = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

var win = $(window);

var allMods = $(".team-grid-member");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  }
});

win.scroll(function(event) {

  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("slide-up");
    }
  });

});