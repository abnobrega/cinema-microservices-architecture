// **************************************************************************************************
// ******* TESTES DOS ROTEAMENTOS DA API MOVIES                                               *******
// **************************************************************************************************
const { test, expect, beforeAll, afterAll } = require('@jest/globals');  // Carregar classes de teste do jest
const server = require('../server/server');         // Carregar o servidor da app
const movies = require('./movies');                 // Carregar a API Movies
const requestSupertest = require('supertest');      // Carregar o supertest
const repositoryMock = require('../repository/__mocks__/repository');  // Carregar o Repositório Mockado

const adminToken = '1';
const guestToken = '2';

jest.mock('../node_modules/jsonwebtoken', () => {
    // Retornar um objeto tendo a função verify()
    return {
       verify: (token) => {
           if (token === adminToken) {
               return { userId: 1, profileId: 1 }; // ADMIN
           } else {
               if (token === guestToken) {
                   return { userId: 2, profileId: 2 }; // GUEST
               } else {
                   throw new Error('Invalid token Found!');
               }
           }
       }
   }
})

let app = null; 

/// Notice: METHOD TO START TESTING
beforeAll(async () => {
    process.env.PORT = 3003; 
    app = await server.startServer(movies, repositoryMock);  // Incializar o servidor
})

/// Notice: METHOD TO FINALIZE THE SERVER AND CONNECTION AFTER TESTING
afterAll(async () => {
    await server.stopServer(); // Encerra o servidor
})

// *************************************************

test('GET /movies 200 OK', async() => {
    const responseHttp = await requestSupertest(app).get('/movies').set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(Array.isArray(responseHttp.body)).toBeTruthy();
    expect(responseHttp.body.length).toBeTruthy();    
});

test('GET /movies 401 UNAUTHORIZATED (token error)', async() => {
    const responseHttp = await requestSupertest(app).get('/movies').set('authorization', `Bearer 3}`);
    expect(responseHttp.status).toEqual(401);   
});

test('GET /movies 401 UNAUTHORIZED', async () => {
    const responseHttp = await requestSupertest(app).get('/movies');
    expect(responseHttp.status).toEqual(401);
})

// *************************************************

test('GET /movies/:id 200 OK', async() => {
    const testMovieId = '1';
    const responseHttp = await requestSupertest(app).get(`/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`);                                
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /movies/:id 401', async() => {
    const testMovieId = '1';
    const responseHttp = await requestSupertest(app).get(`/movies/${testMovieId}`);                                
    expect(responseHttp.status).toEqual(401);  
});

test('GET /movies/:id 404 NOT FOUND', async () => {
    const testMovieId = '-1';   // Passing an ID that does not exist
    const responseHttp = await requestSupertest(app).get(`/movies/${testMovieId}`).set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
}); 

// *************************************************

test('GET /movies/premieres 200 OK', async() => {
    const responseHttp = await requestSupertest(app).get('/movies/premieres').set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(Array.isArray(responseHttp.body)).toBeTruthy();
    expect(responseHttp.body.length).toBeTruthy();  
});

test('GET /movies/premieres 401 OK', async() => {
    const responseHttp = await requestSupertest(app).get('/movies/premieres');
    expect(responseHttp.status).toEqual(401); 
});

// *************************************************

test('POST /movies/ 201 OK', async() => {
    const movie = { 
            titulo: 'API TEST: INSERT A MOVIE SUCCESSFULY', 
            sinopse: 'API POST MOVIE METHOD TEST: INSERT A MOVIE SUCCESSFULY', 
            duracao: 120,
            dataLancamento: new Date(),
            imagem: 'http://image.jpg',
            categorias: ['Aventura']
    };
    const responseHttp = await requestSupertest(app)
                                .post('/movies/')
                                .set('Content-Type', 'application/json')
                                .set('authorization', `Bearer ${adminToken}`)                                        
                                .send(movie);      
    console.log('responseHttp.body na linha abaixo:');                                 
    console.log(responseHttp.body); 

    expect(responseHttp.status).toEqual(201);       // INSERT OK
    expect(responseHttp.body).toBeTruthy();
});

test('POST /movies/ 401 UNAUTHORIZED', async() => {
    const movie = { 
        titulo: 'API TEST: UNAUTHORIZED', 
        sinopse: 'API addMovie METHOD TEST: INSERT A MOVIE UNAUTHORIZED', 
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'http://image.jpg',
        categorias: ['Aventura']
                };
    const responseHttp = await requestSupertest(app)
                                .post('/movies/')
                                .set('Content-Type', 'application/json')                                       
                                .send(movie);      
    expect(responseHttp.status).toEqual(401);
});

test('POST /movies/ 403 FORBIDDEN', async() => {
    const movie = { 
        titulo: 'API TEST: test MOVIEs', 
        sinopse: 'Teste summary', 
        duracao: 120,
        dataLancamento: new Date(),
        imagem: 'http://image.jpg',
        categorias: ['Aventura']
                };
    const responseHttp = await requestSupertest(app)
                                .post('/movies/')
                                .set('Content-Type', 'application/json')
                                .set('authorization', `Bearer ${guestToken}`)                                        
                                .send(movie);
    expect(responseHttp.status).toEqual(403); // FORBIDDEN
});

test('POST /movies/ 422 UNPROCESSABLE ENTITY', async() => {
    const movie = { xyz: 'Luiz' }; //PASSA UM PAYLOAD COM UM FILME QUASE VAZIO PARA SIMULA UM ERRO.

    const responseHttp = await requestSupertest(app)
                                .post('/movies/')
                                .set('Content-Type', 'application/json')
                                .set('authorization', `Bearer ${adminToken}`)                                       
                                .send(movie);
    expect(responseHttp.status).toEqual(422);   //  UNPROCESSABLE ENTITY
});    

// *************************************************

test('DELETE /movies/:id 204 NO CONTENT', async() => {
    const responseHttp = await requestSupertest(app).delete('/movies/1').set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(204);   // Ok
});

test('DELETE /movies/:id 401 NO CONTENT', async() => {
    const responseHttp = await requestSupertest(app).delete('/movies/1');
    expect(responseHttp.status).toEqual(401); // FORBIDDEN
});

/// Notice: TEST THE 2ND ROUTE TO RETURN A MOVIE BY ID SUCCESSFULLY
test('DELETE /movies/:id 403 FORBIDDEN', async() => {
    const responseHttp = await requestSupertest(app).delete('/movies/1').set('authorization', `Bearer ${guestToken}`);                                
    expect(responseHttp.status).toEqual(403);   // FORBIDDEN
});

