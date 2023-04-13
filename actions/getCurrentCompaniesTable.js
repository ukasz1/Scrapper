const { parse } = require('node-html-parser');

// ***** Get current WIG20 table *****

const getCurrentCompaniesTable = (htmlCode) => {
  const root = parse(htmlCode);

  const companiesDict = {
    0: 'name',
    1: 'ticker',
    2: 'price',
    3: 'value_change',
    4: 'percentage_change',
    5: 'percentage_influence',
    6: 'share_in_trading',
    7: 'volume',
    8: 'portfolio_share'
  }

  const companies = [];

  const tbodyElement = root.querySelector(process.env.WIG20_TABLE_SELECTOR);
  const trElementList = tbodyElement.querySelectorAll('tr');

  trElementList.forEach((item) => {
    const singleCompanyInfo = {};
    const tdElementList = item.querySelectorAll('td');
    tdElementList.forEach((item, index) => {
      if (index === 0) {
        singleCompanyInfo[companiesDict[index]] = item.querySelector('a').innerHTML;
      } else {
        singleCompanyInfo[companiesDict[index]] = item.innerHTML;
      }
    });
    companies.push(singleCompanyInfo);
  });

  console.log('Companies details (by stock quote time): ', companies);
}

module.exports = { getCurrentCompaniesTable }
