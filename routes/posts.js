const express = require("express");
const router = express.Router();
// const postbank = require('./routes/postbank');
const postList = require('../views/postList');
const postDetail = require('../views/postDetail');
const client = require('../db/index');
const addPost = require('../views/addPost');

router.use(express.urlencoded({extended: false}));



router.get("/", async (req, res, next) => {
  try {
    let data = await client.query(`SELECT posts.*, counting.upvotes FROM posts INNER JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting ON posts.id = counting.postId;`);
    const posts = data.rows;
    res.send(postList.list(posts));
  } catch(error) {
    res.status(500).send(`Something went wrong. ${error}`);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.send(addPost());
  } catch(error) {
    res.status(500).send('Something went wrong: ' + error);
  }
});

router.post("/", async (req, res) => {
  const author = req.body.name;
  const title = req.body.title;
  const content = req.body.content;

  try {
    let data = await client.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`, [author]);
    userId = data.rows[0].id;
    data = await client.query(`INSERT INTO posts (userId, title, content) VALUES ($1, $2, $3) RETURNING id`, [userId, title, content]);
    postId = data.rows[0].id;
    await client.query(`INSERT INTO upvotes (userId, postId) VALUES ($1, $2)`, [userId, postId]);
    console.log("PostId = " + postId); 
    res.redirect(`/posts/${postId}`);
  } catch(error) {
    res.status(500).send(`Someothing went wrong: ${error}`);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let data = await client.query(`SELECT * FROM posts WHERE id=$1`, [req.params.id]);
    const post = data.rows;
    data = await client.query(`SELECT postId, COUNT(*) as upvotes FROM upvotes WHERE postId=$1 GROUP BY postId`, [req.params.id])
    const upvotes = data.rows;
    res.send(postDetail.details(post[0], upvotes[0]));
  } catch(error) {
    res.status(500).send(`Something went wrong. ${error}`);
  }
});





module.exports = router;
