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
    $roulette = $('<div>');
    $roulette.fortune({
      prices: test_prices,
      duration: 0.5,
      separation: 2,
      min_spins: 10,
      max_spins: 15,
      onSpinBounce: function() {}
    });
  },
  teardown: function() {
    $roulette.remove();
  }
});

test("Roulette initialization", function() {
  ok(typeof $roulette.spin === "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(2);

  $roulette.spin().done(function(price) {
    start();
    ok(price.name !== undefined, "The roulette has been spinned to a random price.")
  });

  $roulette.spin(3).done(function(price) {
    ok(price.name === 'Isabella', "The roulette has been spinned to a fixed price.")
  });
})

module("Roulette without configuration", {
  setup: function() {
    $roulette = $('<div>');

    $roulette.fortune(24);
  },
  teardown: function() {
    $roulette.remove();
  }
});

test("Roulette initialization", function() {
  ok(typeof $roulette.spin === "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(2);

  $roulette.spin().done(function(price) {
    ok(typeof price === "number", "The roulette has been spinned to a random price.")
    start();
  });

  $roulette.spin(3).done(function(price) {
    ok(price === 3, "The roulette has been spinned to a fixed price.")
  });
})

