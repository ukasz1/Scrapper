const {getDailyIndex} = require('../../actions/getDailyIndex');
// const connection = require('../connect')

const uploadDailyIndex = (code, connection) => {
  const {closingPriceInt, openingPriceInt, maxPriceInt, minPriceInt} = getDailyIndex(code);

  // connection.connect(err => {
  //   if (err)
  //     throw err;
  //   console.log("Connected!");
  // });

  // const sql = `INSERT INTO \`wig20Daily\` VALUES (${openingPriceInt}, ${maxPriceInt}, ${minPriceInt}, ${closingPriceInt})`;
  const sql = 'SELECT * FROM \`wig20Daily\` ';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    console.log('results: ', results);
  });
  // connection.end();
}

module.exports = uploadDailyIndex;