const { register } = require('../controllers/user/registerUser');
const { login, checkToken } = require('../controllers/user/loginUser');
const { cellCode, checkCode } = require('../controllers/user/codeLogin');
const { changePassword } = require('../controllers/user/changePassword');
const { updateStripeInfo } = require('../controllers/user/updateUser');

const { addInvoice } = require('../controllers/invoice/addInvoice');
const {
  getAllInvoices,
  getOneInvoice,
  clientInvoice,
  getpdf,
} = require('../controllers/invoice/getInvoice');
const { deleteInvoice } = require('../controllers/invoice/deleteInvoice');
const { updateInvoice } = require('../controllers/invoice/updateInvoice');

const { restricted, authenticate } = require('../config/auth');

const {
  allReminders,
  setofReminders,
  createReminder,
  getReminder,
  deleteReminder,
  cancelSchedule,
} = require('../controllers/reminder/reminderCrud');

const {
  authorizeConnect,
  connectToken,
} = require('../controllers/stripe/connect');

const { stripeCharge } = require('../controllers/stripe/stripeCharge');
const { payInvoice } = require('../controllers/stripe/payInvoice');

module.exports = app => {
  // USER ROUTES
  app.post('/api/register', register);
  app.post('/api/login', authenticate, login);
  app.get('/api/login', restricted, checkToken);
  app.post('/api/changepassword', restricted, changePassword);
  // app.post('/api/usi', restricted, updateStripeInfo);
  // Code Based Login
  app.post('/api/cellcode', cellCode);
  app.post('/api/checkcode', checkCode);
  // INVOICE ROUTES
  app.post('/api/addinvoice', restricted, addInvoice);
  app.get('/api/invoices', restricted, getAllInvoices);
  app.get('/api/invoices/:number', restricted, getOneInvoice);
  app.delete('/api/deleteinvoice/:number', restricted, deleteInvoice);
  app.put('/api/updateinvoice/:invNumber', restricted, updateInvoice);
  app.get('/api/clientinvoice/:invoiceID', clientInvoice);
  app.get('/viewpdf/:id', getpdf);

  // REMINDER ROUTES
  app.get('/api/getsms', restricted, setofReminders);
  app.get('/api/sms', restricted, allReminders);
  app.post('/api/sms/:_id', restricted, createReminder);
  app.delete('/api/deletesms', restricted, deleteReminder);
  app.get('/api/getsms/:id', restricted, getReminder);

  app.put('/api/cancelreminder/:id', restricted, cancelSchedule);
  // STRIPE ROUTES
  app.post('/api/charge', restricted, stripeCharge);
  app.post('/api/payinvoice', payInvoice);
  //Stripe Connect
  app.get('/stripe/authorize', restricted, authorizeConnect);
  app.get('/stripe/token', connectToken);
};
