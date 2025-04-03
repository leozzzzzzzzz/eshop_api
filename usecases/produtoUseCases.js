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
        const { nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria } = body;
        const results = await pool.query(
            `INSERT INTO produtos (nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING 
                codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria`,
            [nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria]
        );
        const produto = results.rows[0];
        return new Produto(
            produto.codigo, 
            produto.nome, 
            produto.descricao, 
            produto.quantidade_estoque, 
            produto.ativo, produto.valor, 
            produto.data_cadastro, 
            produto.categoria
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};


const updateProdutoDB = async (body) => { //atualiza so o nome
    try {
        const { codigo, nome } = body;

        if (!codigo) {
            throw "Código do produto é obrigatório para a atualização.";
        }

        const results = await pool.query(
            `UPDATE produtos
                SET nome = $1
                WHERE codigo = $2
                RETURNING codigo, nome`,
            [nome, codigo]
        );

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const produto = results.rows[0];
        return new Produto(produto.codigo, produto.nome);
    } catch (err) {
        throw "Erro : " + err;
    }
};


const updateProdutoDetalhesDB = async (body) => {
    try {
        const { codigo, ...fieldsToUpdate } = body;

        if (!codigo) {
            throw "O código do produto é obrigatório para a atualização.";
        }

        const keys = Object.keys(fieldsToUpdate);
        if (keys.length === 0) {
            throw "Nenhuma propriedade foi fornecida para atualização.";
        }

        const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
        const values = Object.values(fieldsToUpdate);

        const query = `
            UPDATE produtos
            SET ${setClause}
            WHERE codigo = $${keys.length + 1}
            RETURNING codigo, nome, descricao, quantidade_estoque, ativo, valor, data_cadastro, categoria
        `;

        const results = await pool.query(query, [...values, codigo]);

        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado.`;
        }

        const produto = results.rows[0];
        return new Produto(
            produto.codigo,
            produto.nome,
            produto.descricao,
            produto.quantidade_estoque,
            produto.ativo,
            produto.valor,
            produto.data_cadastro,
            produto.categoria
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};

const deleteProdutoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM produtos
            WHERE codigo = $1`,[codigo]
        )
         if (results.rowCount == 0)
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`
        else
            return "Produto removida com sucesso"
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
            const produto = results.rows[0]
            return new Produto(
                produto.codigo, 
                produto.nome,
                produto.descricao,
                produto.quantidade_estoque,
                produto.ativo,
                produto.valor,
                produto.data_cadastro,
                produto.categoria
            )
         }
    } catch (err) {
        throw "Erro : " + err;
    }
}


module.exports = {
    getProdutosDB, getProdutoPorCodigoDB, addProdutoDB, updateProdutoDB, deleteProdutoDB, updateProdutoDetalhesDB   
}