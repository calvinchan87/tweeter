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

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

// const tweetButton = document.getElementById('tweet-button');

// $(tweetButton).on('click', function createTweetElement(obj) {
//   console.log('Button clicked, performing ajax call...');
//   console.log(obj);
// });

const createTweetElement = function(obj) {
  let newObj = {
    content: obj.content.text,
    created: obj.created_at,
    avatar: obj.user.avatars,
    handle: obj.user.handle,
    name: obj.user.name
  }
  const article = `
  <article class="past-tweet">
    <div class="tweet-header">
      <div class="tweet-header-left">
        <img class="far fa-user-circle" src="${newObj.avatar}"></i>
        <div class="real-name">${newObj.name}</div>
      </div>
      <div class="handle"><b>${newObj.handle}</b></div>
    </div>
    <div class="tweet-article">${newObj.content}</div>
    <div class="tweet-footer">
      <div class="time need_to_be_rendered" datetime="${newObj.created}">Placeholder Time</div>
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
  return article;
};

// $.ajax('more-posts.html', { method: 'GET' })
// .then(function (morePostsHtml) {
//   console.log('Success: ', morePostsHtml);
//   $button.replaceWith(morePostsHtml);

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});