// **************************************************************************************************
// ******* CONFIGURAÇÃO DA API MOVIES DO MICROSSERVIÇO                                        *******
// **************************************************************************************************

// ***********************************
// *******  A T R I B U T O S  *******
// ***********************************
const { validateToken, validadeMovie, validateAdmin } = require('../middlewares/validationMiddleware');
const logger = require('../config/logger');

// ***********************************
// *******  M É T O D O S      *******
// ***********************************
/// Notice: MÉTODO PARA EXPORTAR A FUNÇÃO API
/// :)➔ FUNÇÃO DA API COM INVERSÃO DE DEPENDÊNCIA COM A APP: API RECEBE E PLUGA AS ROTAS NO APP EXPRESS
/// :)➔ FUNÇÃO DA API COM INVERSÃO DE DEPENDÊNCIA COM O REPOSITÓRIO: API RECEBE E PLUGA O REPOSITÓRIO 
/// Param1: app = Aplicação Express com as Rotas 
/// Param2: repository = repositório que será utilizado
/// Dev: ESTA API recebe a app e o repositório por INVESÃO DE DEPENDÊNCIA - DIP
/// Dev: ESTA API tem três rotas que chamam respectivamente as três funções(métodos) do repositório
module.exports = (app, repository) => {

    /// Notice: 1ST ROUTE TO RETURN THE LIST WITH ALL MOVIES PREMIERES    
    app.get('/movies/premieres', validateToken, async (req, res, next) => {
        const movies = await repository.getMoviePremieres();
        if(!movies || !movies.length){
            return res.sendStatus(404); // Not found
        } 
        res.json(movies);   // Return a array with all movie premieres
    })

    /// Notice: 2ND ROUTE TO RETURN A MOVIE BY ID
    app.get('/movies/:id', validateToken, async (req, res, next) => {
        const movie = await repository.getMovieById(req.params.id);        
        //console.log("movies.req.params.id :"+req.params.id);
        //console.log("Movie :"+movie);        
        if(!movie){
            return res.sendStatus(404);  // Not found               
        }
        res.json(movie);  // Return a array with a movie
    })

    /// Notice: 3RD ROUTE TO RETURN THE LIST WITH ALL MOVIES
    app.get('/movies', validateToken, async (req, res, next) => {
        const movies = await repository.getAllMovies();
        if(!movies || !movies.length){        
            return res.sendStatus(404); // Not found
        }      
        res.json(movies);  // Return a array with all movies
    })

    // *************************************************

    /// Notice: 4TH ROUTE TO ADD MOVIES WITH VALIDATION BETWEEN THE PATH AND FUNCTION
    //  1st handle the security, and 2nd handle the information integrity (payload)
    /*  NO CORPO DA REQUISIÇÃO, TUDO VEM NO FORMATO STRING
        (1) Pegar as informações do corpo da requisição, onde tudo vem no formato string 
        (2) Passar para o repositóry, que vai persistir no banco de dados e 
        (3) responder a requisição com o status da transação para quem fez a chamada. 
    */ 
    app.post('/movies', validateToken, validateAdmin, validadeMovie, async (req, res, next) => {
        const titulo = req.body.titulo;
        const sinopse = req.body.sinopse;
        const duracao = parseInt(req.body.duracao);                 // converte para Inteiro
        const dataLancamento = new Date(req.body.dataLancamento);   // converte para Date
        const imagem = req.body.imagem;
        const categorias = req.body.categorias;

        const result = await repository.addMovie({
                                                titulo, 
                                                sinopse, 
                                                duracao, 
                                                dataLancamento, 
                                                imagem, 
                                                categorias 
                                            });

        // RECORD AUDIT TRAIL: WHO, WHAT, WHEN
        logger.info(`User ${res.locals.userId} added the movie ${result._id} at ${new Date()}`);
        res.status(201).json(result);
    }) 

    /// Notice: 5ND ROUTE TO DELETE A MOVIE
    app.delete('/movies/:id', validateToken, validateAdmin, async (req, res, next) => {
        const id = req.params.id;
        const result = await repository.deleteMovie(id);
        
        // RECORD AUDIT TRAIL: WHO, WHAT, WHEN
        logger.info(`User ${res.locals.userId} deleted the movie ${id} at ${new Date()}`);
        res.sendStatus(204);        // Tudo OK não tenho retorno!
    })

}
