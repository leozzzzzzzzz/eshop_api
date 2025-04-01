const { pool } = require('../config');
const Produto = require('../entities/produto');

const getProdutosDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM produtos ORDER BY nome');  
        return rows.map((produto) => new Produto(
            produto.codigo,
            produto.nome, 
            produto.descricao, 
            produto.quantidade_estoque, 
            produto.ativo, 
            produto.valor, 
            produto.data_cadastro, 
            produto.categoria
        ));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addProdutoDB = async (body) => {
    try {
        const { nome } = body
        const results = await pool.query(
            `INSERT INTO produtos (nome)
            VALUES ($1) RETURNING codigo, nome`,
            [nome]
        )
        const produto = results.rows[0]
        return new Produto(produto.codigo, produto.nome)
    } catch (err) {
        throw "Erro : " + err;
    }
}

const updateProdutoDB = async (body) => {
    try {
        const { codigo, nome } = body
        const results = await pool.query(
            `UPDATE produtos
                set nome = $1
                where codigo = $2
                returning codigo, nome`,
                [nome, codigo]
        )
        
        if (results.rowCount == 0)
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        
        const produto = results.rows[0]
        return new Produto(produto.codigo, produto.nome)
    } catch (err) {
        throw "Erro : " + err;
    }
}

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM produtos
            WHERE codigo = $1`,[codigo]
        )
         if (results.rowCount == 0)
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        else
            return "Categoria removida com sucesso"
    } catch (err) {
        throw "Erro : " + err;
    }
}

const getProdutoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `SELECT * from produtos
            WHERE codigo = $1`,[codigo]
        )
         if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
         } else {
            const produto = results.row[0]
            return new Produto(produto.codigo, produto.nome)
         }
    } catch (err) {
        throw "Erro : " + err;
    }
}


module.exports = {
    getProdutosDB, getProdutoPorCodigoDB, addProdutoDB, updateProdutoDB, deleteProdutoDB
}