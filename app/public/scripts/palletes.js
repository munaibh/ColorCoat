var $ = require('jquery');

// Send Vote to API.
$('.favourite__button').on('click', function(e) {
  e.preventDefault();
  var that = this;
  var id = $(this).data('id');
  $.ajax({
    url: '/api/' + id,
    type: 'PUT',
    success: function (data) {
      $(that).find('span').html(data);
      $(that).addClass('favourite__button--checked');
    }
  });
});

// Change Logo Colour.
var colour = document.querySelectorAll('.palletes__colour');
colour.forEach(function(i) {
  i.addEventListener('click', function(e) {
    e.preventDefault();
    var paint = document.querySelector('.st0');
    paint.style.fill = this.dataset.color;
  });
});
