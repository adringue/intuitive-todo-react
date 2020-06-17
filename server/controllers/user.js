
const User = require('../models/user');
const myState = require('../models/myState');
const {normalizeErrors} = require('../helpers/mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.MyConfig.GOOGLE_CLIENT_ID);

exports.login = function (req, res) {
  const {
    email,
    password
  } = req.body;
  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }
  User.findOne({
    email: email
  }, function (err, result) {
    if (err) {
      return res.status(422).send({
        errors:normalizeErrors(err.errors)
      });
    }
    if (!result) {

      const token = res.status(422).send({
        errors: [{
          title: 'Invalid User!',
          detail: 'User does not exist'
        }]
      });
      // return res.json(token);
      return token;
    }
    if (result.hasSamePassword(password)) {
      // return JWT token to the user
      const jwtSign = jwt.sign({
        userId: result._id,
        username: result.username,
      }, config.MyConfig.SECRET, {
        expiresIn: '3h'
      });

      return res.json(jwtSign);
    } else {
      return res.status(422).send({
        errors: [{
          title: 'IWrong data!',
          detail: 'wrong email or password'
        }]
      });
    }
  });
};
exports.register = function (req, res) {
  console.log("aef");
  console.log(req.body);
  const {
    username,
    email,
    password,
    confirm_password
  } = req.body;
  if (!password || !email) {
    return res.status(422).send({
      errors: [{
        title: 'Data missing!',
        detail: 'Provide email and password'
      }]
    });
  }
  if (!(password === confirm_password)) {
    return res.status(422).send({
      errors: [{
        title: 'Invalid password!',
        detail: "password doesn't match confirmation password! "
      }]
    });
  }
  User.findOne({
    email: email
  }, function (err, result) {
    if (err) {
      return res.status(422).send({
        errors: normalizeErrors(err.errors)
      });
    }
    if (result) {
      return res.status(422).send({
        errors: [{
          title: 'Invalid email!',
          detail: "User with this email already exist!"
        }]
      });
    }
    const user = new User({
      username,
      email,
      password
    });
    user.save(function (err,result) {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }
      return res.json({
        username:result.username,
        'registered': 'Successful registerd, please Login with credentials!'
      });
    })
  })
};

exports.saveState= async function(req,res,next){
  const myStateData = req.body;
  // myStateData.owner = res.locals.user;
  ///////
  try {
    const myInitState = await myState.findOne({'userState.userId':myStateData.userId});
    // console.log("upStateeeeeee",myInitState);

    if(myInitState){
      console.log("trueeeeeeeeeeeee");
         myInitState.userState=myStateData;
         await myInitState.save();
         console.log("iniiittt:",myInitState)
         return res.status(200).send({message:"state already initialized"});

       }  else{
         myState.create({userState:myStateData}, (error, createdMyState) => {
           // if (error) { return res.mongoError(error); }

           return res.json(createdMyState);
         })

       }

  } catch(error) {
    return res.mongoError(error);
  }
  ////////
}
exports.google_login = function (req, res, next) {
  const google_token_payload = jwt.decode(req.body.idtoken);
  //////////////////
  verify(req.body.idtoken).then(result => {
    User.findOne({
      email:google_token_payload.email
    },
     function(err,result){
      if(err){
        return res.status(422).send({
          errors:normalizeErrors(err.errors)
        });
      }
      ////////////////
      if(!result){
        const user=new User({
         username:`google_${google_token_payload.email}`,
         email: google_token_payload.email,
          password:"nokkkkkkkkkkkkkkkkkkkk"
        });
        user.save(function(err,resu){
          if(err){
            return res.status(422).send({
              errors:normalizeErrors(err.errors)
            });
          }
          const jwtGoogleLogin=jwt.sign({
            userId: resu._id,
            username: resu.username,
          },config.MyConfig.SECRET,{
          expiresIn:'3h'
          })
          console.log("no result",jwt.decode(jwtGoogleLogin));
          return res.json({
            jwtGoogleLogin:jwtGoogleLogin,
            'registered': "Successful  created user from Google Login!"
          })
        })
      }
      ////////////
     if(result){
       const jwtGoogleLogin=jwt.sign({
         userId: result._id,
         username: result.username
       },config.MyConfig.SECRET,{
         expiresIn:'3h'
       })
       console.log("with result",jwt.decode(jwtGoogleLogin));

       return res.json({
         jwtGoogleLogin:jwtGoogleLogin,
         'registered': "Successful  created user from Google Login!"
       })
     }
     }
      )
  })
    .catch(error => {
      return res.status(422).send({
        errors:normalizeErrors(error.errors)
      })
    });
}
exports.updateState = async (req, res,next) => {
  const { userId } = req.params;
  const { user } = res.locals;
  const StateData = req.body;
  console.log("upStateVal",req.body);

  try {
    const myInitState = await myState.findOne({'userState.userId':StateData.userId});
     console.log("updateeeeState",myInitState);
    // if (myState.owner.id !== user.id) {
    //   return res.sendApiError(
    //     { title: 'Invalid User',
    //       detail: 'You are not owner of this rental!'});
    // }
     if(myInitState){
       myInitState.set({userState:StateData});
       await myInitState.save();
       console.log("updateTask:",myInitState);
       return res.status(200).send(myInitState);
     }else{
       return res.status(200).send({message:"State not present!"});

     }

  } catch(error) {
    console.log("errr:",error);
    return res.mongoError(error);
  }
}


exports.onlyAuthUser = function (req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token);
    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({
          errors:normalizeErrors(err.errors)
        });
      }
      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
  }

}

function parseToken(token) {
  // token format here is "Bearer tokenitself", we need to split this string to get tokenitself
  return jwt.verify(token.split(' ')[1], config.MyConfig.SECRET);
}

function notAuthorized(response) {
  response.status(401).send({
    errors: [{
      title: 'Not authorized!',
      detail: "you need to login to get access!"
    }]
  });
}

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.MyConfig.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}


// const g=
//
//   { reducer: { todos: [ [Object], [Object] ] },
//   createTaskDetails:
//   { task: [],
//     tasksCount: 1,
//     currentAddedTask:
//     { bgColor: null,
//       color: null,
//       key: null,
//       end_time: null,
//       start_time: null,
//       stask_int: null,
//       sub: null,
//       sub_display: null,
//       task_int: null,
//       title: null,
//       timeStart_Hours: 5,
//       taskDescription: 'mainTask',
//       timeStart_Min: 1,
//       timeEnd_Hours: 20,
//       timeEnd_Min: 1,
//       timeStart_Hours_interv_one: 0,
//       timeStart_Mins_interv_one: 0,
//       timeEnd_Hours_interv_one: 0,
//       timeEnd_Mins_interv_one: 0,
//       timeStart_Hours_interv_two: 0,
//       timeStart_Mins_interv_two: 0,
//       timeEnd_Hours_interv_two: 0,
//       timeEnd_Mins_interv_two: 0,
//       subTasks_Count: 0,
//       subTasks: [],
//       group: 1,
//       start: null,
//       end: null,
//       date_Start: '2020-05-11T11:21:05.312Z',
//       date_End: '2020-05-11T11:21:05.312Z',
//       id: 1,
//       idTask: 1 },
//     currentSubTask: null,
//       notificationTaskAdded: '',
//     addSubmittedTasks: [ [Object] ],
//     setCurrentTaskToEdit: null },
//   isAuth: true,
//     username: 'nguesseu',
//     currentRegisteredUsername: '',
//     userId: '5eb64d2491457c0bdd716a5b' }
