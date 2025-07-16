// **************************************************************************************************
// ******* CONFIGURAÇÃO DAS ROTAS DA API DO MICROSSERVIÇO 'CINEMA-CATALOG-SERVICE'            *******
// **************************************************************************************************
/// :)➔ FUNÇÃO DA API COM INVERSÃO DE DEPENDÊNCIA COM A APP: API RECEBE E PLUGA AS ROTAS NO APP EXPRESS
/// :)➔ FUNÇÃO DA API COM INVERSÃO DE DEPENDÊNCIA COM O REPOSITÓRIO: API RECEBE E PLUGA O REPOSITÓRIO 
/// Param1: app = Aplicação Express com as Rotas 
/// Param2: repository = repositório que será utilizado
/// Dev: ESTA API recebe a app e o repositório por INVESÃO DE DEPENDÊNCIA - DIP
/// Dev: ESTA API tem três rotas que chamam respectivamente as três funções(métodos) do repositório

// ***********************************
// ******* A T T R I B U T E S *******
// ***********************************
const { validateToken } = require('../middlewares/validationMIddleware'); // Injeta o middleware de validação

// ***********************************
// *******  API M E T H O D S  *******
// ***********************************
// 1.GET/cities 
// :)➔ METHOD TO LIST ALL CITIES WHERE THE CINEMA NETWORK HAS ANY CINEMA

// 2.GET/cities/:cityId/movies 
// :)➔ METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CITY

// 3.GET/cities/:cityId/movies/:movieId 
// :)➔ METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CITY

// 4.GET/cities/:cityId/cinemas 
// :)➔ METHOD TO LIST ALL CINEMAS BY CITY

// 5.GET/cinemas/:cinemaId/movies' 
// :)➔  METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CINEMA

// 6.GET/cinemas/:cinemaId/movies/:movieId
// :)➔ METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CINEMA


/// Notice: MÉTODO PARA EXPORTAR A FUNÇÃO API
module.exports = (app, repository) => {

    /// Notice: 3ND ROUTE TO RETURN THE LIST WITH ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CITY
    app.get('/cities/:cityId/movies/:movieId', validateToken, async (req, res, next) => {
        const movieSessions = await repository.getMovieSessionsByCityId(req.params.movieId, 
                                                                        req.params.cityId);             
        if(!movieSessions){
            return res.sendStatus(404);     // Not found               
        }
        res.json(movieSessions);            // Return a array with movie sessions         
    })

    /// Notice: 2ND ROUTE TO RETURN THE LIST WITH ALL MOVIES SHOWING AT A SPECIFIC CITY
    app.get('/cities/:cityId/movies', validateToken, async (req, res, next) => {
        const movies = await repository.getMoviesByCityId(req.params.cityId);              
        if(!movies){
            return res.sendStatus(404);     // Not found               
        }
        res.json(movies);                   // Return a array with movies  
    })

    /// Notice: 4ND ROUTE TO RETURN THE LIST WITH ALL CINEMAS BY CITY 
    app.get('/cities/:cityId/cinemas', validateToken, async (req, res, next) => {
        console.log('Passei por aqui: /cities/:cityId/cinemas'); 
        const cinemas = await repository.getCinemasByCityId(req.params.cityId);            
        if(!cinemas){
            return res.sendStatus(404);     // Not found               
        }
        res.json(cinemas);                   // Return a array with cinemas     
    })

    /// Notice: 1ST ROUTE TO RETURN THE LIST WITH ALL CITIES WHERE THE CINEMA NETWORK HAS ANY CINEMA  
    app.get('/cities', validateToken, async (req, res, next) => {
        const cities = await repository.getAllCities();
        if(!cities || !cities.length){
            return res.sendStatus(404); // Not found
        } 
        res.json(cities);               // Return a array with all cities
    })    

    /// Notice: 6ND ROUTE TO RETURN THE LIST WITH ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CINEMA      
    app.get('/cinemas/:cinemaId/movies/:movieId', validateToken, async (req, res, next) => {
        const movieSessions = await repository.getMovieSessionsByCinemaId(req.params.movieId, 
                                                                          req.params.cinemaId);           
        if(!movieSessions){
            return res.sendStatus(404);     // Not found               
        }
        res.json(movieSessions);            // Return a array with movie sessions          
    })      

    /// Notice: 5ND ROUTE TO RETURN THE LIST WITH ALL MOVIES SHOWING AT A SPECIFIC CINEMA    
    app.get('/cinemas/:cinemaId/movies', validateToken, async (req, res, next) => {
        const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);               
        if(!movies){
            return res.sendStatus(404);     // Not found               
        }
        res.json(movies);                   // Return a array with movies         
    })    

}
