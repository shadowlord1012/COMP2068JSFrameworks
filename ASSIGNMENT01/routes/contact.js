var express = require('express');
var router = express.Router();

/* GET Contact page */
router.get('/',function(req,res,next) {
    res.render('contact', { title: 'Contact'});
});

module.exports = router;
/* there will be updates on this page dealing with the contact information that is on the portfoilo. 
 */