var express = require('express');
var app = express();
var cors = require('cors');

const defaultRoutes = require('./routes/default');
const apiRoutes = require('./routes/api');
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.khhwa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.use('/', defaultRoutes);
app.use('/api', apiRoutes);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
