const userControllerMethods = require ('../controllers/userControllers');
const charityControllerMethods = require ('../controllers/charityControllers');

const middleware = require ('../middleware/middleware');

module.exports = (app) => {
    app.route('/create-user').post(middleware.hashPassword, userControllerMethods.createUser);
    app.route('/users/:id').get(userControllerMethods.getUser);
    app.route('/users/:id').put(userControllerMethods.updateUser);
    app.route('/adminusers').get(userControllerMethods.getAdminUsers);
    app.route('/login').post(middleware.authenticate, userControllerMethods.userLogin);
    app.route('/create-stripe-customer').post(userControllerMethods.createStripeCustomer);
    app.route('/create-stripe-subscription').post(userControllerMethods.createStripeSubscription);
    app.route('/create-charity').post(charityControllerMethods.createCharity);
    app.route('/charities').get(charityControllerMethods.getCharities);
    app.route('/charities/:id').put(charityControllerMethods.updateCharity);
    app.route('/charities/:id').get(charityControllerMethods.getCharity);
}