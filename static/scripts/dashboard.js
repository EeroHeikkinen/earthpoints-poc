$(function () {
  $('#view-all-point-events').click(function (event) {
    event.preventDefault();
    $('.point-event-row').css('display', 'block');
    $('#show-all-row').css('display', 'none');
  });

  const eventSource = new EventSource('/sse');
  let dataToUpdate;
  let timer;
  eventSource.onmessage = ({ data: receivedData }) => {
    dataToUpdate = receivedData;
    let update = function () {
      timer = null;

      const parsedData = JSON.parse(dataToUpdate);
      if (parsedData.summedPoints) {
        jQuery('#totalPoints').text(parsedData.summedPoints);
      }
      if (parsedData.eventsHTML) {
        jQuery('#events').html(parsedData.eventsHTML);
      }
      if (parsedData.badgeUrl) {
        jQuery('#badge-image').attr('src', parsedData.badgeUrl);
      }
    };
    if (!timer) {
      timer = setTimeout(update, 500);
    }
  };
});
