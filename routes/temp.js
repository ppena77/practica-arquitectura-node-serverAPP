var express = require('express');
var router = express.Router();

/* GET TEMPERATURES */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST TEMPERATURES (Registro temperatura en MongoDB) */
router.get('/reg', (req, res) => {
    res.send('End point funionando')
});

module.exports = router;
