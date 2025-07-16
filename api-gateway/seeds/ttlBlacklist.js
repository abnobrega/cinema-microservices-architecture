// ******************************************
// ******* SCRIPT DE CRIAÇÃO DE ÍNDICE******* 
// ******************************************
// Notice: param1 = Objeto de Índice = Campo que terá o índice e se é: ASC(1) ou DESC(-1)
// Notice: param2 = Objeto de opções 
db.blacklist.createIndex({
    data: 1                         // O índice será no campo data e de forma CRESCENTE
},{
    expireAfterSeconds: 1800        // Expirac após 1800s = 30min
});