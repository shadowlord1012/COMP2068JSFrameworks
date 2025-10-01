var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
    res.redirect('https://github.com/shadowlord1012');
});

module.exports = router;