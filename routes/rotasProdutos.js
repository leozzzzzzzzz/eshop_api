const { Router } = require('express');

const { getProdutos, addProduto, updateProduto, deleteProduto, getProdutoPorCodigo, updateProdutoDetalhes } = require('../controllers/produtoController');

const { verificaJWT } = require('../controllers/segurancaController')

const rotasProdutos = new Router();

rotasProdutos.route('/produto')
   .get(getProdutos)
   .post(verificaJWT, addProduto)
   .put(verificaJWT, updateProduto)
   
//rotasProdutos.route('/teste')
//   .put(verificaJWT, updateProdutoDetalhes)

rotasProdutos.route('/produto/:codigo')
   .get(verificaJWT, getProdutoPorCodigo)
   .delete(verificaJWT, deleteProduto)

module.exports = { rotasProdutos };