jfortune ![travis](https://travis-ci.org/tehsis/jfortune.svg)
========

A jquery plugin to make wheel of fortunes (roulettes)

Working examples: 
- http://codepen.io/tehsis/pen/AFCwz
- http://codepen.io/tehsis/pen/zilBg
- http://codepen.io/asleepypenguin/pen/bebZBj // Counter clockwise and divided wedges


Description
-----------

Provides an UI component to make roulettes effects and provides methods to handle the
prices on which the roulette stops.

Usage
-----

```javascript
// You can initialize the roulette by specifying the number of elements
$(selector).roulette(8);

// Or by passing an array of elements
$(selector).roulette([{description: '1000 u$s'}, {description: '200 u$s'}]);

// Array elements can also be arrays of elements to allow for split wedges
$(selector).roulette([
    {description: '1000 u$s'}, 
    {description: '200 u$s'},
    [{description: '100 u$s'},{description: '5000 u$s'},{description: '100 u$s'}]
    ]);

// Or you can fully configurate the roulette behaviour
$(selector).roulette({
  prices: [{description: "1000 u$s"}, {description: "200 u$s"}],
  duration: 3000, // The amount of milliseconds the roulette to spin
  separation: 2, // The separation between each roulette price
  min_spins: 10, // The minimum number of spins 
  max_spins: 15, // The maximum number of spins
  clockWise: true, // The direction the wheel will spin
  onSpinBounce: function() {
    Sounds.play('taka');
  } // A callback to be called each time the roulette hits a price bound.
})

// After initialization you can spin the wheel and it will turn to a random
// position.
$(selector).spin();

// Or you can specify a predefined position
$(selector).spin(4);

// The spin methods returns a promise, which its first arguments is the object that
// is at that position (only if you have used the second form of initilization)
$(selector).spin().then(function(price) {
  console.log(price.description);
});

// or you can specify a fixed price
$(selector).spin(1).spin().then(function(price) {
  console.log(price.description); // "200 u$s"
});
```

Usage notes
-----------

The plugin must be initiated using and array of elements or a number. Both, the array length
or the number's value, must be conscistent with the number of positions your roulette's image
has, this is not magic. (yet).

At this moment, the css' styles for the roulette animation are hard-coded inside the plugin. This has been done on porpouse to not requiring external files.
