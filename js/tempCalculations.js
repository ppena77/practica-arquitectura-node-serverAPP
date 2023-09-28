const tempExtraction = (tempRecords) =>  { // Pasamos datos de la colección Temps a la función
    return new Promise((resolve, reject) => { // Declaramos que retorne una promesa
        // console.log('firing tempExtraction');
        // console.log('Checking recieved parameter', tempRecords);
        let tempArray = []; // Declaramos un array vacío donde volcaremos los datos de temperatura

        tempRecords.forEach( tempRecord => {
            // console.log('Checking tempRecord.temperatura', tempRecord.temperatura);
            tempArray.push(tempRecord.temperatura)
        });
        // console.log('Checking tempArray', tempArray);
        if (tempArray.length > 0) { // Validación para comprobar que no tenemos un array vacío

            resolve(tempArray); // Resolvemos y devolvemos el array con las temperaturas
            // console.log('Checking if Extraction goes through resolve')

        } else { // Si el array está vacío, o bien no hay datos en la colección MongoDB, o la función ha fallado

            reject('No hay datos de temperatura')
            // console.log('Checking if Extraction goes through reject')
        }
    })
};

const tempOperations = (tempArray) => { // Pasamos array con temperaturas a la función
    return new Promise((resolve, reject) => { // Declaramos que retorne una promesa
        let min = Math.min(...tempArray);  // Sacamos temperatura mínima
        let max = Math.max(...tempArray);  // Sacamos temperatura máxima
        let length = tempArray.length;  // Sacamos número de temperaturas del array
        let sum = 0;    // Declaramos variable donde almacenaremos la suma de todas las temperaturas del array
        tempArray.forEach( temp => {    // Loop para sumar temperaturas
            sum += temp;
            })
        let avg = sum/length;   // Calculamos la temperatura media

        resolve( {min, max, length, avg} ); // Resolvemos y devolvemos todos los datos de interés
        })
};

module.exports = {
    tempExtraction,
    tempOperations
}