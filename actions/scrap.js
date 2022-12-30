const { parse } = require('node-html-parser');

const scrap = (res) => {
  const root = parse(res);
  const wig20 = {};
  const companies = []; // aktualny stan WIG20

  const tbodyElement = root.querySelector('.box945 table tbody');
  const trElementList = tbodyElement.querySelectorAll('tr');

  trElementList.forEach((item) => {
    const singleCompanyInfo = {};
    const tdElementList = item.querySelectorAll('td');
    tdElementList.forEach((item, index) => {
      if (index === 0) {
        singleCompanyInfo[index] = item.querySelector('a').innerHTML;
      } else {
        singleCompanyInfo[index] = item.innerHTML;
      }
    });
    companies.push(singleCompanyInfo);
  })
  // console.log(companies);
}

module.exports = { scrap }
