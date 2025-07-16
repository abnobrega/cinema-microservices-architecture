// **************************************************************************************************
// ******* CONFIGURAÇÃO DE ACESSO AO BANCO DE DADOS DA APLICAÇÃO                              *******
// **************************************************************************************************
const { MongoClient } = require("mongodb"); // Importa a classe MongoClient 
require('dotenv').config();                 // Carrega variáveis de ambiente de um arquivo .env
let mongoClient = null;                     // O objeto Client é Singleton

// CONECTAR NA BASE DE DADOS
async function connect() {
    const mongoURL = process.env.MONGODB_CONNECTION;
    const dbName = process.env.DATABASE_NAME;

    // Padrão Singleton para verificar se o BD já está conectado 
    if (!mongoClient) {
        mongoClient = new MongoClient(mongoURL); // Cria a instância do objeto de conexão com o driver do MongoDB        
    }    

    // Verifica se já está conectado através do cliente ativo                
    await mongoClient.connect();
    return mongoClient.db(dbName);      // Retornar o banco de dados ao qual estou me conectando
}

// DESCONECTAR DA BASE DE DADOS
async function disconnect() {
    // Verifica se o BD já está conectado
    if (!mongoClient || !mongoClient.isConnected) {        
        return true;
    }

    await mongoClient.close();     // Desconectar do banco de dados
    mongoClient = null;
    return true;
}

module.exports = {
    // Objetos de acesso ao BANCO DE DADOS        
    connect,
    disconnect
};
