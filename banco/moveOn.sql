drop database dancacomcores;

create database dancacomcores;
use dancacomcores;

create USER 'danca'@'localhost' IDENTIFIED BY 'stepup';
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

create TABLE Respostas (
id int primary key auto_increment,
pergunta varchar(255),
resposta_correta varchar(255),
resposta_usuario varchar(255),
correta boolean,
tempo decimal(5,2),
data_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
fkusuario	int,
foreign key(fkusuario) references usuario(idusuario)
);



select * from respostas;
select * from usuario;




