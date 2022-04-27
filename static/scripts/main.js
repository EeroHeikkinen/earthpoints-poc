// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
jQuery(() => {
  $('.phone').flip({
    trigger: 'manual',
  });
  $('.phone .front a').click(function (event) {
    $parent = $(this).parents('.phone');
    event.preventDefault();
    $parent.flip('toggle');
  });
  $('.phone .back a').click(function (event) {
    event.preventDefault();
    $('#phone-form').submit();
  });
});
