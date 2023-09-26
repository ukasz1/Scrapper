// const { getCurrentCompaniesTable } = require('./actions/getCurrentCompaniesTable');
// const { getQuoteTime } = require('./actions/getQuoteTime');
const uploadDailyIndex = require('./db/queries/uploadDailyIndex');
const {SERVER_URL, SERVER_REFRESH_TIME_IN_MIN, DATA_SOURCE_ENDPOINT, ENABLE_GETTING_DAILY_INDEX} = require('./config.js');

require('dotenv').config();

const connection = require('./db/connect')
const fetch = require("node-fetch");
const cron = require('node-cron');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

if (ENABLE_GETTING_DAILY_INDEX) {
  connection.connect(err => {
    if (err)
      throw err;
    console.log("Connected!");
  });
}


const scrapDailyIndex = async () => {
  fetch(DATA_SOURCE_ENDPOINT)
  .then(res => res.text())
  .then(scrapedCode => {
    uploadDailyIndex(scrapedCode, connection);
    console.log('Daily index scrapped at: ', new Date());
  })
  .catch(error => {
    console.log(error);
  });
}

cron.schedule('10 17 * * 1-5', async () => {
  if (ENABLE_GETTING_DAILY_INDEX) {
    await scrapDailyIndex();
  }
})

const refreshServerSession = async () => {
  fetch(SERVER_URL)
    .then((res) => {
      console.log('Session refreshed - time: ', new Date());
    })
}

// Refresh server
setInterval(refreshServerSession, SERVER_REFRESH_TIME_IN_MIN*60000);

// connection.end();

app.get('/', (req, res) => {
  res.send('<h1>Scrapping serwer</h1>')
});

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}

start();
