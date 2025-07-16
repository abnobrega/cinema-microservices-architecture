// *************************************************
// ******* VALIDATION MIDDLEWARE LAYER       *******
// *************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
const schema = require('../schemas/movieSchema');   // Inject the movieSchema
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const ADMIN_PROFILE = 1;

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
function validadeMovie(req, res, next){   
    const { error } = schema.validate(req.body);
    console.log(error);    
    if (error) {
        const { details } = error;      // Get error details 
        res.status(422).json(details.map(d => d.message));  // Invalid information in the request
    }

    next(); // No error: Go ahead!
}

// Method to validate the token
function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.sendStatus(401); // 401 Unauthorized: The request requires authentication.
    }

    token = token.replace('Bearer ', '');   // Replace Bearer  

    // Verify token
    try {
        const { userId, profileId } = jwt.verify(token, process.env.SECRET); 
        res.locals.userId = userId; // Save the userIn locally in the response
        res.locals.profileId = profileId; // Save the profileId locally in the response               
        next(); 
    }
    catch (err) {      
        console.log(err) ;
        res.sendStatus(401);    // 401 Unauthorized: The request requires authentication. 
    }
}

function validateAdmin(req, res, next) {

    const { profileId } = res.locals;
    if (profileId == ADMIN_PROFILE) {
        next(); 
    } else {
        const id = req.params.id;
        // RECORD AUDIT TRAIL: WHO, WHAT, WHEN
        logger.info(`User ${res.locals.userId} tried to pose as administrator and delete the movie ${id} at ${new Date()}`);
        
        res.sendStatus(403); // Acesso Proibido! Permissão negada! 
    }
}

module.exports = {
    validadeMovie,
    validateToken,
    validateAdmin
}