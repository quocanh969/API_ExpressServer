var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var User = require('../connecDB');
var router = express.Router();

const createNewUser = async ({ name, password }) => {
  return await User.create({ name, password });
};

router.get('/',function(req,res,next) {
  res.json("hello user");
})

router.post('/register', function(req, res, next) {
  const {name, password} = req.body;

  User.findOne({
    where: {name},
  })
  .then(user=>{
    if(user !== null)
    {
      res.json({
        message:"This name is already exist !!!",
      })
    }   
    else
    {
      createNewUser({name, password})
      .then(
        user => {
          res.json({
            user:user,
            message:"Register success !!!",
          })
        },
        err => {
          res.json({
            message:"Register fail !!!",
          })
        }
      )
    } 
  })
  .catch()
});


router.post('/login', function(req, res, next) {  
  passport.authenticate('local', {session: false}, (err, user, info)=>{        
    if(err || !user)
    {         
        return res.status(400).json({
            message:'Something is not right',
            user: user,
        });
    }

    req.login(user, {session: false}, (err)=>{
        if(err)
        {
            res.send(err);
        }
        let payload = {id:user.id};
        const token = jwt.sign(payload,'1612018_TranQuocAnh');
        return res.json({user,token,info});
    });
  })(req,next);
});

module.exports = router;
