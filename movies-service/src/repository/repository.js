// **************************************************************************************************
// ******* CAMADA DE PERSISTÊNCIA DO BANCO DE DADOS DA APLICAÇÃO                              *******
// **************************************************************************************************

// ***********************************
// *******  A T R I B U T O S  *******
// ***********************************
const database = require('../config/database');     // Importar o database 
const { ObjectId } = require('mongodb');            // Importar a classe 'ObjectId' do pacote 'mongodb'

// ***********************************
// *******  M É T O D O S      *******
// ***********************************

// ****************************
// *** CONSULTAR FILME      ***
// ****************************
// LIST ALL MOVIES
async function getAllMovies(){
    try{   
        //Get the connection to the database
        const dbConnection = await database.connect();
        return dbConnection
                    .collection("movies")
                    .find()
                    .toArray();  
    }
    catch (error) {
        console.error("Failed to find movies:", error);
        throw error;
    }                    
}

// SEARCH FOR A MOVIE BY ID
async function getMovieById(id) {   
    // Check if the ID is valid before converting
    if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
    }    
    
    // Convert string to ObjectId directly
    const objectId = new ObjectId(id);   
            
    // Get the connection to the database
    const dbConnection = await database.connect();  
    return dbConnection
                .collection("movies")
                .findOne({ _id: objectId });                      
}               

// LIST ALL PREMIERES 
async function getMoviePremieres(){
    try{   
        // RN001: A film in release lasts up to 1 month after the current date
        let monthAgo = new Date();  // Get the current date
        monthAgo.setMonth(monthAgo.getMonth() - 1);  // Subtract 1 month from the current date
        //console.log('monthAgo'+ monthAgo);
        // Get the connection to the database
        const dbConnection = await database.connect();
        return dbConnection
                    .collection("movies")
                    .find({ dataLancamento: { $gte: monthAgo } })
                    .toArray();  
    }
    catch (error) {
        console.error("Failed to find premieres:", error);
        throw error;
    }      
}

// ****************************
// *** INCLUIR FILME        ***
// ****************************
async function addMovie(movie) {
    // Get the connection to the database
    const dbConnection = await database.connect();
    // Insert a movie into the database
    const result = await dbConnection.collection('movies').insertOne(movie);
    movie._id = result.insertedId;
    return movie;
}

// ****************************
// *** EXCLUIR FILME        ***
// ****************************
async function deleteMovie(id) {
    //console.log('MS.repository.deleteMovie(id) = ' + id);
    
    // Get the connection to the database
    const dbConnection = await database.connect();

    if (ObjectId.isValid(id)) {
        // Convert the string `id` to ObjectId and delete
        return dbConnection.collection('movies').deleteOne({ _id: new ObjectId(id) });
        //return dbConnection.collection('movies').deleteOne({ _id: ObjectId.createFromHexString(id) });        
    } else {
        throw new Error('Invalid ObjectId');
    }
}

module.exports = {
    getAllMovies,
    getMovieById,
    getMoviePremieres,
    addMovie,
    deleteMovie
}

/*
async function deleteMovie(id){
    try{
        // Verifica se o id é válido antes de converter
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        //Converter string para um ObjectId        
        const idAux = ObjectId.createFromHexString(id);
        const objectId = new ObjectId(idAux);   
        //const objectId = new ObjectId(id);

        // Obter a conexão com a base de dados
        const dbConnection = await database.connect();                   
        return dbConnection
                    .collection("movies")
                    .deleteOne({_id: objectId});
    }
    catch (error) {
        console.error("Failed to delete movie:", error);
        throw error;
    }
}

// ****************************
// *** INCLUIR FILME        ***
// ****************************
async function insertMovie(movie){
    try{
        // Obter a conexão com a base de dados        
        const dbConnection = await database.connect();         
        return dbConnection
                    .collection("movies")
                    .insertOne(movie);
    }
    catch (error) {
        console.error("Failed to insert a movie:", error);
        throw error;
    }
}

// ****************************
// *** ATUALIZAR FILME      ***
// ****************************
async function updateMovie(id, movie){
    try{
        // Verifica se o id é válido antes de converter
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
        }

        //Converter string para um ObjectId
        const idAux = ObjectId.createFromHexString(id);
        const objectId = new ObjectId(idAux);
        //const objectId = new ObjectId(id);

        // Obter a conexão com a base de dados
        const dbConnection = await database.connect();         
        return dbConnection
                    .collection("movies")
                    .updateOne({ _id: objectId }, { $set: movie });
    }
    catch (error) {
        console.error("Failed to update a movie:", error);
        throw error;
    }
}
    */
