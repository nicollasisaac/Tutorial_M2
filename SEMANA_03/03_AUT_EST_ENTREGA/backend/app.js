const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false});

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
    var sql = 'SELECT * FROM pessoa ORDER BY id_pessoa';
            db.all(sql, [],  (err, rows ) => {
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
    sql = "INSERT INTO pessoa (nome_pessoa, cargo_pessoa, endereco_pessoa, email_pessoa,numero_telefone, descricao_sobre_mim ) VALUES ('" + req.body.nome + "', '" + req.body.cargo + "', '" + req.body.endereco + "', '" + req.body.email + "', '" + req.body.numero + "', '" + req.body.descricao + "')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); // Fecha o banco
    res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "UPDATE pessoa SET nome_pessoa='" + req.body.nome+ "', cargo_pessoa = '" + req.body.cargo + "', endereco_pessoa = '" + req.body.endereco + "', email_pessoa = '" + req.body.email + "' , numero_telefone='" + req.body.telefone + "' , descricao_sobre_mim='" + req.body.descricao + "' WHERE id_pessoa='" + req.body.userId + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close(); 
});

app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "SELECT * FROM pessoa WHERE id_pessoa="+ req.query.userId;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});


// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "DELETE FROM pessoa WHERE id_pessoa='" + req.query.userId + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
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
