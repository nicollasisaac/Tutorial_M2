BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "pessoa" (
	"id_pessoa"	INTEGER,
	"nome_pessoa"	TEXT(120) NOT NULL,
	"cargo_pessoa"	TEXT(100) NOT NULL,
	"foto_pessoa"	BLOB,
	"endereco_pessoa"	TEXT(150),
	"email_pessoa"	TEXT(120) NOT NULL,
	"numero_telefone"	TEXT(11) NOT NULL,
	"descricao_sobre_mim"	TEXT NOT NULL,
	PRIMARY KEY("id_pessoa" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "experiencia" (
	"id_experiencia"	INTEGER,
	"nome_empresa"	TEXT NOT NULL,
	"ano_inicio_empresa"	DATE NOT NULL,
	"ano_fim_empresa"	DATE NOT NULL,
	"descricao_experiencia_empresa"	TEXT,
	"id_pessoa"	INTEGER NOT NULL,
	PRIMARY KEY("id_experiencia" AUTOINCREMENT),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "personalidade" (
	"id_personalidade"	INTEGER,
	"nome_tipo_personalidade"	TEXT NOT NULL,
	"nivel_tipo_personalidade"	TEXT NOT NULL,
	"id_pessoa"	INTEGER NOT NULL,
	PRIMARY KEY("id_personalidade" AUTOINCREMENT),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "habilidade" (
	"id_habilidade"	INTEGER,
	"nome_habilidade"	TEXT NOT NULL,
	"nivel_habilidade"	TEXT NOT NULL,
	"id_pessoa"	INTEGER NOT NULL,
	PRIMARY KEY("id_habilidade" AUTOINCREMENT),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "formacao" (
	"id_formacao"	INTEGER,
	"curso_formacao"	TEXT NOT NULL,
	"ano_inicio_formacao"	DATE NOT NULL,
	"ano_fim_formacao"	DATE NOT NULL,
	"instituicao_formacao"	TEXT NOT NULL,
	"diploma_formacao"	TEXT NOT NULL,
	"descricao_formacao"	TEXT,
	"id_pessoa"	INTEGER NOT NULL,
	PRIMARY KEY("id_formacao" AUTOINCREMENT),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
COMMIT;
