const { getCurrentCompaniesTable } = require('./actions/getCurrentCompaniesTable');
const { getQuoteTime } = require('./actions/getQuoteTime');
require('dotenv').config();

const { parse } = require('node-html-parser');
const { readFile, writeFile } = require('fs');
// const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

let content;
let counter = 0;

/*setInterval(async () => {*/
/* await*/
fetch(process.env.DATA_SOURCE_ENDPOINT)
  .then(res => res.text())
  .then(scrapedCode => {
    getCurrentCompaniesTable(scrapedCode);
    getQuoteTime(scrapedCode);

    writeFile('./downloads/downloadedPage.html', scrapedCode, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  })
  .then(() => {
    // some activity
  });

app.get('/', (req, res) => {
  res.send('<h1>Proxy serwer</h1>')
});

app.get('/test', (req, res) => {
  res.status(200).json({ content: content })
})

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}

start();
