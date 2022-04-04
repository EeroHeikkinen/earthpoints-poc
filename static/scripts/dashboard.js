$(function() {
    let showFunction = function(event) {
        $('#events tr').slice(3).css('display', 'none');
        $('#view-all-point-events').text('View all');
        $('#view-all-point-events').click(hideFunction);
    }

    let hideFunction = function(event) {
        event.preventDefault();
        $('#events tr').css('display', 'block');
        $('#view-all-point-events').text('View less');
        $('#view-all-point-events').click(showFunction);
    };

    $('#view-all-point-events').click(hideFunction);

    const eventSource = new EventSource('/sse');
    let dataToUpdate;
    let timer;
    eventSource.onmessage = ({ data: receivedData }) => {
        dataToUpdate = receivedData;
        let update = function() {
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