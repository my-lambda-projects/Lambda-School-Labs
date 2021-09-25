const {
  addPlan,
  getPlans,
  deletePlan,
  updatePlan,
} = require('../controllers/PlanController');

// Import superadmin authentication

module.exports = (server) => {
  server.route('/api/plan').post(addPlan);
  server.route('/api/plan').get(getPlans);
  server.route('/api/plan/:id').delete(deletePlan);
  server.route('/api/plan/:id').put(updatePlan);
};
