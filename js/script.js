var $page = $('html, body');
$('a[href*="#"]').click(function() {
    $page.animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 60
    }, 400);
    return false;
});


// $(document).ready(function(){
//     $('.slider_2').slick({
//         infinite: true,
//         speed: 450,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         dots: true,
//         arrows: false,
//         responsive: [
//             {
//               breakpoint: 1224,
//               settings: {
                
//               }
//             },
//             {
//               breakpoint: 850,
//               settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//               }
//             },
//             {
//               breakpoint: 780,
//               settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1,
//               }
//             }
//           ],
//     });
// });

$(document).ready(function(){
  $('.slider').slick({
      infinite: true,
      speed: 450,
      slidesToShow: 2,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      responsive: [
          {
            breakpoint: 1224,
            settings: {
              
            }
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ],
  });
});

$(function(){
  $('.button').click(function(){
      $('.nav_ul_2').toggleClass('none');
  });
});
$(function(){
  $('.nav_ul_a').click(function(){
      $('.nav_ul_2').toggleClass('none');
  });
});

$(function(){
    $('.resetpass').click(function(){
        $('.mod').removeClass('off');
        $('.modal_window').removeClass('off');
    }); 
});

$(window).on('load', function() {
  $preloader = $('.preloader'),
  $loader = $preloader.find('.preloader');
  $loader.fadeOut();
  $preloader.delay(1000).fadeOut('slow');

});
$(document).keydown(function(e) {
    if (e.keyCode === 27) {
        e.stopPropagation();
        $('.mod').addClass('off');
        $('.modal_window').addClass('off');
    }
});
$('.mod').click(function(e) {
    if ($(e.target).closest('.modal_window').length == 0) {
        $('.mod').addClass('off');
        $('.modal_window').addClass('off');
    }
});	