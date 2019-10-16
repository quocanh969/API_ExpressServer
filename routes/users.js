var express = require('express');
var User = require('../connecDB');
var router = express.Router();

const createNewUser = async ({ name, password }) => {
  return await User.create({ name, password });
};

router.get('/',function(req,res,next) {
  res.json("hello user");
})

/* GET users listing. */
router.post('/register', function(req, res, next) {
  const {name, password} = req.body;
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
});

module.exports = router;
