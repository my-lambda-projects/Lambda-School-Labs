const House = require('../models/HouseModel.js');
const School = require('../../schools/models/SchoolModel');
const moment = require('moment');

// add houses
const addHouse = async (req, res) => {
  const houseInfo = req.body;
  const { schoolID, isAdmin } = req.decoded;
  houseInfo.schoolID = schoolID;
  if (!isAdmin) {
    res.status(500).json({ message: 'error' });
  } else {
    try {
      const house = await House.create(houseInfo);
      await School.findOneAndUpdate(
        { _id: schoolID },
        { $push: { houses: house } },
      );
      res.status(201).json(house);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};
// delete houses
const deleteHouse = async (req, res) => {
  const { isAdmin } = req.decoded;
  const houseID = req.params.id;
  if (!isAdmin) {
    res.status(500).json({ message: 'error' });
  } else {
    try {
      const house = await House.findById(houseID);
      const { schoolID } = house;
      await School.findOneAndUpdate(
        { _id: schoolID },
        { $pull: { houses: houseID } },
      );
      const removedHouse = await House.findByIdAndRemove(houseID);
      res.status(200).json({ success: true, removedHouse });
    } catch (error) {
      res.status(500).json({ message: 'No such house in database', error });
    }
  }
};
// get all Houses //use populate for having one network call.
const getHouseBySchool = async (req, res) => {
  const { schoolID } = req.decoded;
  try {
    const school = await School.findById(schoolID).populate('houses');
    const { houses } = school;
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: 'No such house in database', error });
  }
};

// Another funtion to access just the credentials of the houses of a school 
// William -- You can use this function for displaying score, color, name, mascot  of 
// houses of a particular school. This will come as a public/non auth user clicks on a specific school among list of schools.

const publicgetHousesBySchoolId = async (req, res) => {
  const schoolID = req.params.id;
  try {
    const school = await School.findById(schoolID).populate('houses');
    const { houses } = school;
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: 'No such house in database', error });
  }
};

// update/edit house //used for changing score as well
const updateHouse = async (req, res) => {
  const { schoolID, isAdmin } = req.decoded;
  if (!isAdmin) {
    res.status(500).json({ message: 'error' });
  } else {
    const houseID = req.params.id;
    const houseInfo = req.body;
    houseInfo.updatedAt = moment();
    try {
      const house = await House.findByIdAndUpdate(houseID, houseInfo);
      const school = await School.findById(schoolID).populate('houses');
      const houses = school.houses.sort((a, b) => (b.score - a.score));
      await School.findOneAndUpdate(
        { _id: schoolID },
        { houses },
      );
      res.status(200).json({ message: 'House has been updated!', house });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
};

module.exports = {
  addHouse,
  deleteHouse,
  updateHouse,
  getHouseBySchool,
  publicgetHousesBySchoolId,
};
