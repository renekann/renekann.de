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

  $('.carousel').carousel({
    interval: false
  })

  setColorScheme();

  function changeModeText() {
    if ($("body").hasClass("dark-mode")) {
      activateLightMode();
    } else {
      activateDarkMode();
    }
  }

  function activateDarkMode() {
    localStorage.setItem("colormode", "dark");
    document.body.classList.add("dark-mode");
    $(".color-mode-text-dark").addClass("active");
    $(".color-mode-text-light").removeClass("active");

    $(".color-mode-icon")
      .removeClass("fa-moon")
      .addClass("fa-sun");
  }

  function activateLightMode() {
    localStorage.setItem("colormode", "light");
    document.body.classList.remove("dark-mode");
    $(".color-mode-icon").removeClass("active");
    $(".color-mode-text-light").addClass("active");
    $(".color-mode-text-dark").removeClass("active");
    $(".color-mode-icon").removeClass("fa-sun").addClass("fa-moon");
  }

  $(function() {
    $(".nav-link, .custom-btn-link, .footer-link").on("click", function(event) {
      var $anchor = $(this);
      var href =
        "#" +
        $anchor
        .attr("href")
        .split("#")
        .pop();

      $("html, body")
        .stop()
        .animate({
            scrollTop: $(href).offset().top - 55
          },
          1000
        );
      event.preventDefault();
    });
  }); // TOOLTIP

  $(".social-links a").tooltip();

  function setColorScheme() {
    var colormodePreference = localStorage.getItem("colormode");

    const shouldUseDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const shouldUseLightMode = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const canUseNoPreference = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches;

    const hasNoSupport = !shouldUseDarkMode && !shouldUseLightMode && !canUseNoPreference;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(e => e.matches && activateDarkMode());
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addListener(e => e.matches && activateLightMode());

    if (shouldUseDarkMode) activateDarkMode();
    if (shouldUseLightMode) activateLightMode();
    if (canUseNoPreference || hasNoSupport) {
      var now = new Date();
      var hour = now.getHours();

      if (hour < 4 || hour >= 16) {
        activateDarkMode();
      } else {
        if (colormodePreference != undefined) {
          if (colormodePreference == "dark") activateDarkMode();
          if (colormodePreference == "light") activateLightMode();
        } else {
          activateLightMode();
        }
      }
    }
  }
})(jQuery);
