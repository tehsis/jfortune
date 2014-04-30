var test_prices = [
  {
    name: "one"
  },
  {
    name: "two"
  }, 
  {
    name: "three"
  }
]

var $roulette = $('<div>');

module("Roulette fully configured", {
  setup: function() {
    $roulette.fortune({
      prices: test_prices,
      duration: 0.5,
      separation: 2,
      min_random_spins: 10,
      max_random_spins: 15,
      onSpinBounce: function() {}
    });
  }
});

test("Roulette initialization", function() {
  ok(typeof $roulette.spin === "function", "Roulette initialized.");  
});

asyncTest("Roulette spining", function() {
  expect(1);

  $roulette.spin().done(function(price) {
    ok(price.name !== undefined, "The roulette has been spinned.")
    start();
  });
})
