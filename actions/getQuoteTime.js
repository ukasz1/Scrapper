const { parse } = require('node-html-parser');

// ***** Gets the time of the quote *****

const getQuoteTime = (htmlCode) => {
  const root = parse(htmlCode);

  const time = root.querySelector('time');
  const timeString = time.textContent;

  const timeArrayString = timeString.split(/[-: ]/);
  const timeArrayNumber = timeArrayString.map((item) => Number(item));

  // Date object creation
  const dateObject = new Date();
  dateObject.setFullYear(timeArrayNumber[0]);
  dateObject.setMonth(timeArrayNumber[1] - 1);
  dateObject.setDate(timeArrayNumber[2]);
  dateObject.setHours(timeArrayNumber[3], timeArrayNumber[4], timeArrayNumber[5], 0);

  const stockQuotesTimestamp = dateObject.getTime();

  console.log('==========================');
  console.log('Stock quote time date object: ', dateObject);
  console.log('Stock quote time timestamp: ', stockQuotesTimestamp);
  console.log('Quote time: ', dateObject.toLocaleString());
  console.log('Current time: ', new Date().toLocaleString());
}

module.exports = { getQuoteTime }
