const { pool } = require('../config');
const Categoria = require('../entities/categoria')

const getCategoriasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM categorias ORDER BY nome');  
        return rows.map((categoria) => new Categoria(categoria.codigo, categoria.nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addCategoriaDB = async (body) => {
    try {
        const { nome } = body
        const results = await pool.query(
            `INSERT INTO categorias (nome)
            VALUES ($1) RETURNING codigo, nome`,
            [nome]
        )
        const categoria = results.rows[0]
        return new Categoria(categoria.codigo, categoria.nome)
    } catch (err) {
        throw "Erro : " + err;
    }
}

const updateCategoriaDB = async (body) => {
    try {
        const { codigo, nome } = body
        const results = await pool.query(
            `UPDATE categorias
                set nome = $1
                where codigo = $2
                returning codigo, nome`,
                [nome, codigo]
        )
        
        if (results.rowCount == 0)
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        
        const categoria = results.rows[0]
        return new Categoria(categoria.codigo, categoria.nome)
    } catch (err) {
        throw "Erro : " + err;
    }
}

const deleteCategoriaDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM categorias
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

const getCategoriaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `SELECT * from categorias
            WHERE codigo = $1`,[codigo]
        )
         if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo}`
         } else {
            const categoria = results.row[0]
            return new Categoria(categoria.codigo, categoria.nome)
         }
    } catch (err) {
        throw "Erro : " + err;
    }
}


module.exports = {
    getCategoriasDB, getCategoriaPorCodigoDB, addCategoriaDB, updateCategoriaDB, deleteCategoriaDB
}