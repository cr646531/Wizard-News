//const postbank = require('./postbank');
const timeAgo = require('node-time-ago');
//const client = require('../db/index');
//const pg = require('pg');


const details = (post, up)=> {

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <p>${post.content}</p>
          <small class="news-info">
            ${up.upvotes} upvotes | ${timeAgo(post.date.getTime())}
          </small>
        </div>
    </div>
  </body>
  </html>`;

  return html;
}

module.exports = { details };