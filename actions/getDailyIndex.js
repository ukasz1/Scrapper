const { parse } = require('node-html-parser');

const getDailyIndex = (htmlCode) => {
  const statsDir = [
    'closingPrice',
    'openingPrice',
    'maxPrice',
    'minPrice'
  ];
  
  // scrap daily index points
  const closingPriceSelector = '.profilLast';
  const statsSelector = '.startingData td ~ td';
  
  const root = parse(htmlCode);
  const closingPriceNode = root.querySelector(closingPriceSelector);
  const closingPriceString = closingPriceNode.innerHTML.replace(/\&nbsp;/g, '');
  const closingPrice = Number(closingPriceString.replace(',', ''));
  
  const dailyStats = {};
  dailyStats[statsDir[0]] = closingPrice;

  const statsNodesCollection = root.querySelectorAll(statsSelector);
  
  for (let i = 1; i <= 3; i++) {
    const scrappedPriceString = statsNodesCollection[i].childNodes[0]._rawText;
    const statPriceString = scrappedPriceString.replace(/\&nbsp;/g, '');
    const statPrice = Number(statPriceString.replace(',', ''));
    dailyStats[statsDir[i]] = statPrice;
  }

  // change decimals to ints
  const indexToUpload = {};
  for (const key in dailyStats) {
    indexToUpload[key + 'Int'] = dailyStats[key];
  }

  return indexToUpload;
}

module.exports = { getDailyIndex };
