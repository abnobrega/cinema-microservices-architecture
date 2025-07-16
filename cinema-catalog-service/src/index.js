console.log('Louvado Seja Yah Jeová Deus Todo-Poderoso!');
console.log("Louvado Seja Yah Jeová Deus Todo-Poderoso!")

// **************************************************************************************************
// ******* MICROSERVICE 'CINEMA-CATALOG.SERVICE' INDEX SETUP                                                           *******
// **************************************************************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
// require('dotenv-safe').config;                       // Load environment variables
const cinemaCatalog = require('./api/cinemaCatalog');   // Load the cinemaCatalog API
const repository = require('./repository/repository')   // Load the repository
const server = require('./server/server');              // Load the server 

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
// :)➔ AUTO INVOKE ANONIMOUS FUNCTION TO START THE MICROSERVICE
(async () => {
    try{
        await server.startServer(cinemaCatalog, repository);   // Start server
    }
    catch(error){
        console.error(error);
    }
})();
