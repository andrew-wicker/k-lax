const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('../routes/api');
const mongoApi = require('../routes/mongoApi');
const mongoose = require('mongoose');
const mongoURI =
  'mongodb+srv://klax-server:klax@k-lax-mongodb-dev.qgsi6rb.mongodb.net/';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, '../public')));

// Router handler to return main app
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

// Router to handle game info retrieval
app.use('/search', apiRouter);
app.use('/add-game', apiRouter);
app.use('/get-collection', mongoApi);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
