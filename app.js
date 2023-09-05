// const { getCurrentCompaniesTable } = require('./actions/getCurrentCompaniesTable');
// const { getQuoteTime } = require('./actions/getQuoteTime');
const uploadDailyIndex = require('./db/queries/uploadDailyIndex');

require('dotenv').config();

const connection = require('./db/connect')
const { parse } = require('node-html-parser');
const fetch = require("node-fetch");
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

connection.connect(err => {
  if (err)
    throw err;
  console.log("Connected!");
});

const abc = async () => {
  fetch(process.env.DATA_SOURCE_ENDPOINT)
    .then(res => res.text())
    .then(scrapedCode => {
      uploadDailyIndex(scrapedCode, connection);
    })
    .catch(error => {
      console.log(error);
    });
}
  
// connection.end();

if (process.env.ENABLE_GETTING_DAILY_INDEX)
  setInterval(abc, 60000);

app.get('/', (req, res) => {
  res.send('<h1>Scrapping serwer</h1>')
});

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}

start();
