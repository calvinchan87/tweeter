// create an AJAX POST request in client.js that sends the form data to the server.

$(document).ready(function() {

  console.log("Form submission listener loading now");

  const $form = $('#tweet-form');

  $form.on('submit', function(event) {
    event.preventDefault();
    console.log('Tweet submitted, performing ajax call...');
    let dataString = $(this).serialize();
    console.log(dataString);
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: dataString,
      dataType: 'text',
      success: function() { // argument required?
        console.log('Success: data sent');
      },
      error: function() {
        console.log('Error: handling required');
      }
    })

  });
});