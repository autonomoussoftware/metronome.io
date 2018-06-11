
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