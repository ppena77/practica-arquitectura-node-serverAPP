// * IMPORTS

const express = require('express');
const router = express.Router();

const Temp = require('../models/temps');  // Importamos modelo mongoDB "Temp" 
const tempCalculations = require('../js/tempCalculations'); // Importamos lo métodos para extraer y calcular los datos de interés (temperatura mínima, máxima, media y número de registros)

// * GET TEMPERATURES (Para extraer la temperatura máxima, mínima y la media)

router.get('/', (req, res) => {
  Temp.find({}) // Queremos encontrar todos los documentos registrados en la colección Temps de MongoDB
    .then( rawData => {
      res.json(rawData);
      console.log( rawData );
    })
    .catch( err => console.log(err) )
});

//* POST TEMPERATURES (Registro temperatura en MongoDB)

router.post('/reg', (req, res) => {

  /* Validación para comprobar que los datos recibidos vienen en Json */
  if (req.headers['content-type'] === 'application/json') {

    const data = req.body; // Guardamos datos recibidos

    // Apuntamos a la colección de mongoDB "Temps" y mandamos a inyectar los datos como un nuevo Documento
    Temp.create(data) 
      .then( result => { 
        res.json(result) // Si todo va bien, mandamos el resultado que nos devuelve el método "create" de mongoose como respuesta
      })
      .catch( err => {
        console.log(err)
        res.send(err)
      } ) // Si no va bien, imprimimos el error a la vez que lo mandamos como respuesta también
    
  } else {
    /* Si los datos que llegan no vienen como json, mandamos respuesta a Sensor App e imprimimos en consola igualmente */
    console.log('Recieved request in /temp/reg url is not a Json object');
    res.send('Recieved request in /temp/reg is not a Json object');
  }    
});

module.exports = router;