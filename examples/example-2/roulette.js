var $r = $('.roulette').fortune(24);

var clickHandler = function() {
  $('.spinner').off('click');
  $('.spinner span').hide();
  $r.spin().done(function(price) {
      $('.spinner').on('click', clickHandler);
      $('.spinner span').show();
    });
};

$('.spinner').on('click', clickHandler);
