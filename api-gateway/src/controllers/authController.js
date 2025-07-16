// *************************************************
// *******   USER AUTENTICATION CONTROL      *******
// *************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
const jwt = require('jsonwebtoken');
const repository = require('../repository/repository');
const loginSchema = require('../schemas/login');

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
// Method for handling login
async function doLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await repository.getUser(email, password);
        if (!user) {
            // Envie uma resposta de erro se o usuário não for encontrado
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            // ***********************************            
            // ******* USUÁRIO AUTENTICADO *******
            // ***********************************         
            //Generate a token with payload JWT Cryptography
            const token = jwt.sign({ userId: user._id, profileId: user.profileId }, 
                process.env.SECRET, 
                { algorithm: 'HS256', expiresIn: parseInt(process.env.EXPIRES) }
            );  
            res.json({token});        
        }       
    }
    catch(err) {
        console.log(err);        
        res.sendStatus(401);    // Unauthorized
    }
}

// Method to validate the blacklist to be used in all requests
async function validateBlacklist(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {    
        return next();
    } else {
        token = token.replace('Bearer ', '');   // Replace Bearer

        const isBacklisted = await repository.checkBlacklist(token);
        
        if(isBacklisted){
            // 401 Unauthorized: The request requires authentication. The client must authenticate to obtain the requested response.
            return res.sendStatus(401);     // Unauthorized
        } else {
            next();
        }
    }
}

// Method to validate de Login Schema
async function validateLoginSchema(req, res, next) {
    const { error } = loginSchema.validate(req.body);   
    if (error) {
        const { details } = error;      // Get error details 
        res.status(422).json(details.map(d => d.message));  // Invalid information in the request
    } else {
        next(); // No error: Go ahead!
    }
}

// Method to validate the token
async function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    //console.log('ValidateToken.token ANTES = ' + token);
    if (!token) {
        //console.log('Não achou o token');
        // 401 Unauthorized: The request requires authentication. The client must authenticate to obtain the requested response.
        return res.sendStatus(401);         
    }

    token = token.replace('Bearer ', '');   // Replace Bearer  

    try {  
        // Verify token
        const { userId, profileId } = jwt.verify(token, process.env.SECRET);        
        res.locals.userId = userId; // Save the userIn locally in the response
        res.locals.profileId = profileId; // Save the profileId locally in the response        
        next(); 
    }
    catch (err) {
        console.log(err);       
        res.sendStatus(401);         // 401 Unauthorized: The request requires authentication. The client must authenticate to obtain the requested response.
    }
}

// Method for handling logout
async function doLogout(req, res, next) {
    let token = req.headers['authorization']; // Get the token    
    token = token.replace('Bearer ', '');   // Replace Bearer  
    
    await repository.blacklistToken(token); // Insert token into the blacklist
    res.sendStatus(200); // Okay
}

module.exports = {
    doLogin,
    doLogout,
    validateToken, 
    validateBlacklist,
    validateLoginSchema
}
