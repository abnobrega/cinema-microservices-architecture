// *************************************************
// ******* CONFIGURAÇÕES DO API-GATEWAY      *******
// *************************************************
// O API-Gateway tem tudo o que é essencial para todos os microsserviços. 
// Tudo o que for específico a um determinado microsserviço fica neste respectivo microsserviço.

// ****************************
// *******  ATRIBUTES   *******
// ****************************
const express = require('express');
const HttpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const proxy = require('express-http-proxy');
const authController = require('../controllers/authController');

const app = express();

//• MIDDLEWARE LAYER: SECURITY
app.use(helmet());      // Middleware that provides the 1st layer of server security
//• MIDDLEWARE LAYER: LOG MANAGEMENT
app.use(morgan('dev')); // Middleware for managing request logs in the console
app.use(cookieParser());   
//• MIDDLEWARE LAYER: BODY PARSER
app.use(express.json());// Middleware for body parsing for conversion to JSON format   

const options = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl; // Passar a URL original recebida para o microsserviço de destino.
    }
}

// CONFIGURAÇÃO DAS ROTAS COM PRIORIDADE SUPERIOR
app.post('/login', authController.validateLoginSchema, authController.doLogin); 

// Todos os paths passam aqui e são validados no blacklist antes
app.use(authController.validateBlacklist); 

app.post('/logout', authController.validateToken, authController.doLogout); 

// CONFIGURAÇÃO DOS PROXYS
const moviesServiceProxy = HttpProxy(process.env.URL_MOVIES_API, options);
const catalogServiceProxy = HttpProxy(process.env.URL_CATALOG_API, options);

// CONFIGURAÇÃO DAS ROTAS COM PRIORIDADE 2
app.use('/movies', moviesServiceProxy);
//app.get(/cities|cinemas/i, catalogServiceProxy);
app.use(/\/cities|\/cinemas/i, catalogServiceProxy);

const server = app.listen(process.env.API_GATEWAY_PORT, () => {
    console.log(`The API Gateway has started on port ${process.env.API_GATEWAY_PORT}`);
});

module.exports = server;