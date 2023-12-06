var express = require('express');
var router = express.Router();

/* GET home page. */
// GET /
router.get('/', function(req, res, next) {
 res.render('index', { title: 'ITGAM', author:"JOSE LUIS Y DIANA" });
});

module.exports = router;
