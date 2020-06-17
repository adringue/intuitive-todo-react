const express = require('express')
const { provideErrorHandler } = require('./middlewares');
const path = require('path');
const router = express.Router();
const cors = require('cors')
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const mongoose = require('mongoose');
// console.log(__dirname)
const server = express()
const config = require('./config');
userRoutes = require('./routes/userRoutes');


// const pubDir = path.join(__dirname, '../public');
// app.use(express.static(pubDir))


///Middleware
server.use(cors());
server.options('*', cors());
server.use(bodyParser.json());
server.use(provideErrorHandler);


// append /api for our http requests
server.use('/api', router);

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(logger('dev'));
/////////////////////connection to database///////////////
mongoose.connect(config.MyConfig.DB_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log("connected to ToDo database");
})
  .catch((err) => {
    console.log(err);
    console.log("Connection to ToDo database failed!");
  });
///////////////////////////////////////////////////////////

///////////////////API END POINTS////////////////////////
server.use('/api/todo/users', userRoutes);
// server.use('/api/todo/todos', todoRoutes);

////////////////////////////////////////////////////

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
