(function($) {
  $.fn.roulette = function(options) {
    var roulette = this;
    var prices_amount = options.prices.length || options.prices;
    var prices_delta = 360 / prices_amount;
    var isSpinning = false;
 
    roulette.spin = function(price) {
      price = price || Math.floor((Math.random() * prices_amount));
      var deferred = $.Deferred();
      var position = price * prices_delta;
      var spins = Math.floor((Math.random()*5)+10);
      var finalPosition = ((360*spins)+position);
      var prevPosition = 0;
      
      isSpinning = true;

      roulette
        .css({
          "transform": "rotate(" + finalPosition + "deg)",
          "-webkit-transform": "rotate(" + finalPosition + "deg)",
          "transition": "transform " + options.duration + "s cubic-bezier(.17,.67,.12,.99)",
          "-webkit-transition": "-webkit-transform " + options.duration + "s cubic-bezier(.17,.67,.12,.99)"
        })
        .siblings('.spin').removeClass('bounce')


      var bounceSpin = function() {
        var curPosition = Math.floor(getRotationDegrees(roulette)),
            mod = Math.floor((curPosition + prices_delta*0.5) % prices_delta),
            diffPosition,
            positionThreshold = prices_delta/5,
            distanceThreshold = prices_delta/10;

        prevPosition = Math.floor(curPosition < prevPosition ? prevPosition - 360 : prevPosition);
        diffPosition = curPosition - prevPosition;

        if ((mod < positionThreshold && diffPosition < distanceThreshold)) {
          roulette.siblings('.spin').addClass('bounce');
          options.onSpinBounce(roulette.siblings('.spin'));
        } else if (mod < positionThreshold*3 && diffPosition >= distanceThreshold) {
          roulette.siblings('.spin').addClass('bounce');
          options.onSpinBounce(roulette.siblings('.spin'));
        } else {
          roulette.siblings('.spin').removeClass('bounce');
        }

        if (isSpinning) {
          prevPosition = curPosition;
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
          .siblings('.spin').removeClass('bounce')

        cancelAnimationFrame(animSpin);
        deferred.resolve(options.prices[price] || price);
        isSpinning = false;
      }, options.duration*1000);
       
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
  
    return roulette;
  };
}) (jQuery);
