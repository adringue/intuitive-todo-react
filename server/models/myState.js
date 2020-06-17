const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
  userState: {},
  owner: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  date_Start: Date,
  date_End: Date,
  createAt: {type: Date, default: Date.now}
})
module.exports = mongoose.model('myState', StateSchema);
