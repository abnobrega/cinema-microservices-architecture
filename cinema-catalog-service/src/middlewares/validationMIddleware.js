// *************************************************
// ******* VALIDATION MIDDLEWARE LAYER       *******
// *************************************************

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
const jwt = require('jsonwebtoken');

// ***********************************
// *******  M E T H O D S      *******
// ***********************************
// Method to validate the token
function validateToken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.sendStatus(401); // 401 Unauthorized: The request requires authentication.
    }

    token = token.replace('Bearer ', '');   // Replace Bearer  

    try {
        // Verify token
        const { userId } = jwt.verify(token, process.env.SECRET); 
        res.locals.userId = userId; // Save the userIn object locally in the response
        next(); 
    }
    catch (err) {      
        console.log(err) ;
        res.sendStatus(401);    // 401 Unauthorized: The request requires authentication. 
    }
}

module.exports = {
    validateToken
}