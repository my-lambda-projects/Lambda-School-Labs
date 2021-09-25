const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

const models = require('./models');
const routes = require('./routes/routes');

const port = process.env.PORT || 8000
// Test GET request
app.get('/', (req, res) => {
  res.send('GET request');
});

models.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => console.log(`Server listening on ${port}`));
});

routes(app);

module.exports = app;
