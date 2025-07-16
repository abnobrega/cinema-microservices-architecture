// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DO REPOSITÓRIO DO MICROSSERVIÇO 'MOVIES-SERVICE'                  *******
// **************************************************************************************************

// MASSA DE TESTES COM TODOS OS FILMES
const movies = [
    {
        "_id": "66a2b3817b0c7da8b9cc8988",
        "titulo": "Os Vingadores: Guerra infinita",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando Thanos.",
        "duracao": 120,
        "dataLancamento": new Date("2018-05-01T00:00:00.000Z"),
        "imagem": "hppt//:luiztools.com.br/vingadores-gi.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "66a2b3817b0c7da8b9cc8989",
        "titulo": "Os Vingadores: Era de Ultron",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando Ultron.",
        "duracao": 110,
        "dataLancamento": new Date("2016-05-01T00:00:00.000Z"),
        "imagem": "hppt//:luiztools.com.br/vingadores-eu.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "66a2b3817b0c7da8b9cc898a",
        "titulo": "Os Vingadores",
        "sinopse": "Os heróis mais poderosos da Marvel enfrentando Loki.",
        "duracao": 100,
        "dataLancamento": new Date("2014-05-01T00:00:00.000Z"),
        "imagem": "hppt//:luiztools.com.br/vingadores.jpg",
        "categorias": [
            "Aventura",
            "Ação"
        ]
    },
    {
        "_id": "66a2b3817b0c7da8b9cc898b",
        "titulo": "Inception",
        "sinopse": "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos.",
        "duracao": 148,
        "dataLancamento": new Date("2024-07-16T00:00:00.000Z"),
        "imagem": "hppt.jpg",
        "categorias": [
            "Sci-Fi"
        ]
    },
    {
        "_id": "66a2b3817b0c7da8b9cc898c",
        "titulo": "The Shawshank Redemption",
        "sinopse": "Dois homens presos se unem ao longo de vários anos, encontrando consolo e redenção através de atos de decência comum.",
        "duracao": 142,
        "dataLancamento": new Date("1994-09-23T00:00:00.000Z"),
        "imagem": "shawshank.jpg",
        "categorias": [
            "Drama"
        ]
    },
    {
        "_id":"66a2b3817b0c7da8b9cc898d",
        "titulo": "The Godfather",
        "sinopse": "A história crônica da família do crime italiano-americana Corleone.",
        "duracao": 175,
        "dataLancamento": new Date("1972-03-24T00:00:00.000Z"),
        "imagem": "godfather.jpg",
        "categorias": [
            "Crime"
        ]
    }
];

// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DAS ROTAS DO MICROSSERVIÇO 'MOVIES-SERVICE'                       *******
// **************************************************************************************************
// :)➔ METHODS TO SIMULATE THE API ROUTES 

// MOCK: TESTS TO LIST ALL MOVIES
async function getAllMovies(){
    return movies;  // Retornar um array de movies
}

// MOCK: TESTS TO SEARCH A MOVIE BY ID
async function getMovieById(id) {
    if (id == '-1') {
        return null;
    }
    movies[0]._id = id;
    return movies[0];
}

// MOCK: TESTES PARA LISTAR TODOS OS FILMES EM LANÇAMENTO
async function getMoviePremieres(){
   movies[0].dataLancamento = new Date();
   return [movies[0]];
}

/* OBSERVAÇÃO:
   :)➔ movies[0]: Retorna diretamente o objeto do filme.
   :)➔ [movies[0]]: Retorna um array que contém o objeto do filme como seu único elemento.   
*/

// MOCK: TESTES PARA INCLUIR FILMES
async function addMovie(movie) {
    return movies[0];
}

async function deleteMovie(id) {
    if (!id) throw new Error('Não foi possível excluir este filme!');
    return true;
}

module.exports = {
    getAllMovies,
    getMovieById,
    getMoviePremieres,
    addMovie,
    deleteMovie
}