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
        // Cria a instância do objeto de conexão com o driver do MongoDB
        mongoClient = new MongoClient(mongoURL);
    }

    try {
        // Verifica se já está conectado através do cliente ativo        
        if (!mongoClient.topology || !mongoClient.topology.isConnected()) {
            await mongoClient.connect();    // Conectar com banco de dados MongoDB
        }
        return mongoClient.db(dbName);      // Retornar o banco de dados ao qual estou me conectando
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        mongoClient = null;
        throw error;    // Relança o erro após registrá-lo
    }
}

// DESCONECTAR DA BASE DE DADOS
async function disconnect() {
    // Verifica se o BD já está conectado
    if (!mongoClient || !mongoClient.isConnected) {        
        return true;
    }

    try {
        await mongoClient.close();     // Desconectar do banco de dados
        mongoClient = null;
        return true;
    } catch (error) {
        console.error("Failed to disconnect from the database:", error);
        mongoClient = null;
        throw error; // Relança o erro após registrá-lo
    }
}

module.exports = {
    // Objetos de acesso ao BANCO DE DADOS        
    connect,
    disconnect
};
