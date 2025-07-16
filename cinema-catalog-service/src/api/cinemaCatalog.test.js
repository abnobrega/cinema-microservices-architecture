// **************************************************************************************************
// ******* TESTES DOS ROTEAMENTOS DA API 'CINEMA-CATALOG-SERVICE'                                               *******
// **************************************************************************************************
const { test, expect, beforeAll, afterAll } = require('@jest/globals');  // Carregar classes de teste do jest
const server = require('../server/server');         // Carregar o servidor da app
const cinemaCatalog = require('./cinemaCatalog');   // Carregar a API CinemaCatalog
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
    process.env.PORT = 3004; 
    app = await server.startServer(cinemaCatalog, repositoryMock);  // Incializar um servidor
})

/// Notice: METHOD TO FINALIZE THE SERVER AND CONNECTION AFTER TESTING
afterAll(async () => {
    await server.stopServer();
})

// *************************************************

// :)➔ METHOD TO LIST ALL CITIES WHERE THE CINEMA NETWORK HAS ANY CINEMA
test('GET /cities 200 OK', async() => {
    const responseHttp = await requestSupertest(app).get('/cities')
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(Array.isArray(responseHttp.body)).toBeTruthy();
    expect(responseHttp.body.length).toBeTruthy();    
});

test('GET /cities 401', async() => {
    const responseHttp = await requestSupertest(app).get('/cities');
    expect(responseHttp.status).toEqual(401);      
});

test('GET /cities 401 UNAUTHORIZED (token error)', async () => {
    const responseHttp = await requestSupertest(app).get('/cities').set('authorization', `Bearer 3`);
    expect(responseHttp.status).toEqual(401);
})

// *************************************************
// :)➔ METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CITY
test('GET /cities/:cityId/movies 200 OK', async() => {
    const testCityId = '1';
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /cities/:cityId/movies 401', async() => {
    const testCityId = '1';
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies`);
    expect(responseHttp.status).toEqual(401); 
});

test('GET /cities/:cityId/movies 404 NOT FOUND', async() => {
    const testCityId = '-1';   // Passing an ID that does not exist
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
}); 

// *************************************************
// :)➔ METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CITY
test('GET /cities/:cityId/movies/:movieId 200 OK', async() => {
    const testCityId = '1';
    const testMovieId = '1';        
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies/${testMovieId}`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /cities/:cityId/movies/:movieId 401', async() => {
    const testCityId = '1';
    const testMovieId = '1';        
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies/${testMovieId}`);
    expect(responseHttp.status).toEqual(401);
});

test('GET /cities/:cityId/movies/:movieId 404 NOT FOUND', async() => {
    const testCityId = '1';    
    const testMovieId = '-1';  // Passing an ID that does not exist        
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/movies/${testMovieId}`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
});     

// *************************************************  
// :)➔ METHOD TO LIST ALL CINEMAS BY CITY    
test('GET /cities/:cityId/cinemas 200 OK', async() => {
    const testCityId = '1';
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/cinemas`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /cities/:cityId/cinemas 401', async() => {
    const testCityId = '1';
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/cinemas`);
    expect(responseHttp.status).toEqual(401);
});

test('GET /cities/:cityId/cinemas 404 NOT FOUND', async() => {
    const testCityId = '-1';   // Passing an ID that does not exist
    const responseHttp = await requestSupertest(app).get(`/cities/${testCityId}/cinemas`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
});  

// *************************************************  
// :)➔  METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CINEMA
test('GET /cinemas/:cinemaId/movies 200 OK', async() => {
    const testCinemaId = '1';
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /cinemas/:cinemaId/movies 401', async() => {
    const testCinemaId = '1';
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies`);
    expect(responseHttp.status).toEqual(401);   
});

test('GET /cinemas/:cinemaId/movies 404 NOT FOUND', async() => {
    const testCinemaId = '-1';   // Passing an ID that does not exist
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
});   

// *************************************************  
// :)➔ METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CINEMA    
test('GET /cinemas/:cinemaId/movies/:movieId 200 OK', async() => {
    const testCinemaId = '1';
    const testMovieId = '1';        
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(200);   // Ok
    expect(responseHttp.body).toBeTruthy();
});

test('GET /cinemas/:cinemaId/movies/:movieId 401', async() => {
    const testCinemaId = '1';
    const testMovieId = '1';        
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies/${testMovieId}`);
    expect(responseHttp.status).toEqual(401);  
});

test('GET /cinemas/:cinemaId/movies/:movieId 404 NOT FOUND', async() => {
    const testCinemaId = '1';   
    const testMovieId = '-1';   // Passing an ID that does not exist      
    const responseHttp = await requestSupertest(app).get(`/cinemas/${testCinemaId}/movies/${testMovieId}`)
                                                    .set('authorization', `Bearer ${adminToken}`);
    expect(responseHttp.status).toEqual(404);
});       

