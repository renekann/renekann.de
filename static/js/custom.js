"use strict";

(function($) {
  if ($("#typed-strings").length) {
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
  }

  $(".color-mode").click(function() {
    changeModeText();
  });

  setColorScheme();

  function changeModeText() {
    if ($("body").hasClass("dark-mode")) {
      activateLightMode();
    } else {
      activateDarkMode();
    }
  }

  function activateDarkMode() {
    $("body").addClass("dark-mode");
    $(".color-mode-icon").addClass("active");
    $(".color-mode-text").html("Show light mode");
    $(".color-mode-icon")
      .removeClass("fa-moon")
      .addClass("fa-sun");
  }

  function activateLightMode() {
    $("body").removeClass("dark-mode");
    $(".color-mode-icon").removeClass("active");
    $(".color-mode-text").html("Show dark mode");
    $(".color-mode-icon")
      .removeClass("fa-sun")
      .addClass("fa-moon");
  }

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

  function setColorScheme() {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const isLightMode = window.matchMedia("(prefers-color-scheme: light)")
      .matches;
    const isNotSpecified = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches;
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(e => e.matches && activateDarkMode());
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addListener(e => e.matches && activateLightMode());

    if (isDarkMode) activateDarkMode();
    if (isLightMode) activateLightMode();
    if (isNotSpecified || hasNoSupport) {
      var now = new Date();
      var hour = now.getHours();
      if (hour < 4 || hour >= 16) {
        activateDarkMode();
      }
    }
  }
})(jQuery);
