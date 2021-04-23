/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // This function loops through tweets
  // invokes createTweetElement function for each tweet
  // then prepends each one to the tweets container
  for (let tweet of tweets) {
    let $renderedTweet = createTweetElement(tweet);
    $('.tweet-container').prepend($renderedTweet);
    timeago.render(document.querySelectorAll('.need_to_be_rendered'));
  }
};

const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="past-tweet">
    <div class="tweet-header">
      <div class="tweet-header-left">
        <img class="far fa-user-circle" src="${tweet.user.avatars}"></i>
        <div class="real-name">${tweet.user.name}</div>
      </div>
      <div class="handle"><b>${tweet.user.handle}</b></div>
    </div>
    <div class="tweet-article">${escape(tweet.content.text)}</div>
    <div class="tweet-footer">
      <div class="time need_to_be_rendered" datetime="${tweet.created_at}">Placeholder Time</div>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </article>
  <br>
  `;
  return $tweet;
};

// This function is invoked on DOM ready to render existing tweet database
const loadTweets = function() {
  console.log('Performing ajax call to loadTweets...');
  $.ajax('/tweets', { method: 'GET' })
    .then(function(moreTweets) {
      console.log('loadTweets Success: ', moreTweets);
      renderTweets(moreTweets);
    })
    .catch(err => {
      console.log('Error caught: ', err);
    });
};

// This function is invoked upon successful submission of the "tweet-form"
const loadNewestTweet = function() {
  console.log('Performing ajax call to loadNewestTweet...');
  $.ajax('/tweets', { method: 'GET' })
    .then(function(moreTweets) {
      console.log('loadNewestTweet Success: ', moreTweets);
      renderTweets(new Array(moreTweets[moreTweets.length - 1])); // only render the most recent tweet
      $('#tweet-text').val(''); // clear text area
      $('.counter').val('140'); // reset character counter to 140
    })
    .catch(err => {
      console.log('Error caught: ', err);
    });
};

// This function is used to preventing XSS attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {

  $('.error').hide(); // Rather than creating a new element upon a "tweet-form" validation error, this element is simply hidden until an error appears
  loadTweets();

  console.log('Form submission listener loading now');

  const $form = $('#tweet-form');

  $form.on('submit', function(event) {
    event.preventDefault();
    let dataString = $(this).serialize();
    const $counter = $('.counter');
    // display error message if no characters are entered in the "tweet-form"
    if (parseInt($counter[0].innerText) === 140) {
      return $('.error').slideDown();
    }
    // display error message if >140 characters are entered in the "tweet-form"
    if (parseInt($counter[0].innerText) < 0) {
      return $('.error').slideDown();
    }
    $('.error').slideUp(); // hide error message if one had been displayed prior to a valid tweet submission
    console.log('Tweet submitted, performing ajax call...');
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: dataString,
      dataType: 'text',
      success: function() {
        console.log('Success: data sent to database');
        loadNewestTweet();
      },
      error: function() {
        console.log('Error');
      }
    });

  });
});