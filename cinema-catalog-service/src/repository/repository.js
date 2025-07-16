// **************************************************************************************************
// ******* CAMADA DE PERSISTÊNCIA DO BANCO DE DADOS DA APLICAÇÃO 'CINEMA-CATALOG-SERVICE'                              *******
// **************************************************************************************************

// ***********************************
// *******  A T R I B U T O S  *******
// ***********************************
const database = require('../config/database');     // Importar o database 
const { ObjectId } = require('mongodb');            // Importar a classe 'ObjectId' do pacote 'mongodb'

// ***********************************
// *******  M É T O D O S      *******
// ***********************************
// Seja o MDL: •➔ REDE DE CINEMA -< CINEMA -< SALA DE EXIBIÇÃO -< SESSÃO -- FILME

// ****************************
// *******     READ     *******
// ****************************
// METHOD TO LIST ALL CITIES WHERE THE CINEMA NETWORK HAS ANY CINEMA
async function getAllCities(){
    const dbConnection = await database.connect();  //Get the connection to the database
    return dbConnection.collection("cinemaCatalog") // Return a array of cities
                       .find({})
                       .project({ cidade:1, uf:1, pais:1 })
                       .toArray();                    
}

// METHOD TO LIST ALL CINEMAS BY CITY
async function getCinemasByCityId(cityId) {
    const objCityId = new ObjectId(cityId);         //Convert string to ObjectId  
    //const objCityId = ObjectId.createFromHexString(cityId);
    const dbConnection = await database.connect();  // Get the connection to the database
    const city = await dbConnection.collection('cinemaCatalog')
                                   .findOne({ _id: objCityId }, { projection: { cinemas: 1 } });
    return city.cinemas;                                   
    //return city?.cinemas || [];    
}

// METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CINEMA
async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);         // Convert string to ObjectId   
    //const objCinemaId = ObjectId.createFromHexString(cinemaId);
    const dbConnection = await database.connect();      // Get the connection to the database
    // Get a array of movies showing at a sppecific cinema
    const group = await dbConnection.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objCinemaId } }, // Filto da agregação
        { $unwind: "$cinemas" },                    // Operação para descer ao nível 'cinema': drill down level 1
        { $unwind: "$cinemas.salas" },              // Operação para descer ao nível 'salas': drill down level 2
        { $unwind: "$cinemas.salas.sessoes" },      // Operação para descer ao nível 'sessoes': drill down level 3
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
        // 'Group by para pegar apenas as informações de idFilme e o filme, retirando as repetições.     
    ]).toArray();            
    //console.log("getMoviesByCinemaId: "+group);                      
    return group.map(g => g._id);                   // Return an array of items containing: titulo and id
}

// METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CITY
async function getMoviesByCityId(cityId) {
    const objCityId = new ObjectId(cityId);         // Convert string to ObjectId   

    const dbConnection = await database.connect();  // Get the connection to the database
    // Get a array of movies showing at a sppecific city
    const group = await dbConnection.collection('cinemaCatalog').aggregate([
        { $match: { "_id": objCityId } }, 
        { $unwind: "$cinemas" },           
        { $unwind: "$cinemas.salas" },     
        { $unwind: "$cinemas.salas.sessoes" }, 
        { $group: { _id: { titulo: "$cinemas.salas.sessoes.filme", _id: "$cinemas.salas.sessoes.idFilme" } } }
    ]).toArray();   
    //console.log("getMoviesByCinemaId: "+group);                      
    return group.map(g => g._id);                   // Return an array of items containing: titulo and id    
}

// METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CITY
async function getMovieSessionsByCityId(movieId, cityId) {
    //Converter string para um ObjectId
    /*
    const movieIdAux = ObjectId.createFromHexString(movieId);
    const movieId = new ObjectId(movieIdAux);     
    const cityIdAux = ObjectId.createFromHexString(cityId);
    const objCityId = new ObjectId(cityIdAux);    
    */
    //const objCityId = ObjectId.createFromHexString(cityId);
    //const objMovieId = ObjectId.createFromHexString(movieId);

    const objMovieId = new ObjectId(movieId); 
    const objCityId = new ObjectId(cityId); 

    const db = await database.connect();
    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },
        { $unwind: "$cinemas.salas.sessoes" },
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },
        {
            $group: {
                _id: {
                    titulo: "$cinemas.salas.sessoes.filme",
                    _id: "$cinemas.salas.sessoes.idFilme",
                    cinema: "$cinemas.nome",
                    idCinema: "$cinemas._id",
                    sala: "$cinemas.salas.nome",
                    sessao: "$cinemas.salas.sessoes"
                }
            }
        }
    ]).toArray();
    //console.log(group);
    return group.map(g => g._id);                   // Return an array of items containing: titulo and id         
}

// METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CINEMA
async function getMovieSessionsByCinemaId(movieId, cinemaId){
    //Converter string para um ObjectId
    const objCinemaId = new ObjectId(cinemaId);     
    const objMovieId = new ObjectId(movieId); 

    const db = await database.connect();
    const group = await db.collection('cinemaCatalog').aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.salas" },                              //Para cada cinema detalha as salas
        { $unwind: "$cinemas.salas.sessoes" },                      //Para cada sala detalha as sessões
        { $match: { "cinemas.salas.sessoes.idFilme": objMovieId } },//Para cada sessão detalha os filmes
        {
            $group: {
                _id: {
                    titulo: "$cinemas.salas.sessoes.filme",
                    _id: "$cinemas.salas.sessoes.idFilme",
                    cinema: "$cinemas.nome",
                    idCinema: "$cinemas._id",
                    sala: "$cinemas.salas.nome",
                    sessao: "$cinemas.salas.sessoes"
                }
            }
        }
    ]).toArray();
    //console.log(group);
    return group.map(g => g._id);                   // Return an array of items containing: titulo and id          
}


module.exports = {
    getAllCities,
    getCinemasByCityId,
    getMoviesByCinemaId,
    getMoviesByCityId,
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
}