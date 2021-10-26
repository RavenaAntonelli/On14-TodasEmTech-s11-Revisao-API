const { response } = require("express");
const models = require("../models/estabelecimentos.json");

const getAll =(require, response) =>{
    //ao invés de criar 3 const separadas junto tudo em uma só
    const {pagamento, bairro, delivery} = require.query //vai entender que cada obj desses é uma const
   //usando let pq pode ser mudada, const não pode mudar
    let filtrados = models 
    //filtro por pagamento, sendo que ele está dentro de um array(lista) mas vc no caso quer só algumas
    //diferença do filter pro find, o find acha o primeiro e o filtrer retorna o array

    if (pagamento){
        filtrados =filtrados.filter(estabelecimento =>{
            return estabelecimento.pagamento.includes(pagamento)
            //includes determina se um array contem um elemento e retorna true ou false
        })
    }
    //filtro por bairro

    if (bairro){
        filtrados =filtrados.filter(estabelecimento =>{
            return estabelecimento.bairro == bairro
        })
    }
    //ternarios
    //filtro por delivery
    if(delicery){
        filtrados = filtrados.filter(estabelecimento =>{
            return estabelecimento.delivery == (delivery == "true" ? true:false)
        })
    }
    response.status(200).send(filtrados)
}

const getId = (require, response) => {
     const idSolicitado = require.params.id

     const found = models.find(estabelecimento => estabelecimento.id == idSolicitado)
     
     if(found == undefined){
         response.status(404).send({message: "Estabelecimeto não encontrado"})
     }
     response.status(200).send(found)
}
const createEst =(request, response)=>{
    let body = request.body

    let novoEstabelecimento = {
        id:(estabelecimento.length)+1,
        nome: body.nome,
        Plot:body.Plot
    }

    estabelecimento.push(novoEstabelecimento)

    response.status(201).json(
        [
            {
                "mensagem":"Estabelecimento cadastrado com sucesso.",
                novoEstabelecimento
            }
        ]
    )
}


module.exports = {
    getAll,
    getId,
    createEst
}