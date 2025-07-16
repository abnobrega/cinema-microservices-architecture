// **************************************************************************************************
// ******* TESTES DOS MÉTODOS DO ARQUIVO REPOSITORY.JS                                        *******
// **************************************************************************************************
const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const repository = require('./repository');
const database = require('../config/database'); // Certifique-se de ajustar o caminho conforme necessário
const { Console } = require('winston/lib/winston/transports');

let testMovieId = null;

/// Notice: METHOD TO START TESTING
beforeAll(async () => {
    await database.connect(); // Conectar ao banco antes dos testes
    const movies = await repository.getAllMovies();
    if (movies.length > 0) {
        testMovieId = movies[0]._id;
    }
});

/// Notice: getAllMovies METHOD TEST: LIST ALL MOVIES SUCCESSFULY
test('getAllMovies', async () => {
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy(); // Test if it is a valid array
    expect(movies.length).toBeTruthy(); // Test if the array has elements
});

/// Notice: getMovieById METHOD TEST: SEARCH FOR A A MOVIE BY ID SUCCESSFULY
test('getMovieById', async () => {
    if (!testMovieId) {
        console.error("testMovieId não é válido.");
        return;
    }  
    const movie = await repository.getMovieById(testMovieId);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(testMovieId);
});

/// Notice: getMoviePremieres METHOD TEST: LIST ALL PREMIERE MOVIES
test('getMoviePremieres', async () => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const movies = await repository.getMoviePremieres();
    //console.log("Movies");
    //console.log(movies);    
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeTruthy();
    if (movies.length > 0) {
        expect(movies[0].dataLancamento.getTime()).toBeGreaterThanOrEqual(monthAgo.getTime());
    } else {
        console.warn('No premiere movies found.');
    }
});

/// Notice: addMovie METHOD TEST: INSERT A MOVIE SUCCESSFULY
test('addMovie', async () => {
    const movie = {
                titulo: 'NEW TEST: INSERT A MOVIE SUCCESSFULY', 
                sinopse: 'addMovie METHOD TEST: INSERT A NEW MOVIE SUCCESSFULY', 
                duracao: 120,
                dataLancamento: new Date(),
                imagem: 'image.jpg',
                categorias: ['Aventura', 'Ação']
            };
    
    let result;

    try {
        result = await repository.addMovie(movie);
        expect(result).toBeTruthy();        
    } finally {
        if (result) {
            await repository.deleteMovie(result._id);
        }
    }
});

/// Notice: deleteMovie METHOD TEST: DELETE A MOVIE SUCCESSFULY
test('deleteMovie', async () => {
    const movie = {
                titulo: 'NEW TEST: INSERT TO DELETE A MOVIE SUCCESSFULY', 
                sinopse: 'addMovie METHOD TEST: INSERT A NEW MOVIE TO DELETE AFTER', 
                duracao: 120,
                dataLancamento: new Date(),
                imagem: 'image.jpg',
                categorias: ['Aventura', 'Ação']
            };
    
   const result = await repository.addMovie(movie);

   console.log('MS.repository.test.result._id: ' + result._id);
   const result2 = await repository.deleteMovie(result._id);
   
   expect(result2).toBeTruthy();        
});

/// Notice: METHOD TO FINALIZE THE SERVER AND CONNECTION AFTER TESTING
afterAll(async () => {
    await database.disconnect(); // Método para encerrar a conexão
});
