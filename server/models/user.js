const bcrypt= require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username:{
    type: String,
    min: [4,'server said: Too short, min is 4 characters' ],
    max: [32, 'server said: Too long, max is 32 characters']
  },
  email:{
    type: String,
    min: [4,'server said: Too short, min is 4 characters' ],
    max: [32, 'server said: Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'server said: Email is required',
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password:{
    type: String,
    min: [4,'server said: Too short, min is 4 characters' ],
    max: [32, 'server said: Too long, max is 32 characters'],
    required: 'server said: password is required'
  },
  tasks: [{
    type: Schema.Types.ObjectId, ref: 'Task'
  }],

});
userSchema.methods.hasSamePassword= function(requestedPassword){
  return bcrypt.compareSync(requestedPassword, this.password);
}
userSchema.pre('save', function(next){
  const user=this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password=hash;
      next(); // will call function in the queue--> save the user in the database!
    });
  });
});
module.exports= mongoose.model('User', userSchema);
