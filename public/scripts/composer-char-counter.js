$(document).ready(function() {
  // --- our code goes here ---
  console.log("Document loaded OK");

  const textArea = document.getElementById('tweet-text');

  $(textArea).on('input', function() {
    let count = 140 - $(this).val().length;
    // console.log(count);
    let counter = this.nextElementSibling.querySelector(".counter");
    // console.log(counter);
    $(counter).val(count);
    // console.log(counter);
    if (count < 0) {
      $(counter).css("color", "red");
    }
    if (count >= 0) {
      $(counter).css("color", "hotpink");
    }
  });

});