const { Router } = require('express');

const { rotasCategorias } = require('./rotasCategorias');
const { rotasProdutos } = require('./rotasProdutos');
const { rotasAvaliacoes } = require('./rotasAvaliacoes');
const { login } = require('../controllers/segurancaController');
const rotas = new Router();

rotas.use(rotasCategorias);
rotas.use(rotasProdutos)
rotas.use(rotasAvaliacoes)
rotas.route("/login")
   .post(login)       

module.exports = rotas;