require('dotenv').config();

const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const { parse } = require('node-html-parser');
const { readFile, writeFile } = require('fs');

const connectDB = require('./db/connect');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const { scrap } = require('./actions/scrap');
const { addValue } = require('./controllers/wig20');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

let content;
let counter = 0;

setInterval(async () => {
  await fetch(process.env.DATA_SOURCE_ENDPOINT)
    .then(res => res.text())
    .then(res => {
      content = res;
      scrap(res);

      console.log(counter);
      counter++;

      writeFile('./content/result.txt', content, (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
      });
    })
    .then(() => {
      addValue();
    })



  app.get('/', (req, res) => {
    res.send('<h1>Proxy serwer</h1>')
  });

  app.get('/test', (req, res) => {
    res.status(200).json({ content: content })
  })
}, 20000);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
}

start();
