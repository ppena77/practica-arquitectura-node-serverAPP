const express = require('express');
let router = express.Router();

// * EXPRESS MIDDLEWARE

// * GET TEMPERATURES
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//* POST TEMPERATURES (Registro temperatura en MongoDB)
router.post('/reg', (req, res) => {

  /* Validación para comprobar que los datos recibidos vienen en Json */
  if (req.headers['content-type'] === 'application/json') {

    let data = req.body; // Guardamos datos recibidos
    console.log(data);

  } else {

    console.log('Recieved request in /temp/reg url is not a Json object');
    res.send('Recieved request in /temp/reg is not a Json object');

  }    
});

module.exports = router;
