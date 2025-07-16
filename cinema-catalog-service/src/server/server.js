// **************************************************************************************************
// ******* MICROSERVICE SERVER SETUP                                                          *******
// **************************************************************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
// :)➔ CARREGAR/INJETAR AS DEPENDÊNCIAS NECESSÁRIAS
require('express-async-errors');    // Para capturar e tratar erros assíncronos nomiddleware padrão
const express = require('express'); // Para carregar o framwwork express que faz o servidor web. 
const morgan = require('morgan');   // Para carregar o morgan que faa o log de requisições no console
const helmet = require('helmet');   // Para carregar o helmet que faz a 1ª camada de segurança do servidor
const logger = require('../config/logger'); // Para capturar o logger
const MS_NAME = process.env.MS_NAME;// Para carregar a variável de ambiente MS_NAME
const PORT = process.env.PORT;      // Para carregar a variável de ambiente PORT

let server = null;

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
// :)➔ FUNCTION TO START THE MICROSERVICE SERVER
async function startServer(api, repository) {
    const app = express();

    //• MIDDLEWARE LAYER: SECURITY
    app.use(helmet());      // Middleware that provides the 1st layer of server security
    //• MIDDLEWARE LAYER: LOG MANAGEMENT
    app.use(morgan('dev')); // Middleware for managing request logs in the console

    //Add a health check route    
    app.get('/health', (req, res, next) => {
        res.status(200).send(`Health check route: the service ${MS_NAME} is running at port ${PORT}`);
    });

    api(app, repository);   // Call the API function    

    //• MIDDLEWARE LAYER: ERROR MANAGEMENT AND HANDLING
    app.use((error, req, res, next) => { 
        logger.error(error.stack);        
        res.sendStatus(500);
    });

    //• MIDDLEWARE LAYER: EACH MICROSERVICE RUNS ON A DIFFERENT PORT    
    server = app.listen(PORT, () => {
        console.log(`The Service ${MS_NAME} has started on port ${PORT}`);
    });

    return server;
}

// :)➔ FUNCTION TO TERMINATE THE MICROSERVICE SERVER
async function stopServer() {
    if (server) {
        await server.close();
        server = null;
    }
    return true;
}

module.exports = {
    startServer,
    stopServer
};