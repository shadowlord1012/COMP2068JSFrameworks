var express = require('express');
var router = express.Router();

/* GET Contact page */
router.get('/',function(req,res,next) {
    res.render('updates', { title: 'Game Updates'});
});

module.exports = router;

/* I will add in for some basic crub operations in this so that i am not continously updating 
the JS scrip to add in new information. The new information will include a brief summary of the 
update.
*/

