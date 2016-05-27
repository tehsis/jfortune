(function($) {
  $.fn.fortune = function(options) {

    var fortune = this;
    var prices = options.prices?options.prices:options;
    var duration = options.duration || 1000;
    var separation = options.separation || 2;
    var prices_amount = Array.isArray(prices)?prices.length:prices;
    var prices_delta = 360 / prices_amount;
    var is_spinning = false;
    var min_random_spins = options.min_spins || 10;
    var max_random_spins = options.max_spins || 15;
    var onSpinBounce = options.onSpinBounce || function() {};
    // determine direction of spin
    var clockWise = true;
    if (undefined !== options.clockWise) {
        clockWise = options.clockWise;
    }    
 
    // sub_price allows a wedge to be subdivided into smaller pieces
    fortune.spin = function(price, sub_price) {
      if ( 'undefined' == typeof sub_price || sub_price === null ) { 
          sub_price = -1; 
      }
      var directionModifier = 1;
      if (!clockWise) {
          directionModifier = -1;
      }

      price = typeof price === "number"?price:Math.floor(Math.random() * prices_amount);
      var deferred = $.Deferred();
      var position = Math.floor(prices_delta * (price - 1/2) + randomBetween(separation, prices_delta - separation));
      if ( typeof price !== "number" && undefined !== prices[price].length ) {
          sub_amount = prices[price].length;
          sub_price = Math.floor(Math.random() * sub_amount);
          position = Math.floor(prices_delta * (price - 1/2) + (prices_delta/sub_amount) * sub_price + randomBetween(separation, prices_delta/sub_amount - separation));  
      }
      var spins = randomBetween(min_random_spins, max_random_spins);
      var final_position = directionModifier * (360 * spins + directionModifier * position);
      var prev_position = 0;
      var is_bouncing = false;

      is_spinning = true;

      fortune
        .css({
          "transform": "rotate(" + final_position + "deg)",
          "-webkit-transform": "rotate(" + final_position + "deg)",
          "transition": "transform " + duration + "ms cubic-bezier(.17,.67,.12,.99)",
          "-webkit-transition": "-webkit-transform " + duration + "ms cubic-bezier(.17,.67,.12,.99)"
        })
        .siblings('.spin').removeClass('bounce');

      var bounceSpin = function() {
        var curPosition = Math.floor(getRotationDegrees(fortune)),
            mod = Math.floor((curPosition + prices_delta*0.5) % prices_delta),
            diff_position,
            position_threshold = prices_delta/5,
            distance_threshold = prices_delta/10;

        prev_position = Math.floor(curPosition < prev_position ? prev_position - 360 * directionModifier : prev_position);
        diff_position = curPosition - prev_position;

        if ((mod < position_threshold && diff_position < distance_threshold) ||
            (mod < position_threshold*3 && diff_position >= distance_threshold)) {
          if (!is_bouncing) {
            fortune.siblings('.spin').addClass('bounce');
            onSpinBounce(fortune.siblings('.spin'));
            is_bouncing = true;
          }
        } else {
          fortune.siblings('.spin').removeClass('bounce');
          is_bouncing = false;
        }

        if (is_spinning) {
          prev_position = curPosition;
          requestAnimationFrame(bounceSpin);
        }
      };

      var animSpin = requestAnimationFrame(bounceSpin);

      setTimeout(function() {
        fortune
          .css({
            "transform": "rotate(" + position + "deg)",
            "-webkit-transform": "rotate(" + position + "deg)",
            "transition": "",
            "-webkit-transition": ""
          })
          .siblings('.spin').removeClass('bounce');

        cancelAnimationFrame(animSpin);
        result = prices[price] || price;
        if (sub_price != -1) {
            result = prices[price][sub_price];
        }
        deferred.resolve(result);
        is_spinning = false;
      }, duration);
       
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
    
    fortune.getCurrentPosition = function() {
        return getRotationDegrees( fortune );
    };
    
    return fortune;
  };
}) (jQuery);
