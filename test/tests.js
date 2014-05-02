var test_prices = [
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


var $roulette;

module("Roulette fully configured", {
  setup: function() {
    $roulette = $('.roulette');
    $roulette.fortune({
      prices: test_prices,
      duration: 2000,
      separation: 2,
      min_spins: 10,
      max_spins: 15,
      onSpinBounce: function() {}
    });
  },
  teardown: function() {
    $roulette = null;
  }
});

test("Roulette initialization", function() {
  strictEqual(typeof $roulette.spin, "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(2);

  $roulette.spin().done(function(price) {
    start();
    notStrictEqual(price.name, undefined, "The roulette has been spinned to a random price.")
  });

  var fixed_price = Math.floor(Math.random()*test_prices.length);
  $roulette.spin(fixed_price).done(function(price) {
    strictEqual(price.name, test_prices[fixed_price].name, "The roulette has been spinned to a fixed price.")
  });
});

module("Roulette without configuration specifying number of elements", {
  setup: function() {
    $roulette = $('.roulette');

    $roulette.fortune(8);
  },
  teardown: function() {
    $roulette = null;
  }
});

test("Roulette initialization", function() {
  strictEqual(typeof $roulette.spin, "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(2);

  $roulette.spin().done(function(price) {
    strictEqual(typeof price, "number", "The roulette has been spinned to a random price.")
    start();
  });

  var fixed_price = Math.floor(Math.random()*24);
  $roulette.spin(3).done(function(price) {
    strictEqual(price, 3, "The roulette has been spinned to a fixed price.")
  });
});

module("Roulette without configuration specifying array of prices", {
  setup: function() {
    $roulette = $('.roulette');

    $roulette.fortune(test_prices);
  },
  teardown: function() {
    $roulette = null;
  }
});

test("Roulette initialization", function() {
  strictEqual(typeof $roulette.spin, "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(2);

  $roulette.spin().done(function(price) {
    start();
    notStrictEqual(price.name, undefined, "The roulette has been spinned to a random price.")
  });

  var fixed_price = Math.floor(Math.random()*test_prices.length);
  $roulette.spin(fixed_price).done(function(price) {
    strictEqual(price.name, test_prices[fixed_price].name, "The roulette has been spinned to a fixed price.")
  });
});

