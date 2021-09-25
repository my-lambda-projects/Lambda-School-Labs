/* Score Model not created */
const House = require('../../houses/models/HouseModel');
const moment = require('moment');

const updateScore = async (req, res) => {
  const { _id } = req.body;
  const houseInfo = req.body;
  houseInfo.updatedAt = moment();
  try {
    const house = await House.findByIdAndUpdate(_id, houseInfo, { new: true });
    res.status(200).json({ message: 'Score has been updated!', house });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  updateScore,
};
