const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const passport = require('passport');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const leads = require('./routes/leads');
const passportConfig = require("./config/passport");
const cors = require('cors');
const mongoUrl = process.env.DB_URL;

mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit:'50mb',
    parameterLimit: 50000
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/api/users", users);
app.use("/api/leads", passport.authenticate('jwt', {session: false}), leads);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
