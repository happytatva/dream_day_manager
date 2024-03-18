// function header_adj() {
//   var headerHeight = $(".header").outerHeight();
//   $(".main-wrap").css({
//     "padding-top": headerHeight + "px",
//   });
// }
function footer_adj() {
  var footerHeight = $(".footer").outerHeight();
  $(".wrapper").css({
    "padding-bottom": footerHeight + "px",
  });
  $(".footer").css({
    "margin-top": -footerHeight + "px",
  });
}
function open_menu() {
  var headerHeight = $(".header").outerHeight();
  if ($(window).width() < 1140) {
    $(".nav-bar").css("top", headerHeight);
    $(".hamburger")
      .off()
      .click(function () {
        $("body").toggleClass("open-menu");

        $(".overlay").click(function () {
          $("body").removeClass("open-menu");
        });
      });
  } else {
    $("body").removeClass("open-menu");
    $(".nav-bar").css("top", "0");
  }
}
function small_header() {
  var headerHeight = $(".header").outerHeight();
  //   ---------for small header-------
  if ($(window).scrollTop() > headerHeight) {
    $(".upper-header").addClass("small-header");
  } else {
    $(".upper-header").removeClass("small-header");
  }
}

$(document).ready(function () {
  open_menu();
//   header_adj();
  footer_adj();
  $(".search-link").click(function () {
    $(".lower-header").slideToggle(400);
  });
  $(".close-btn").click(function () {
    $(".lower-header").slideUp(400);
  });

  $(".banner-slider").slick({
    infinite: false,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
  });

  $(".events-slider").slick({
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "300px",
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 991,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: "0px",
        },
      },
    ],
  });

  $(".sponsor-slider").slick({
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".media-link").click(function () {
    var imageSrc = $(this)
      .closest(".thumbnail-wrapper")
      .find(".img-wrap img")
      .attr("src");
    console.log(imageSrc);
    $(".slider-content .thumbnail-image.slick-active img").attr(
      "src",
      imageSrc
    );
  });

  $(".modal").on("show.bs.modal", function () {
    setTimeout(function () {
      $(".slider-content").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        infinite: false,
        speed: 1000,
        asNavFor: ".slider-thumb",
        arrows: false,
      });
      $(".slider-thumb").slick({
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: ".slider-content",
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        arrows: true,
        responsive: [
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 375,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
      });
    }, 100);
  });

  //   -------------about/porfolio tabbing------------------

  $("ul.tabs li .tab-link").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li .tab-link").removeClass("active");
    $(".tab-content").removeClass("active");

    $(this).addClass("active");
    $("#" + tab_id).addClass("active");
  });

  //   ------accordion-------
  $(".accordion .title").click(function () {
    $(this).closest(".accordion").find(".content").slideToggle(500);
    $(this).closest(".accordion").siblings().find(".content").slideUp(500);

    $(this).toggleClass("active");
    $(this)
      .closest(".accordion")
      .siblings()
      .find(".title")
      .removeClass("active");
  });
});
// -------------while resizing------------
$(window).on("resize", function () {
  setTimeout(() => {
    open_menu();
//     header_adj();
    footer_adj();
  }, 300);
});

// --------------while scrolling--------------

var upArrowBtn = $(".up-arrow-link");
var a = 0;
$(window).scroll(function () {
  setTimeout(() => {
//     header_adj();
    footer_adj();
    open_menu();
    small_header();
  }, 300);

  //   ------for top value of navbar after scroll-----

  if ($(window).width() < 1140) {
    var headerHeight = $(".header").outerHeight();
    $(".open-menu .nav-bar").css("top", headerHeight);
  } else {
    $(".nav-bar").css("top", "0");
  }

  // ---------up-arrow-link--------------

  if ($(window).scrollTop() > 500) {
    upArrowBtn.addClass("show-arrow");
  } else {
    upArrowBtn.removeClass("show-arrow");
  }

  // ----------------for counting js---------------
  if ($(".fid-section .custom-row").length > 0) {
    var Top = $(".fid-section .custom-row").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > Top) {
      $(".count").each(function () {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 5000,
              easing: "linear",
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
      a = 1;
    }
  }
});

upArrowBtn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, 1000);
});
