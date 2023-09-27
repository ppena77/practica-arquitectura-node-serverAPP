const express = require('express');
const router = express.Router();

// Importamos modelo mongoDB "SensorData" 
const SensorData = require('../models/sensorData');

// * GET TEMPERATURES (Para extraer la temperatura máxima, mínima y la media)

router.get('/', (req, res) => {
  SensorData.find({})
    .then( result => {
      res.json( result )
    })
    .catch( err => console.log(err) )
});

//* POST TEMPERATURES (Registro temperatura en MongoDB)

router.post('/reg', (req, res) => {

  /* Validación para comprobar que los datos recibidos vienen en Json */
  if (req.headers['content-type'] === 'application/json') {

    const data = req.body; // Guardamos datos recibidos

    // Apuntamos a la colección de mongoDB "SensorData" y mandamos a inyectar los datos como un nuevo Documento
    SensorData.create(data) 
      .then( result => { 
        res.json(result) // Si todo va bien, mandamos el resultado que nos devuelve el método "create" de mongoose como respuestas
      })
      .catch( err => console.log(err) ) // Si no va bien, imprimimos el error
    
  } else {
    /* Si los datos que llegan no vienen como json, mandamos respuesta a Sensor App e imprimimos en consola */
    console.log('Recieved request in /temp/reg url is not a Json object');
    res.send('Recieved request in /temp/reg is not a Json object');
  }    
});

module.exports = router;
