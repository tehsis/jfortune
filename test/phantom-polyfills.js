window.requestAnimationFrame = window.requestAnimationFrame || function(fn) {
  return window.setTimeout(fn, 0);
};

window.cancelAnimationFrame = window.cancelAnimationFrame || function(id) {
  return window.clearTimeout(id);
};


