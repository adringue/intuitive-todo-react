// const express = require('express')
// // const path = require('path');
// const router = express.Router();
// const cors = require('cors')
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const Data = require('./data');
// const mongoose = require('mongoose');
// // console.log(__dirname)
// const server = express()
//
// // const pubDir = path.join(__dirname, '../public');
// // app.use(express.static(pubDir))
//
// server.use(cors());
// server.options('*', cors());
// server.use(bodyParser.json());
//
// // << db setup >>
// const db = require("./db");
// const dbName = "datadb";
// const collectionName = "todo-collection";
// server.get('/', (req, res) => {
//     res.send("hello from api!");
// });
//
// // append /api for our http requests
// server.use('/api', router);
//
// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use(logger('dev'));
//
//
// // << db init >>
// db.initialize(dbName, collectionName, function (dbCollection) { // successCallback
//
//     // get all items  - only in Test Env
//     // dbCollection.find().toArray(function (err, result) {
//     //     if (err) throw err;
//     //     console.log(result);
//     // });
//
//     // << db CRUD routes >>
//     server.post("/items", (request, response) => {
//         const item = request.body;
//         dbCollection.insertOne(item, (error, result) => { // callback of insertOne
//             if (error) throw error;
//             // return updated list
//             dbCollection.find().toArray((_error, _result) => { // callback of find
//                 if (_error) throw _error;
//                 response.json(_result);
//             });
//         });
//     });
//
//     server.get("/items/:id", (request, response) => {
//         const itemId = request.params.id;
//
//         dbCollection.findOne({ id: itemId }, (error, result) => {
//             if (error) throw error;
//             // return item
//             response.json(result);
//         });
//     });
//
//     //Read all
//     server.get("/items", (request, response) => {
//         // return updated list
//         dbCollection.find().toArray((error, result) => {
//             if (error) throw error;
//             response.json(result);
//         });
//     });
//
//     //Update
//     server.put("/items/:id", (request, response) => {
//         const itemId = request.params.id;
//         const item = request.body;
//         console.log("Editing item: ", itemId, " to be ", item);
//
//         dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
//             if (error) throw error;
//             // send back entire updated list, to make sure frontend data is up-to-date
//             dbCollection.find().toArray(function (_error, _result) {
//                 if (_error) throw _error;
//                 response.json(_result);
//             });
//         });
//     });
//
//
//
//     server.delete("/items/:id", (request, response) => {
//         const itemId = request.params.id;
//         console.log("Delete item with id: ", itemId);
//
//         dbCollection.deleteOne({ id: itemId }, function (error, result) {
//             if (error) throw error;
//             // send back entire updated list after successful request
//             dbCollection.find().toArray(function (_error, _result) {
//                 if (_error) throw _error;
//                 response.json(_result);
//             });
//         });
//     });
//
// }, function (err) { // failureCallback
//     throw (err);
// });
// //////////////////////////////////////users collection////////////////////////////////////
//
// ////////////////////////////////////////end users collection//////////////////////////////
// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//     console.log(`app running on port ${PORT}`)
// });
