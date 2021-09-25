const Plan = require('../models/PlanModel.js');
const moment = require('moment');

// add plan
const addPlan = async (req, res) => {
  const { name, allowedTeachers, allowedHouses } = req.body;
  try {
    const result = await Plan.create({
      name,
      allowedTeachers,
      allowedHouses,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// delete plans
const deletePlan = (req, res) => {
  const { id } = req.params;
  Plan.findByIdAndRemove(id)
    .then((plan) => {
      res.status(200).json({ success: true, plan });
    })
    .catch((error) => {
      res.status(500).json({ message: 'No such plan in database', error });
    });
};
// getPlans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({});
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'No plan in database', error });
  }
};

// update/edit plan
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const planInfo = req.body;
  planInfo.updatedAt = moment();
  try {
    const plan = await Plan.findByIdAndUpdate(id, planInfo);
    res.status(200).json({ message: 'Plan has been updated!', plan });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


module.exports = {
  addPlan,
  getPlans,
  deletePlan,
  updatePlan,
};
