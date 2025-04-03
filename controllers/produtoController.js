const { getProdutosDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, getProdutoPorCodigoDB, updateProdutoDetalhesDB } = require('../usecases/produtoUseCases')

const getProdutos = async (request, response) => {
    await getProdutosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as Produtos: ' + err
        }));
}

const addProduto = async (request, response) => {
    await addProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateProduto = async (request, response) => {
    await updateProdutoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateProdutoDetalhes = async (request, response) => {
    await updateProdutoDetalhesDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Produto alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteProduto = async (request, response) => {
    await deleteProdutoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));        
}

const getProdutoPorCodigo= async (request, response) => {
    await getProdutoPorCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));           
}

module.exports = {
   getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo, updateProdutoDetalhes
}