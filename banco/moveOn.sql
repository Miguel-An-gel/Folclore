create database dancacomcores;
use dancacomcores;

CREATE USER 'danca'@'localhost' IDENTIFIED BY 'stepup';
GRANT ALL PRIVILEGES ON dancacomcores.* TO 'danca'@'localhost';
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

select * from usuario;
