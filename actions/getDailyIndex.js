const { parse } = require('node-html-parser');

const getDailyIndex = (htmlCode) => {
  const root = parse(htmlCode);

  const statsDir = [
    'closingPrice',
    'openingPrice',
    'maxPrice',
    'minPrice'
  ];

  const closingPriceSelector = '.profilLast';
  const statsSelector = '.startingData td ~ td';
  
  const closingPriceNode = root.querySelector(closingPriceSelector);
  const closingPriceString = closingPriceNode.innerHTML.replace(/\&nbsp;/g, '');
  const closingPrice = Number(closingPriceString.replace(',', '.'));
  
  const dailyStats = {};
  dailyStats[statsDir[0]] = closingPrice;

  const statsNodesCollection = root.querySelectorAll(statsSelector);
  
  for (let i = 1; i <= 3; i++) {
    const scrappedPriceString = statsNodesCollection[i].childNodes[0]._rawText;
    const statPriceString = scrappedPriceString.replace(/\&nbsp;/g, '');
    const statPrice = Number(statPriceString.replace(',', '.'));
    dailyStats[statsDir[i]] = statPrice;
  }
  console.log('valueNodesCollection: ', dailyStats);
}

module.exports = { getDailyIndex };
