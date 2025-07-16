// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DO REPOSITÓRIO DO MICROSSERVIÇO 'MOVIES-SERVICE'                  *******
// **************************************************************************************************

// MASSA PARA CARGA COM TODOS OS FILMES
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