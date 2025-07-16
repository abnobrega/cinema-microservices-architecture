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


// TESTE DO MÉTODO CONNECT SEM SUCESSO: ENTRAR NA EXCESSÃO	
test('Connecting database 2x', async() => {
    await database.connect();
    const connection = await database.connect(); // tenta conectar novamente
    expect(connection).toBeTruthy();
})


// TESTE DO MÉTODO DISCONECT COM SUCESSO	
test('Disconnecting database', async() => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})

// TESTE DO MÉTODO DISCONECT SEM SUCESSO: ENTRAR NA EXCESSÃO	
test('Disconnecting database 2x', async() => {
    await database.disconnect();    
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})
