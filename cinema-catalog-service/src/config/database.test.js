
// **************************************************************************************************
// ******* TESTES DOS MÉTODOS DO ARQUIVO DATABASE.JS                                          *******
// **************************************************************************************************
const { test, expect } = require('@jest/globals');
const database = require('./database');     // Importar o módulo que vou testar

// TESTE DO MÉTODO CONNECT COM SUCESSO	
test('Connecting database', async() => {
    const connection = await database.connect();
    expect(connection).toBeTruthy();
})

// TESTE DO MÉTODO DISCONECT COM SUCESSO	
test('Disconnecting database', async() => {
    await database.connect(); // Certifique-se de que a conexão está ativa antes de desconectar    
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

// TESTE DO MÉTODO DISCONECT SEM SUCESSO: ENTRAR NA EXCESSÃO	
test('Disconnecting database 2x', async() => {
    await database.connect(); // Certifique-se de que a conexão está ativa antes de desconectar    
    await database.disconnect();    
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})
