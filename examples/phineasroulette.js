var prices = [
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
];

var $r = $('.roulette').roulette(prices);

var clickHandler = function() {
  $('.spinner').off('click');
  $('.spinner span').hide();
  var price = Math.floor((Math.random() * 8));
  $r.spin(price).done(function() {
      $('.price').text('You have: ' + prices[price].name);
      $('.spinner').on('click', clickHandler);
      $('.spinner span').show();
    });
};

$('.spinner').on('click', clickHandler);
