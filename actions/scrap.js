const { parse } = require('node-html-parser');

const scrap = (res) => {
  const root = parse(res);
  const wig20 = {};

  const singleCompanyInfo = {};

  const tbodyElement = root.querySelector('.box945 table tbody');
  const trElementList = tbodyElement.querySelectorAll('tr');

  const tdElementList = trElementList[1].querySelectorAll('td');
  tdElementList.forEach((item, index) => {
    if (index === 0) {
      singleCompanyInfo[index] = item.querySelector('a').innerHTML;
    } else {
      singleCompanyInfo[index] = item.innerHTML;
    }
  });


  // info.name = td.querySelector('a').innerHTML;





  console.log(singleCompanyInfo);
}

module.exports = { scrap }
