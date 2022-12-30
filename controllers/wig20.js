const Wig20 = require('../models/Wig20');

const addValue = async () => {
  try {
    await Wig20.create({ time: new Date().getTime(), value: 2000 });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addValue
};