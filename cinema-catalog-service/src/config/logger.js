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
        new winston.transports.File({
            filename: path.join(__dirname, '..', 'logs', 'cinema-catalog-service-error.log'),
            level: 'error'
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    // Em Ambiente de Deselvimento, joga as linhas de texto simples no console 
    logger.add(new winston.transports.Console({ format: winston.format.simple() }))
}

module.exports = logger;
