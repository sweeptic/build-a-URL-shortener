var express = require('express');
var app = express();
var cors = require('cors');
let port = process.env.PORT;

const mongoose = require('mongoose');
const defaultRoutes = require('./routes/default');
const apiRoutes = require('./routes/api');
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.use('/', defaultRoutes);
app.use('/api', apiRoutes);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    if (port == null || port == '') {
      port = 8000;
    }

    console.log('XXXXX', port);

    listener = app.listen(port, function () {
      console.log('Your app is listening on port ' + listener.address().port);
    });
  })
  .catch(err => console.log(err));

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
