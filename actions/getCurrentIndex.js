const { parse } = require('node-html-parser');

const getCurrentIndex = (htmlCode) => {
  const indexValueSelector = '.profilLast';

  const root = parse(htmlCode);
  const indexValueNode = root.querySelector(indexValueSelector);
  const indexValueString = indexValueNode.innerHTML.replace(/\&nbsp;/g, '');
  const indexValue = Number(indexValueString.replace(',', ''));

  return indexValue;
}

module.exports = getCurrentIndex;
