const House = require('../../houses/models/HouseModel');
const School = require('../../schools/models/SchoolModel');
const moment = require('moment');

const updateScore = async (data, io) => {
  const { _id, scoreChange } = data;
  let response = null;
  try {
    const updateQuery = {
      $inc: {
        score: scoreChange,
      },
      updatedAt: moment(),
    };
    const house = await House.findByIdAndUpdate(_id, updateQuery, { new: true });
    const { schoolID } = house;
    const school = await School.findById(schoolID).populate('houses');
    const houses = school.houses.sort((a, b) => (b.score - a.score));
    await School.findOneAndUpdate(
      { _id: schoolID },
      { houses },
    );
    response = {
      message: 'Score has been updated!',
      house,
    };
  } catch (error) {
    response = {
      message: error,
    };
  }
  io.emit('updateScoreResponse', response);
};

module.exports = {
  updateScore,
};
