// Debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) func.apply(context, args);
    }

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if(callNow) func.apply(context, args);

  }
}

// Animate Items In.
function animateColumns() {
  var columns = document.querySelectorAll('.palletes');
  columns.forEach(function(col) {
    col.classList.add('bounceIn');
  });
}

// Generate Columns for Grid.
function generateColumns() {
  var columns = document.querySelectorAll('.palletes');
  var count = 0, firstRow = 0;
  var remainder = 0;
  columns.forEach(function(col) {
    if(col.offsetTop == 80) firstRow++;
    else if(col.offsetTop == 257) firstRow++;
    count++;
  });

  remainder = (count % firstRow);

  if(remainder != 0) {
    var numGap = firstRow - remainder;
    for(i = 0; i<numGap; i++) {
      var col = document.createElement('div');
      col.className = 'palletes empty';
      document.querySelector('main').appendChild(col);
    }
  }
}

// Repopulate Grid.
window.onresize = debounce(function() {
  var container = document.querySelector('.main');
  var empty = container.querySelectorAll('.empty');

  empty.forEach(function(item) {
    container.removeChild(item);
  });

  generateColumns();

}, 0);

generateColumns();
animateColumns();
