drop database dancacomcores;

create database dancacomcores;
use dancacomcores;

CREATE USER 'danca'@'localhost' IDENTIFIED BY 'stepup';
GRANT ALL PRIVILEGES ON dancacomcores.* TO 'danca'@'localhost';
FLUSH PRIVILEGES;

ALTER USER 'danca'@'localhost' IDENTIFIED WITH mysql_native_password BY 'stepup';
FLUSH PRIVILEGES;


create table usuario(
idusuario	int primary key auto_increment,
nome		varchar(50),
email		varchar(100),
senha		varchar(255)
);

create table minhadanca(
idminhadanca	int primary key auto_increment,
nomedanca	varchar(20),
fkusuario	int,
foreign key (fkusuario) references usuario(idusuario)
);

create table jogo(
idjogo		int primary key auto_increment,
tentativas	int,
erros		int,
tempojogo	int,
fkusuario	int,
foreign key (fkusuario) references usuario(idusuario)
);

create table quiz(
idquiz	int primary key auto_increment,
respostas_certas	varchar(255),
respostas_erradas varchar(255),
pergunta_mais_certa varchar(255),
 pergunta_mais_errada varchar(255),
 tempos_resposta int,
 fk_usuario		int,
 foreign key (fk_usuario) references usuario(idusuario)
);

CREATE TABLE quiz (
    idquiz INT AUTO_INCREMENT PRIMARY KEY,
    respostas_certas INT,
    respostas_erradas INT,
    pergunta_mais_certa VARCHAR(255),
    pergunta_mais_errada VARCHAR(255),
    tempos_resposta JSON,
    fk_usuario INT,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(idusuario)
);


select * from quiz;

