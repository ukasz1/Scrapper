const {getDailyIndex} = require('../../actions/getDailyIndex');

const uploadDailyIndex = (code, connection) => {
  const {closingPriceInt, openingPriceInt, maxPriceInt, minPriceInt} = getDailyIndex(code);

  const createDailyPointsTableQuery =
    `CREATE TABLE IF NOT EXISTS \`wig20DailyPoints\`(
      ID INT PRIMARY KEY AUTO_INCREMENT,
      open MEDIUMINT NOT NULL,
      max MEDIUMINT NOT NULL,
      min MEDIUMINT NOT NULL,
      close MEDIUMINT NOT NULL,
      time DATE NOT NULL
    )`;

  connection.query(createDailyPointsTableQuery, (error, results) => {
    if (error) throw error;
    // console.log('results: ', results);
  });

  const insertPointsQuery =
    `INSERT INTO \`wig20DailyPoints\` (open, max, min, close, time) VALUES (
      ${openingPriceInt},
      ${maxPriceInt},
      ${minPriceInt},
      ${closingPriceInt},
      '${new Date().toISOString().slice(0, 10)}'
    )`;
      
  connection.query(insertPointsQuery, (error, results) => {
    if (error) throw error;
    // console.log('results: ', results);
  });
}

module.exports = uploadDailyIndex;
