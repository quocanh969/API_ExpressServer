var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({
        message: 'Authorized',
        user: req.user,
        token: req.query.secret_token
    })
});

module.exports = router;
