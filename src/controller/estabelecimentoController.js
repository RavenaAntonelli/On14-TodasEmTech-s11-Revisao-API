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
    if(delivery){
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
const cadastrar =(request, response)=>{
    let body = request.body

    let novoEstabelecimento = {
        id:(models.length)+1,
        likes: body.likes,//vai receber a informação que usa em body e usar em like
        nome: body.nome,
        Plot:body.Plot,
        categoria: body.categoria,
        numero: body.numero,
        bairro: body.bairro,
        cidade:body.cidade,
        telefone:body.telefone,
        pagamento:body.pagamento,
        delivery:body.delivery
    }

    models.push(novoEstabelecimento)

    response.status(201).json(
        [
            {
                "mensagem":"Estabelecimento cadastrado com sucesso.",
                novoEstabelecimento
            },
        ]
    )
}


const like = (require, response) =>{
    const id = require.params.id// mesma coisa que se estivesse escrevendo com .id no final, neste caso coloca na frente para ficar mais curto

    const found = models.find(estabelecimento => estabelecimento.id == id)
    if(found == undefined){
        response.status(404).send({message: "Estabelecimento não encontrado"})
    }
    found.likes += 1
    response.status(200).send(found)
}
const deslike = (require, response) =>{
    const id = require.params.id// mesma coisa que se estivesse escrevendo com .id no final, neste caso coloca na frente para ficar mais curto

    const found = models.find(estabelecimento => estabelecimento.id == id)
    if(found == undefined){
        response.status(404).send({message: "Estabelecimento não encontrado"})
    }
    found.deslikes += 1
    response.status(200).send(found)
}

module.exports = {
    getAll,
    getId,
    cadastrar,
    like,
    deslike
}