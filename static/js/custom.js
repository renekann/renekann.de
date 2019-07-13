"use strict";

(function($) {
  var typed = new Typed(".animated-info", {
    stringsElement: "#typed-strings",
    shuffle: false,
    backDelay: 2000,
    backSpeed: 20,
    typeSpeed: 40,
    startDelay: 500,
    loop: false,
    smartBackspace: true
  });

  $(".color-mode").click(function() {
    $(".color-mode-icon").toggleClass("active");
    $("body").toggleClass("dark-mode");
    changeModeText();
  });
  changeModeText();

  function changeModeText() {
    if ($("body").hasClass("dark-mode")) {
      $(".color-mode-text").html("Show Light mode");
      $(".color-mode-icon")
        .removeClass("fa-moon")
        .addClass("fa-lightbulb");
    } else {
      $(".color-mode-text").html("Show dark mode");
      $(".color-mode-icon")
        .removeClass("fa-lightbulb")
        .addClass("fa-moon");
    }
  } // SMOOTHSCROLL

  $(function() {
    $(".nav-link, .custom-btn-link, .footer-link").on("click", function(event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49
          },
          1000
        );
      event.preventDefault();
    });
  }); // TOOLTIP

  $(".social-links a").tooltip();
})(jQuery);
