// **************************************************************************************************
// ******* TESTES DOS MÉTODOS DO ARQUIVO REPOSITORY DO 'CINEMA-CATALOG-SERVICE'                                     *******
// **************************************************************************************************
const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const repository = require('./repository');
const database = require('../config/database'); // Certifique-se de ajustar o caminho conforme necessário

let cityId = null;
let cinemaId = null;
let movieId = null;

/// Notice: METHOD TO START TESTING
beforeAll(async () => {
    await database.connect(); // Conectar ao banco antes dos testes

    const cities = await repository.getAllCities();
    //console.log('beforeAll => cities = '+ cities);
    cityId = cities[1]._id;
    
    const cinemas = await repository.getCinemasByCityId(cityId);
    //console.log('beforeAll => cinemas = '+ cinemas);    
    cinemaId = cinemas[0]._id;

    movieId = cinemas[0].salas[0].sessoes[0].idFilme;
    console.log('beforeAll => movieId = '+ movieId);      
});

/// Notice: getAllCities METHOD TEST: LIST ALL CITIES SUCCESSFULY
test('getAllCities', async () => {
    const cities = await repository.getAllCities();
    //console.log('test.getAllCities => cities = '+cities);
    expect(Array.isArray(cities)).toBeTruthy(); // Test if it is a valid array
    expect(cities.length).toBeTruthy();         // Test if the array has elements
});


/// Notice: getCinemasByCityID METHOD TEST: LIST ALL CINEMAS BY CITY SUCCESSFULY
test('getCinemasByCityId', async () => {
    //console.log('test.getCinemasByCityId => cityId = '+cityId);      
    const cinemas = await repository.getCinemasByCityId(cityId);
    //console.log('test.getCinemasByCityId => cinemas = '+cinemas);    
    expect(Array.isArray(cinemas)).toBeTruthy();  // Test if it is a valid array    
});


/// Notice: getMoviesByCinemaId METHOD TEST: SEARCH FOR MOVIES SHOWING AT A SPECIFIC CINEMA SUCCESSFULY
test('getMoviesByCinemaId', async () => {
    //console.log('test.getMoviesByCinemaId => cinemaId = '+cinemaId);  
    const movies = await repository.getMoviesByCinemaId(cinemaId);
    //console.log('test.getMoviesByCinemaId => movies = '+movies);  
    expect(Array.isArray(movies)).toBeTruthy(); // Test if it is not null (FOUND)
    expect(movies.length).toBeTruthy();         // Test if the array has elements 
}); 


/// Notice: getMoviesByCityId METHOD TEST: SEARCH FOR MOVIES SHOWING AT A SPECIFIC CITY SUCCESSFULY
test('getMoviesByCityId', async () => {
    //console.log('test.getMoviesByCityId => cityId = '+cityId);  
    const movies = await repository.getMoviesByCityId(cityId);
    //console.log('test.getMoviesByCityId => movies = '+movies);  
    expect(Array.isArray(movies)).toBeTruthy(); // Test if it is not null (FOUND)
    expect(movies.length).toBeTruthy();         // Test if the array has elements 
}); 


/// Notice: getMovieSessionsByCityId METHOD TEST: SEARCH FOR MOVIE SESSIONS SHOWING AT A SPECIFIC CITY SUCCESSFULY
test('getMovieSessionsByCityId', async () => {
    //console.log('test.getMovieSessionsByCityId => movieId = '+movieId);  
    //console.log('test.getMovieSessionsByCityId => cityId = '+cityId);      
    const movieSessions = await repository.getMovieSessionsByCityId(movieId, cityId);
    //console.log('test.getMovieSessionsByCityId => movieSessions = '+movieSessions);  
    expect(Array.isArray(movieSessions)).toBeTruthy(); // Test if it is not null (FOUND)
    expect(movieSessions.length).toBeTruthy();         // Test if the array has elements 
}); 

/// Notice: getMovieSessionsByCityId METHOD TEST: SEARCH FOR MOVIE SESSIONS SHOWING AT A SPECIFIC CITY SUCCESSFULY
test('getMovieSessionsByCinemaId', async () => {
    console.log('test.getMovieSessionsByCinemaId => movieId = '+movieId);  
    console.log('test.getMovieSessionsByCinemaId => cinemaId = '+cinemaId);      
    const movieSessions = await repository.getMovieSessionsByCinemaId(movieId, cinemaId);
    console.log('test.getMovieSessionsByCinemaId => movieSessions = '+movieSessions);  
    expect(Array.isArray(movieSessions)).toBeTruthy(); // Test if it is not null (FOUND)
    expect(movieSessions.length).toBeTruthy();         // Test if the array has elements 
}); 

/// Notice: METHOD TO FINALIZE THE SERVER AND CONNECTION AFTER TESTING
afterAll(async () => {
    await database.disconnect();
});
