// **************************************************************************************************
// ******* CAMADA DE PERSISTÊNCIA DO BANCO DE DADOS DA APLICAÇÃO                              *******
// **************************************************************************************************

// ***********************************
// *******  A T R I B U T O S  *******
// ***********************************
const database = require('../config/database');     // Importar o database 
const bcrypt = require('bcryptjs');

// ***********************************
// *******  M É T O D O S      *******
// ***********************************

// ****************************
// ****** EFETUAR LOGIN *******
// ****************************
// GET USER
async function getUser(email, password){
    try{   
        //Get the connection to the database
        const dbConnection = await database.connect();
        const user = await dbConnection.collection("users").findOne({ email }); 

        // Verifica usuário existe
        if (!user) {
            throw new Error('Wrong user and/or password!');
        } else {
            // Compara se a senha informada é igual a senha criptografada(hash) gravada no BD
            const isValid = bcrypt.compareSync(password, user.password); 

            // Verifica se as senhas conferem 
            if (!isValid ) {
                throw new Error('Wrong user and/or password!');
            } else {
                return user; 
            }
        }
    }
    catch (error) {
        console.error("Failed to find user:", error);
        throw error;
    }                    
}

// ****************************
// ******EFETUAR LOGOUT *******
// ****************************
async function blacklistToken(token) {
    try {
        //Get the connection to the database
        const dbConnection = await database.connect();
        return dbConnection.collection("blacklist")
                           .insertOne({ _id: token, data: new Date() }); 
    }
    catch (error) {
        console.error("Failed to insert into blacklist:", error);
        throw error;
    }     
}

// ****************************
// ******VERIFY BACKLIST*******
// ****************************
async function checkBlacklist(token){
    try {
        //Get the connection to the database
        const dbConnection = await database.connect();
        const qtd = await dbConnection.collection("blacklist").countDocuments({ _id: token }); 
        return qtd > 0;
    }
    catch (error) {
        console.error("Failed to find into blacklist", error);
        throw error;
    } 
}


module.exports = {
    getUser,
    blacklistToken,
    checkBlacklist
}
