require('dotenv').config();

const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const { parse } = require('node-html-parser');
const { readFile, writeFile } = require('fs');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const { scrap } = require('./actions/scrap');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

let content;

(async () => {
  await fetch(process.env.DATA_SOURCE_ENDPOINT)
    .then(res => res.text())
    .then(res => {

      content = res;
      scrap(res);

      writeFile('./content/result.txt', content, (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
      });
    });

  app.get('/', (req, res) => {
    res.send('<h1>Proxy serwer</h1>')
  });

  app.get('/test', (req, res) => {
    res.status(200).json({ content: content })
  })
})();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
