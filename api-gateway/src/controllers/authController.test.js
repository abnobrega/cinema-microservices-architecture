// **************************************************************************************************
// ******* TESTES DOS ROTEAMENTOS DA API-ATEWAY                                               *******
// **************************************************************************************************
/*
1.Teste de Login com Sucesso:
Verificado se o login retorna um status 200 e um token válido.

2.Teste de Login com Erro (Dados Inválidos):
Verificado se o login retorna um status 422 quando os dados são inválidos.

3.Teste de Login Não Autorizado:
Verificado se o login retorna um status 401 quando as credenciais são incorretas.

4.Teste de Logout com Sucesso:
Verificado se o logout retorna um status 200 quando um token válido é fornecido.

5.Teste de Logout Não Autorizado:
Verificado se o logout retorna um status 401 quando um token inválido é fornecido.

6.Teste de Logout Não Autorizado por Blacklist:
Verificado se o logout retorna um status 401 quando um token que está na blacklist é fornecido.
*/
const { test, expect, beforeAll, afterAll } = require('@jest/globals');  // Carregar classes de teste do jest
const app = require('../server/index');         // Carregar o servidor da app
const requestSupertest = require('supertest');      // Carregar o supertest
const repository = require('../repository/repository');
const { ObjectId } = require('mongodb');

const loginOk = {
    email: 'contato@alexandrenobrega.com.br',
    password: '1234567'
};

const loginNotOk = {
    email: 'contato@alexandrenobrega.com.br',
    password: '123456'
};

let token = '';
const tokenBlacklist = new ObjectId().toHexString();
    
/// Notice: METHOD TO START TESTING
beforeAll(async () => {
    jest.setTimeout(10000);  // Aumenta o timeout para 10 segundos
    process.env.PORT = 4001; // Define a Porta 4001
   
    // Faz um LOGIN COM SUCESSO
    const responseHttp = await requestSupertest(app)
            .post('/login/')
            .set('Content-Type', 'application/json')
            .send(loginOk);
    // Guarda o token
    token = responseHttp.body.token;       
    
    // Cadastrar um token na Blacklist
    await repository.blacklistToken(tokenBlacklist); 
});

/// Notice: METHOD TO FINALIZE THE SERVER AND CONNECTION AFTER TESTING
afterAll(async () => {
    if(app){
        app.close();
    }
})

/// Notice: TEST THE LOGIN
test('POST /login/ 200 OK', async() => {
    
    // Faz um LOGIN COM SUCESSO   
    const responseHttp = await requestSupertest(app)
            .post('/login/')
            .set('Content-Type', 'application/json')
            .send(loginOk);

    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body.token).toBeTruthy(); // Verifica se tem um token no corpo da requisição
});

/// Notice: TEST THE ROUTE TO ADD A LOGIN WITH AN ERROR: NOK
test('POST /login/ 422 UNPROCESSABLE ENTITY', async() => {
    loginOk.data = new Date();
    // Faz um LOGIN COM ERRO
    const responseHttp = await requestSupertest(app)
                                .post('/login/')
                                .set('Content-Type', 'application/json')
                                .send(loginOk);                                        
    expect(responseHttp.status).toEqual(422);   // UNPROCESSABLE ENTITY
});    

/// Notice: TEST THE LOGIN UNAUTHORIZED
test('POST /login/ 401 NotOK', async() => {
    // Faz um LOGIN COM ERRO
    const responseHttp = await requestSupertest(app)
                                .post('/login/')
                                .set('Content-Type', 'application/json')
                                .send(loginNotOk);

    expect(responseHttp.status).toEqual(401);   // UNAUTHORIZED
});

/// Notice: TEST THE LOGOUT
test('POST /logout/ 200 OK', async() => {
    // Faz um LOGOUT COM SUCESSO
    const responseHttp = await requestSupertest(app)
            .post('/logout/')
            .set('Content-Type', 'application/json')
            .set('authorization', `Bearer ${token}`);
    expect(responseHttp.status).toEqual(200);   // Ok
});

/// Notice: TEST THE lOGOUT UNAUTHORIZED
test('POST /logout 401 Not OK', async() => {
    // Faz um LOGOUT SEM SUCESSO
    const responseHttp = await requestSupertest(app)
            .post('/logout/')
            .set('Content-Type', 'application/json')
            .set('authorization', `Bearer ${token}1`); 
    expect(responseHttp.status).toEqual(401);   // UNAUTHORIZED
});

/// Notice: TEST THE lOGOUT UNAUTHORIZED by Blacklist
test('POST /logout 401 Not OK (Blacklist)', async() => {
    // Faz um LOGOUT SEM SUCESSO
    const responseHttp = await requestSupertest(app)
            .post('/logout/')
            .set('Content-Type', 'application/json')
            .set('authorization', `Bearer ${tokenBlacklist}`); 
    expect(responseHttp.status).toEqual(401);   // UNAUTHORIZED
});    
