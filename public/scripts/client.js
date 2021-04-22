/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  console.log("renderTweets and Timeago loading now");

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $renderedTweet = createTweetElement(tweet);
      $('.tweet-container').prepend($renderedTweet);
      timeago.render(document.querySelectorAll('.need_to_be_rendered'));
      // jQuery attr() Method: Display the time passed since a tweet was created in the lower-left corner of each Tweet.
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
      <div class="tweet-article">${tweet.content.text}</div>
      <div class="tweet-footer">
        <div class="time need_to_be_rendered" datetime="${tweet.created_at}">Placeholder Time</div>
        <!-- jQuery attr() Method: Display the time passed since a tweet was created in the lower-left corner of each Tweet. -->
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

  const loadTweets = function() {
    console.log('Performing ajax call to loadTweets...');
    $.ajax('/tweets', { method: 'GET' })
      .then(function(moreTweets) {
        console.log('loadTweets Success: ', moreTweets);
        renderTweets(moreTweets);
      });
  };

  loadTweets();

});