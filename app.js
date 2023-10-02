require('dotenv').config();
const connection = require('./db/connect')
const fetch = require("node-fetch");
const cron = require('node-cron');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

const uploadDailyIndex = require('./db/queries/uploadDailyIndex');
const {
  SERVER_URL, 
  SERVER_REFRESH_TIME_IN_MIN, 
  DATA_SOURCE_ENDPOINT, 
  ENABLE_GETTING_DAILY_INDEX
} = require('./config.js');

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

const scrapDailyIndex = () => {
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

// Cron schedules
cron.schedule('10 17 * * 1-5', async () => {
  if (ENABLE_GETTING_DAILY_INDEX) {
    scrapDailyIndex();
  }
})

// Refresh the server to not go into sleep mode (free tier)
const refreshServerSession = async () => {
  fetch(SERVER_URL)
    .then(() => {
      console.log('Session refreshed - time: ', new Date());
    })
}
setInterval(refreshServerSession, SERVER_REFRESH_TIME_IN_MIN*60000);

// Endpoints
app.get('/', (req, res) => {
  res.send('<h1>Scrapping serwer</h1>')
});

const port = process.env.PORT || 5000;

const start = async () => {
  app.listen(port, console.log(`Server is listening on port ${port}...`));
}

start();
