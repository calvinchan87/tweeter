$(document).ready(function() {

  console.log("Counter loading now");

  const textArea = document.getElementById('tweet-text');

  $(textArea).on('input', function() {
    let count = 140 - $(this).val().length;
    let counter = this.nextElementSibling.querySelector(".counter");
    // Update counter with 'characters remaining' value in real time
    $(counter).val(count);
    if (count < 0) {
      $(counter).css("color", "red");
    }
    if (count >= 0) {
      $(counter).css("color", "hotpink");
    }
  });

});