const { Router } = require('express');

const { getAvaliacoes, addAvaliacao } = require('../controllers/avaliacaoController');

const { verificaJWT } = require('../controllers/segurancaController');

const rotasAvaliacoes = new Router();

rotasAvaliacoes.route('/avaliacao/produto/:codigoproduto')  
   .get(verificaJWT, getAvaliacoes)

rotasAvaliacoes.route('/avaliacao')   
   .post(verificaJWT, addAvaliacao)

module.exports = { rotasAvaliacoes };