// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DO REPOSITÓRIO DO MICROSSERVIÇO 'CINEMA-CATALOG-SERVICE'          *******
// **************************************************************************************************
// MDL: •➔ REDE DE CINEMA -< CINEMA -< SALA DE EXIBIÇÃO -< SESSÃO -- FILME

const { ObjectId } = require("mongodb");

// MASSA DE TESTES SIMULANDO A BASE DE DADOS 'cinemaCatalog'
const cinemaCatalog = 
[{
    cidade: "Gravataí",
    uf: "RS",
    cinemas: []
}, {
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [{
        _id: new ObjectId("66b7d11b1040b6597ccc8988"),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [{
            nome: 1,
            sessoes: [{
                data: new Date("2024-08-01T09:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc8988"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }]
            }, {
                data: new Date("2024-08-01T11:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc8988"),
                filme: "Vingadores: Guerra Infinita",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2024-08-01T13:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc8989"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }, {
            nome: 2,
            sessoes: [{
                data: new Date("2024-08-01T09:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc8989"),
                filme: "Vingadores: Era de Ultron",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2024-08-01T11:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc898a"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2024-08-01T13:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc898a"),
                filme: "Vingadores: Ultimato",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }, {
        _id: new ObjectId('66b7d11b1040b6597ccc8989'),
        nome: "GNC Lindóia",
        salas: [{
            nome: 100,
            sessoes: [{
                data: new Date("2024-08-30T09:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc898a"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                },]
            }, {
                data: new Date("2024-08-30T11:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc898a"),
                filme: "Vingadores: Ultimato",
                valor: 25.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }, {
                data: new Date("2024-08-30T13:00:00Z"),
                idFilme: new ObjectId("66a2b3817b0c7da8b9cc8989"),
                filme: "Vingadores: Era de Ultron",
                valor: 20.00,
                assentos: [{
                    numero: 1,
                    disponivel: true
                }, {
                    numero: 2,
                    disponivel: false
                }, {
                    numero: 2,
                    disponivel: true
                },]
            }]
        }]
    }]
}];

// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DAS ROTAS DO MICROSSERVIÇO 'CINEMA-CATALOG-SERVICE'               *******
// **************************************************************************************************
// :)➔ METHODS TO SIMULATE THE API ROUTES 

// ******************************************
// *******   REPOSITORY MOCK METHODS  *******
// ******************************************
// :)➔ METHODS TO SIMULATE THE API ROUTES THAT LISTS ALL CITIES WHERE THE CINEMA NETWORK HAS ANY CINEMA
function getAllCities(){
    return cinemaCatalog.map(catalog => {
        return {
            _id: new ObjectId("66a2b3817b0c7da8b9cc8989"),
            pais: catalog.pais,
            uf: catalog.uf,
            cidade: catalog.cidade
        }        
    })                    
}

// :)➔ METHODS TO SIMULATE THE API ROUTE TO LIST ALL CINEMAS BY CITY
function getCinemasByCityId(cityId) {
    if(cityId < 0){
        return null;
    }
    return cinemaCatalog[cinemaCatalog.length-1].cinemas;   
}

// METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CINEMA
function getMoviesByCinemaId(cinemaId) {
    if(cinemaId < 0){ 
        return null;
    }    
    return getCinemasByCityId().map(cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme
        };
    })
}

// METHOD TO LIST ALL MOVIES SHOWING AT A SPECIFIC CITY
function getMoviesByCityId(cityId) {
    if(cityId < 0){
        return null;
    }
    return getMoviesByCinemaId(cityId); 
}

// METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CITY
function getMovieSessionsByCityId(movieId, cityId) {
    if(movieId < 0 || cityId < 0){
        return null;
    }    
    return getCinemasByCityId().map(cinema => {
        return {
            titulo: cinema.salas[0].sessoes[0].filme,
            _id: cinema.salas[0].sessoes[0].idFilme,
            cinema: cinema.nome,
            idCinema: cinema._id,
            sala: cinema.salas[0].nome,
            sessao: cinema.salas[0].sessoes[0]
        };
    })
}

// METHOD TO LIST ALL MOVIE SESSIONS OF A FILM SHOWING IN A SPECIFIC CINEMA
function getMovieSessionsByCinemaId(movieId, cinemaId){
    return getMovieSessionsByCityId(movieId, cinemaId);
}

module.exports = {
    getAllCities,
    getCinemasByCityId,
    getMoviesByCinemaId,
    getMoviesByCityId,
    getMovieSessionsByCityId,
    getMovieSessionsByCinemaId
}
