/*window.addEventListener("load", () => {
let scrollContainer = document.querySelector("[data-scroll-container]");
const scroller = new LocomotiveScroll({
  el: scrollContainer,
  inertia: 0.8,
    smooth: true,
    getDirection: true,
	scrollFromAnywhere:true,
	reloadOnContextChange:true,
    mobile: {
      smooth: true,
      inertia: 0.8,
      getDirection: true,
    },
    tablet: {
      smooth: true,
      inertia: 0.8,
      getDirection: true,
    },
});
scroller.destroy();
setTimeout(function(){
scroller.init()
}, 100);
ScrollTrigger.addEventListener('wp_lazy_loading_enabled', function(){ scroller.update() });

  $('#main').imagesLoaded().always( function( instance ) {
  scroller.update();
});
  
document.addEventListener('lazyloaded', function(){
    scroller.update();
});

scroller.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scroller.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
});
*/



document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  

  /**
   * Preloader
   */
  /*const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }*/
  
  // scroll
  (function ($) {
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.header'),
				sd = $('.js-scroll-wrap');

			if (st > 100) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 100) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();
	
	})(jQuery);
	
  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  /*const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });*/

  /**
   * Scroll top button
   */
  $( document ).ready(function() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 500) {
        $('.back-to-top').addClass("active");
      } else {
        $('.back-to-top').removeClass("active");
      }
    });
    $('.back-to-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
});

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

/* 
 * Get videos on load
 */
(function () {
    getVideos();
})();

/**
 * For each video player, create custom thumbnail or
 * use Youtube max resolution default thumbnail and create
 * iframe video.
 */
function getVideos() {
    var v = document.getElementsByClassName("youtube-player");
    for (var n = 0; n < v.length; n++) {
        var p = document.createElement("div");
        var id = v[n].getAttribute("data-id");

        var placeholder = v[n].hasAttribute("data-thumbnail")
            ? v[n].getAttribute("data-thumbnail")
            : "";

        if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
        else p.innerHTML = createThumbail(id);

        v[n].appendChild(p);
        p.addEventListener("click", function () {
            var parent = this.parentNode;
            createIframe(parent, parent.getAttribute("data-id"));
        });
    }
}

/**
 * Create custom thumbnail from data-attribute provided url
 * @param {string} url
 * @return {string} The HTML containing the <img> tag
 */
function createCustomThumbail(url) {
    return (
        '<img class="youtube-thumbnail" src="' +
        url +
        '" alt="Youtube Preview" /><div class="youtube-play-btn"></div>'
    );
}

/**
 * Get Youtube default max resolution thumbnail
 * @param {string} id The Youtube video id
 * @return {string} The HTML containing the <img> tag
 */
function createThumbail(id) {
    return (
        '<img class="youtube-thumbnail" src="//i.ytimg.com/vi_webp/' +
        id +
        '/maxresdefault.webp" alt="Youtube Preview"><div class="youtube-play-btn"></div>'
    );
}

/**
 * Create and load iframe in Youtube container
 **/
function createIframe(v, id) {
    var iframe = document.createElement("iframe");
    console.log(v);
    iframe.setAttribute(
        "src",
        "//www.youtube.com/embed/" +
            id +
            "?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
    );
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("class", "youtube-iframe");
    v.firstChild.replaceWith(iframe);
}

/** Pause video on modal close **/
$("#video-modal").on("hidden.bs.modal", function (e) {
    $(this).find("iframe").remove();
});

/** Pause video on modal close **/
$("#video-modal").on("show.bs.modal", function (e) {
    getVideos();
});


$(document).ready(function() {
  var el = $('.brands-logo');
  
  var carousel;
  var carouselOptions = {
    margin: 20,
    nav: false,
    loop: false,
    dots: true,
    slideBy: 'page',
    responsive: {
      0: {
        items: 1,
        rows: 1,
        loop: true, //custom option not used by Owl Carousel, but used by the algorithm below
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:false,
      },
      768: {
        items: 3,
        rows: 3,
        touchDrag: false,
				mouseDrag: false, //custom option not used by Owl Carousel, but used by the algorithm below
      },
      991: {
        items: 3,
        rows: 3,
        touchDrag: false,
				mouseDrag: false, //custom option not used by Owl Carousel, but used by the algorithm below
      }
    }
  };

  //Taken from Owl Carousel so we calculate width the same way
  var viewport = function() {
    var width;
    if (carouselOptions.responsiveBaseElement && carouselOptions.responsiveBaseElement !== window) {
      width = $(carouselOptions.responsiveBaseElement).width();
    } else if (window.innerWidth) {
      width = window.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      width = document.documentElement.clientWidth;
    } else {
      console.warn('Can not detect viewport width.');
    }
    return width;
  };

  var severalRows = false;
  var orderedBreakpoints = [];
  for (var breakpoint in carouselOptions.responsive) {
    if (carouselOptions.responsive[breakpoint].rows > 1) {
      severalRows = true;
    }
    orderedBreakpoints.push(parseInt(breakpoint));
  }
  
  //Custom logic is active if carousel is set up to have more than one row for some given window width
  if (severalRows) {
    orderedBreakpoints.sort(function (a, b) {
      return b - a;
    });
    var slides = el.find('[data-slide-index]');
    var slidesNb = slides.length;
    if (slidesNb > 0) {
      var rowsNb;
      var previousRowsNb = undefined;
      var colsNb;
      var previousColsNb = undefined;

      //Calculates number of rows and cols based on current window width
      var updateRowsColsNb = function () {
        var width =  viewport();
        for (var i = 0; i < orderedBreakpoints.length; i++) {
          var breakpoint = orderedBreakpoints[i];
          if (width >= breakpoint || i == (orderedBreakpoints.length - 1)) {
            var breakpointSettings = carouselOptions.responsive['' + breakpoint];
            rowsNb = breakpointSettings.rows;
            colsNb = breakpointSettings.items;
            break;
          }
        }
      };

      var updateCarousel = function () {
        updateRowsColsNb();

        //Carousel is recalculated if and only if a change in number of columns/rows is requested
        if (rowsNb != previousRowsNb || colsNb != previousColsNb) {
          var reInit = false;
          if (carousel) {
            //Destroy existing carousel if any, and set html markup back to its initial state
            carousel.trigger('destroy.owl.carousel');
            carousel = undefined;
            slides = el.find('[data-slide-index]').detach().appendTo(el);
            el.find('.fake-col-wrapper').remove();
            reInit = true;
          }


          //This is the only real 'smart' part of the algorithm

          //First calculate the number of needed columns for the whole carousel
          var perPage = rowsNb * colsNb;
          var pageIndex = Math.floor(slidesNb / perPage);
          var fakeColsNb = pageIndex * colsNb + (slidesNb >= (pageIndex * perPage + colsNb) ? colsNb : (slidesNb % colsNb));

          //Then populate with needed html markup
          var count = 0;
          for (var i = 0; i < fakeColsNb; i++) {
            //For each column, create a new wrapper div
            var fakeCol = $('<div class="fake-col-wrapper"></div>').appendTo(el);
            for (var j = 0; j < rowsNb; j++) {
              //For each row in said column, calculate which slide should be present
              var index = Math.floor(count / perPage) * perPage + (i % colsNb) + j * colsNb;
              if (index < slidesNb) {
                //If said slide exists, move it under wrapper div
                slides.filter('[data-slide-index=' + index + ']').detach().appendTo(fakeCol);
              }
              count++;
            }
          }
          //end of 'smart' part

          previousRowsNb = rowsNb;
          previousColsNb = colsNb;

          if (reInit) {
            //re-init carousel with new markup
            carousel = el.owlCarousel(carouselOptions);
          }
        }
      };

      //Trigger possible update when window size changes
      $(window).on('resize', updateCarousel);

      //We need to execute the algorithm once before first init in any case
      updateCarousel();
    }
  }

  //init
  carousel = el.owlCarousel(carouselOptions);
});


});

