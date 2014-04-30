var options = {
  prices: [
    {
      name: 'Candance'
    },
    {
      name: 'Pherb'
    },
    {
      name: 'Perry'
    },
    {
      name: 'Isabella'
    },
    {
      name: 'Tree'
    },
    {
      name: 'Mom'
    },
    {
      name: 'Dad'
    },
    {
      name: 'Friends'
    }
  ],
  duration: 7
};

var $r = $('.roulette').fortune(options);

var clickHandler = function() {
  $('.spinner').off('click');
  $('.spinner span').hide();
  //var price = Math.floor((Math.random() * 8));
  $r.spin().done(function(price) {
      $('.price').text('You have: ' + price.name);
      $('.spinner').on('click', clickHandler);
      $('.spinner span').show();
    });
};

$('.spinner').on('click', clickHandler);
