console.log("Louvado Seja Yah Jeová Deus Todo-Poderoso!")

// **************************************************************************************************
// ******* MICROSERVICE INDEX SETUP                                                           *******
// **************************************************************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
// require('dotenv-safe').config;                       // Load environment variables
const movies = require('./api/movies');                 // Load the movies API
const repository = require('./repository/repository')   // Load the repository
const server = require('./server/server');              // Load the server 

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
// :)➔ AUTO INVOKE ANONIMOUS FUNCTION TO START THE MICROSERVICE
(async () => {
    try{
        await server.startServer(movies, repository);       // Start server
    }
    catch(error){
        console.error(error);
    }
})();
