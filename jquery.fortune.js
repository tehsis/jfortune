(function($) {
  $.fn.roulette = function(prices, options) {
    var roulette = this;
    var prices_amount = prices.length || prices;
    var prices_delta = 360 / prices_amount;
 
    roulette.spin = function(price) {
      var deferred = $.Deferred();
      var position = price * prices_delta;
      var spins = Math.floor((Math.random()*5)+10);
      var finalPosition = ((360*spins)+position);
      roulette.css({
        "transform": "rotate(" + finalPosition + "deg)",
        "-webkit-transform": "rotate(" + finalPosition + "deg)",
        "transition": "transform 2s",
        "-webkit-transition": "-webkit-transform 2s"
      });

      setTimeout(function() {
        roulette.css({
          "transform": "rotate(" + position + "deg)",
          "-webkit-transform": "rotate(" + position + "deg)",
          "transition": "",
          "-webkit-transition": ""
        });
        deferred.resolve(prices[price] || price);
      }, 2000);
       
      return deferred.promise();
    };
  
    return roulette;
  };
}) (jQuery);
