var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

<<<<<<< HEAD
module.exports = router;
=======
// GET /users/author
router.get('/author', function(_, res) {
  res.render('author', {author: "JOSE LUIS Y DIANA"});
});


module.exports = router;
>>>>>>> 5d484f7 (🌠MEJORANDO APP)
