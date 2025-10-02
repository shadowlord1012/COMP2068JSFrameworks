var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
    res.redirect('https://www.linkedin.com/in/mike-kipp-b84956322');
});

module.exports = router;