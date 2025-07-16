// **************************************************************************************************
// ******* TESTES DOS MÉTODOS DO ARQUIVO SERVER.JS                                            *******
// **************************************************************************************************
const { test, expect, describe, beforeEach, afterEach } = require('@jest/globals');
const server = require('./server');
const requestSupertest = require('supertest'); 

//MOCKING: SIMULATION API TO PERFORM TESTS
const apiMock = jest.fn((app, repository) => {
    app.get('/error', (req, res, next) => {
        throw new Error('Mock Error');  // Throw an error
    });
});

describe('Server Tests', () => {
    beforeEach(() => {
        process.env.PORT = 4000;
    });

    afterEach(async () => {
        await server.stopServer();  // Stop the server after each test
    });

    // TESTING THE startServer() METHOD    
    test('Server Start', async () => {
        const app = await server.startServer(apiMock);
        expect(app).toBeTruthy();
    });

    // METHOD TESTING: • 3rd and 5th MIDDLEWARE LAYERS
    test('Health Check', async () => {
        process.env.PORT = 4001;
        const app = await server.startServer(apiMock);
        const responseHttp = await requestSupertest(app).get('/health');
        expect(responseHttp.status).toEqual(200);   // OK
    });

    // TESTING ERROR HANDLING
    test('Error Check', async () => {
        process.env.PORT = 4002;        
        const app = await server.startServer(apiMock);
        const responseHttp = await requestSupertest(app).get('/error');
        expect(responseHttp.status).toEqual(500);   //  Internal Server Rrror
    });
    
    // TESTING THE stopServer() METHOD
    test('Server Stop', async () => {
        const isStopped = await server.stopServer();
        expect(isStopped).toBeTruthy();
    });
});
