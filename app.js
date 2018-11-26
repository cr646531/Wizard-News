const express = require("express");
const app = express();
const morgan = require('morgan');
const router = require('./routes/posts');


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/posts', router);

app.get('/', async (req, res, next) => {
  res.redirect('/posts');
});


const PORT = 1337;

app.listen(PORT, () => {
  try {
    console.log(`App listening in port ${PORT}`);
  } catch(error) {
    res.status(500).send('Something went wrong: ' + error);
    throw(error);
  }
});
