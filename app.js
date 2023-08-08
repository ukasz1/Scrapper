// const { getCurrentCompaniesTable } = require('./actions/getCurrentCompaniesTable');
// const { getQuoteTime } = require('./actions/getQuoteTime');
const { getDailyIndex } = require('./actions/getDailyIndex');
const uploadDailyIndex = require('./db/queries/uploadDailyIndex');

require('dotenv').config();

const mysql = require("mysql");
const connection = require('./db/connect')
const { parse } = require('node-html-parser');
const fs = require('fs');
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

//======================================

// connection.connect(err => {
//   if (err)
//     throw err;
//   console.log("Connected!");
// });

//======================================


/*setInterval(async () => {*/
/* await*/


fetch(process.env.DATA_SOURCE_ENDPOINT)
  .then(res => res.text())
  .then(scrapedCode => {
    
    connection.connect(err => {
      if (err)
        throw err;
      console.log("Connected!");
    });
    // getCurrentCompaniesTable(scrapedCode);
    // getQuoteTime(scrapedCode);
    // uploadDailyIndex(scrapedCode, connection);

    const sql = 'SELECT * FROM \`wig20Daily\` LIMIT 50';
    connection.query(sql, (error, results) => {
      if (error) throw error;
      console.log('results: ', results);
    });
    connection.end();



    const dirName = './downloads';
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }

    fs.writeFile('./downloads/downloadedPage.html', scrapedCode, (error, result) => {
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
  res.send('<h1>Scrapping serwer</h1>')
});

// app.get('/test', (req, res) => {
//   res.status(200).json({ content: content })
// })

// app.get('/select50', (req, res) => {
//   const sql = 'SELECT * FROM \`wig20Daily\` LIMIT 50';
//   connection.query(sql, (error, results) => {
//     if (error) throw error;
//     console.log('results: ', results);
//   });
//   connection.end();
// })

const port = process.env.PORT || 5000;

const start = async () => {
  // connection.connect(err => {
  //   if (err)
  //     throw err;
  //   console.log("Connected!");
  // });

  // const sql = 'SELECT * FROM \`wig20Daily\` LIMIT 50';
  // connection.query(sql, (error, results) => {
  //   if (error) throw error;
  //   console.log('results: ', results);
  // });

  app.listen(port, console.log(`Server is listening on port ${port}...`));


}

start();
