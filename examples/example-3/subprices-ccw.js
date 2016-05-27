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
    [
        {
          name: 'Buford'
        },
        {
          name: 'Baljeet'
        }
        ]
  ],
  duration: 2000,
  clockWise: false
};

var $r = $('.roulette').fortune(options);

var clickHandler = function() {
  $('.spinner').off('click');
  $('.spinner span').hide();
  //var price = Math.floor((Math.random() * 8));
  $r.spin(7).done(function(price) {
      $('.price').text('You have: ' + price.name);
      $('.spinner').on('click', clickHandler);
      $('.spinner span').show();
    });
};

$('.spinner').on('click', clickHandler);
