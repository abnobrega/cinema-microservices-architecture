// *****************************************************************************
// ******* CONFIGURAR UMA INSTÂNCIA DA FERRAMENTA DE LOGGING WINSTON     *******
// *****************************************************************************
const winston = require('winston');
const path = require('path');

// instanciar um objeto logger personalizado
const logger = winston.createLogger({
    // Personalizar o formato das mensagens de log
    format: winston.format.combine(
        winston.format.errors({ stack: true }),  // habilita o stack trace - (Rastreamento da pilha)
        winston.format.json()                   // Salvar o log em formato JSON
    ),
    // Destinos dos log: para onde vou mandar os logs capturados 
    transports: [
        // All errors ate logged into movies-service-error.log
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'movies-service-error.log'),
            level: 'error'
        }),
        // All informations or erros are logged into movies-service-info.log
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'movies-service-info.log')
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    // Em Ambiente de Deselvimento, joga as linhas de texto simples no console 
    logger.add(new winston.transports.Console({ format: winston.format.simple() }))
}

module.exports = logger;
