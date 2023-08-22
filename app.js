// const { getCurrentCompaniesTable } = require('./actions/getCurrentCompaniesTable');
// const { getQuoteTime } = require('./actions/getQuoteTime');
const uploadDailyIndex = require('./db/queries/uploadDailyIndex');

require('dotenv').config();

const connection = require('./db/connect')
const { parse } = require('node-html-parser');
const fs = require('fs');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

fetch(process.env.DATA_SOURCE_ENDPOINT)
  .then(res => res.text())
  .then(scrapedCode => {
    connection.connect(err => {
      if (err)
        throw err;
      console.log("Connected!");
    });
    uploadDailyIndex(scrapedCode, connection);

    connection.end();
  })
  .then(() => {
    // some activity
  });

app.get('/', (req, res) => {
  res.send('<h1>Scrapping serwer</h1>')
});

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}

start();
