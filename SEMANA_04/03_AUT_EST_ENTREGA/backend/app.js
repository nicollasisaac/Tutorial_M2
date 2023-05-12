const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'data/curriculo.db';

const hostname = '127.0.0.1';
const port = 5500;
const app = express();

app.use(express.static("front-end/"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Definição dos endpoints Crud */

app.get('/pessoa', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM pessoa LEFT JOIN habilidade ON pessoa.id_pessoa = habilidade.id_pessoa LEFT JOIN personalidade ON pessoa.id_pessoa = personalidade.id_pessoa LEFT JOIN experiencia ON pessoa.id_pessoa = experiencia.id_pessoa LEFT JOIN formacao ON pessoa.id_pessoa = formacao.id_pessoa';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco

    // Insere na tabela "pessoa"
    var sql1 = "INSERT INTO pessoa (nome_pessoa, cargo_pessoa, endereco_pessoa, email_pessoa,numero_telefone, descricao_sobre_mim ) VALUES ('" + req.body.nome + "', '" + req.body.cargo + "', '" + req.body.endereco + "', '" + req.body.email + "', '" + req.body.numero + "', '" + req.body.descricao + "')";
    console.log(sql1);
    db.run(sql1, [], function (err) {
        if (err) {
            throw err;
        }

        // Obtém o valor da chave primária gerada durante a inserção na tabela "pessoa"
        var lastId = this.lastID;

        // Insere na tabela "experiencia"
        var sql2 = "INSERT INTO experiencia(nome_empresa, ano_inicio_empresa, ano_fim_empresa, descricao_experiencia_empresa, id_pessoa) VALUES ('" + req.body.nome_empresa + "', '" + req.body.ano_inicio_empresa + "', '" + req.body.ano_fim_empresa + "', '" + req.body.descricao_experiencia_empresa + "', '" + lastId + "')";
        console.log(sql2);
        db.run(sql2, [], function (err) {
            if (err) {
                throw err;
            }
        });

        // Fecha a conexão com o banco de dados
        db.close();

        // Retorna a resposta ao cliente
        res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
});

// Update a record (U of CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    const db = new sqlite3.Database(DBPATH); // Open database

    const sql = `UPDATE pessoa SET nome_pessoa='${req.body.nome}', cargo_pessoa='${req.body.cargo}', endereco_pessoa='${req.body.endereco}',
      email_pessoa='${req.body.email}', numero_telefone='${req.body.telefone}', descricao_sobre_mim='${req.body.descricao}' WHERE id_pessoa='${req.body.userId}'`;

    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });

    const sql2 = `UPDATE experiencia SET nome_empresa='${req.body.nome_empresa}', ano_inicio_empresa='${req.body.ano_inicio_empresa}', ano_fim_empresa='${req.body.ano_fim_empresa}',
        descricao_experiencia_empresa='${req.body.descricao_experiencia_empresa}' WHERE id_pessoa='${req.body.userId}'`;

    console.log(sql2);
    db.run(sql2, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });

    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Close database
});

app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "SELECT * FROM pessoa, experiencia WHERE pessoa.id_pessoa=?";
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [req.query.userId], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
        db.close(); // Fecha o banco dentro do callback
    });
});


// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "DELETE FROM pessoa WHERE id_pessoa='" + req.query.userId + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});
