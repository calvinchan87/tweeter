$(document).ready(function() {
  // create an AJAX POST request in client.js that sends the form data to the server.

  console.log("Form submission listener loading now");

  const $form = $('#tweet-form'); // ideally export this module

  $form.on('submit', function(event) {
    event.preventDefault();
    let dataString = $(this).serialize();
    const $counter = $('.counter');
    if (parseInt($counter[0].innerText) === 140) { // correct key?
      return alert("This tweet is empty and can not be tweeted.");
    }
    if (parseInt($counter[0].innerText) < 0) { // correct key?
      return alert("This tweet is over 140 characters and can not be tweeted.");
    }
    console.log('Tweet submitted, performing ajax call...');
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: dataString,
      dataType: 'text',
      success: function() {
        console.log('Success: data sent to database');
        loadTweets(); // wrong function call, see client.js
      },
      error: function() {
        console.log('Error: handling required');
      }
    });

  });
});