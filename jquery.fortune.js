(function($) {
  $.fn.roulette = function(options) {
    var roulette = this;
    var prices = options.prices || 8;
    var duration = options.duration || 7;
    var separation = options.separation || 2;
    var prices_amount = prices.length || prices;
    var prices_delta = 360 / prices_amount;
    var is_spinning = false;
    var onSpinBounce = options.onSpinBounce || function() {};
 
    roulette.spin = function(price) {
      price = price || Math.floor(Math.random() * prices_amount);
      var deferred = $.Deferred();
      var position = Math.floor(prices_delta * (price - 1/2) + randomBetween(separation, prices_delta - separation));
      var spins = randomBetween(10, 15);
      var final_position = 360 * spins + position;
      var prev_position = 0;
      var is_bouncing = false;

      is_spinning = true;

      roulette
        .css({
          "transform": "rotate(" + final_position + "deg)",
          "-webkit-transform": "rotate(" + final_position + "deg)",
          "transition": "transform " + duration + "s cubic-bezier(.17,.67,.12,.99)",
          "-webkit-transition": "-webkit-transform " + duration + "s cubic-bezier(.17,.67,.12,.99)"
        })
        .siblings('.spin').removeClass('bounce');


      var bounceSpin = function() {
        var curPosition = Math.floor(getRotationDegrees(roulette)),
            mod = Math.floor((curPosition + prices_delta*0.5) % prices_delta),
            diff_position,
            position_threshold = prices_delta/5,
            distance_threshold = prices_delta/10;

        prev_position = Math.floor(curPosition < prev_position ? prev_position - 360 : prev_position);
        diff_position = curPosition - prev_position;

        if ((mod < position_threshold && diff_position < distance_threshold) ||
            (mod < position_threshold*3 && diff_position >= distance_threshold)) {
          if (!is_bouncing) {
            roulette.siblings('.spin').addClass('bounce');
            onSpinBounce(roulette.siblings('.spin'));
            is_bouncing = true;
          }
        } else {
          roulette.siblings('.spin').removeClass('bounce');
          is_bouncing = false;
        }

        if (is_spinning) {
          prev_position = curPosition;
          requestAnimationFrame(bounceSpin);
        }
      };

      var animSpin = requestAnimationFrame(bounceSpin);

      setTimeout(function() {
        roulette
          .css({
            "transform": "rotate(" + position + "deg)",
            "-webkit-transform": "rotate(" + position + "deg)",
            "transition": "",
            "-webkit-transition": ""
          })
          .siblings('.spin').removeClass('bounce');

        cancelAnimationFrame(animSpin);
        deferred.resolve(prices[price] || price);
        is_spinning = false;
      }, duration*1000);
       
      return deferred.promise();
    };

    var getRotationDegrees = function(obj) {
      var angle = 0,
          matrix = obj.css("-webkit-transform") ||
                   obj.css("-moz-transform")    ||
                   obj.css("-ms-transform")     ||
                   obj.css("-o-transform")      ||
                   obj.css("transform");
      if (matrix !== 'none') {
        var angle,
            values = matrix.split('(')[1].split(')')[0].split(','),
            a = values[0],
            b = values[1],
            radians = Math.atan2(b, a);

        if ( radians < 0 ) {
          radians += (2 * Math.PI);
        }

        angle = Math.round( radians * (180/Math.PI));
      }

      return angle;
    };

    var randomBetween = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  
    return roulette;
  };
}) (jQuery);
