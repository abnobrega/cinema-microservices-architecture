// **************************************************************************************************
// ******* SIMULAÇÃO (MOCK) DO REPOSITÓRIO DO MICROSSERVIÇO 'CINEMA-CATALOG-SERVICE'          *******
// **************************************************************************************************
// MDL: •➔ REDE DE CINEMA -< CINEMA -< SALA DE EXIBIÇÃO -< SESSÃO -- FILME

const { ObjectId } = require("mongodb");

// MASSA PARA CARGA SIMULANDO A BASE DE DADOS 'cinemaCatalog'
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
        _id: ObjectId(),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [{
            nome: 1,
            sessoes: [{
                data: ISODate("2024-08-01T09:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc8988"),
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
                data: ISODate("2024-08-01T11:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc8988"),
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
                data: ISODate("2024-08-01T13:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc8989"),
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
                data: ISODate("2024-08-01T09:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc8989"),
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
                data: ISODate("2024-08-01T11:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc898a"),
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
                data: ISODate("2024-08-01T13:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc898a"),
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
        _id: new ObjectId(),
        nome: "GNC Lindóia",
        salas: [{
            nome: 100,
            sessoes: [{
                data: ISODate("2024-08-30T09:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc898a"),
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
                data: ISODate("2024-08-30T11:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc898a"),
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
                data: ISODate("2024-08-30T13:00:00Z"),
                idFilme: ObjectId("66a2b3817b0c7da8b9cc8989"),
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
