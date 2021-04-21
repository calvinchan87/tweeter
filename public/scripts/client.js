/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  console.log("Timeago loaded OK");

  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  // jQuery attr() Method: Display the time passed since a tweet was created in the lower-left corner of each Tweet.
});