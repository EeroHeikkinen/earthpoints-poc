$(function() {
    let showFunction = function(event) {
        $('#events tr').slice(3).css('display', 'none');
        $('#view-all-point-events').text('Show more');
        $('#view-all-point-events').click(hideFunction);
    }

    let hideFunction = function(event) {
        event.preventDefault();
        $('#events tr').css('display', 'block');
        $('#view-all-point-events').text('Show less');
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

    var profileEditElm = document.getElementById('profileEdit');
    if(profileEditElm)
    {
        var profileEditModal = new bootstrap.Modal(profileEditElm,{
            keyboard: false
          });
        const hasConnectedEPBefore = jQuery("#profileEdit").attr("data-hasConnectedEPBefore");
        if(!hasConnectedEPBefore || hasConnectedEPBefore == "false"){
            profileEditModal.show();
        }    
    }

    jQuery("#profileEditFooterLink").click(()=>{
        profileEditModal.show();
    });

    jQuery("#profileEditSave").on('click',function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser
        var thisButton = $(this);
        thisButton.attr("disabled","disabled");
        var form = $(this).closest("form");
        $.ajax({
          type: form.attr('method'),
          url: form.attr('action'),
          data: form.serialize()
        }).done(function(data) {
          console.log(data);
          $('#profileEditMessages').text('');
          if(data.error){
            jQuery.each(data.error,(i,e)=>{
                $('#profileEditMessages').append('<li>'+e+'</li>');
            });
          }
          else {
            profileEditModal.hide();
            thisButton.removeAttr("disabled");
            location.reload();
          }
        }).fail(function(data) {
            console.log("fail");
            console.log(data);
          // Optionally alert the user of an error here...
        });
      });

    const phoneShowHideFunc = function(){
        $('#inputPhoneGroup')[ ($("option[value='IN']").is(":checked"))? "show" : "hide" ]();  
    };
    phoneShowHideFunc();
    jQuery('#inputCountryCode').change(phoneShowHideFunc);

    jQuery("#profileEditForm").validate({
        debug: true,
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            email: {
                required: true,
                email: true,
            },
            countryCode: {
                required: true,
            },
            phone: {
                required: "option[value='IN']:checked",
            },
        },
        messages: {
            firstName: {
                required: "First name is required"
            },
            lastName: {
                required: "Last name is required"
            },
            email: {
                required: "E-mail is required",
                email: "Please enter a valid e-mail address",
            },
            countryCode: {
                required: "Select a country",
            },
            phone: {
                required: "Phone is required",
            }
        }
    });

    jQuery("input,select").on("blur keyup click change load",function(event){
        var saveButton = $('#profileEditSave');
        $('#profileEditForm').valid() ? saveButton.removeAttr("disabled") : saveButton.attr("disabled","disabled");
    });

});