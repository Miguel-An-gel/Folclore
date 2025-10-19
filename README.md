# Folclore
 Projeto Dança com Cores (Folclore)
Este é um portal interativo dedicado à dança folclórica, focado em apresentar diferentes estilos e ajudar os usuários a descobrir qual dança mais combina com sua personalidade através de um quiz. O projeto também inclui um quiz de conhecimentos gerais e estatísticas de usuário.

Prerequisites (Pré-requisitos)
Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

Node.js: (Versão 16 ou superior). Usado para rodar o servidor backend.

Recomendamos instalar junto com o MySQL Workbench para facilitar a administração do banco.

Git: Para clonar o repositório.

Instalação e Configuração
Siga estes passos para configurar e executar o projeto em sua máquina local.

1. Clonar o Repositório
Abra seu terminal(usando o 'git Bach'), navegue até o diretório onde deseja salvar o projeto e execute o seguinte comando:


git clone https://github.com/Miguel-An-gel/Folclore.git

Depois, entre na pasta do projeto:

cd Folclore


2. Instalar as Dependências do Backend
O backend (servidor) é feito em Node.js e precisa de alguns pacotes (como express e mysql2). Para instalá-los, execute:

usando o 'git Bach'
npm install


3. Configurar o Banco de Dados (MySQL)
Este é o passo mais importante. O projeto inclui um script SQL que cria automaticamente o banco de dados, as tabelas e o usuário necessários.

Inicie seu MySQL Workbanch, abra um novo script e cole o script do projeto que se encontra na pasta 'banco'
o script 'moveOn.sql' execute o script todo e pronto, ja esta configurado para o usuario.


4. Iniciar o Servidor
Agora dentro do projeto, podemos iniciar ele utilizando o comando:

usando o 'git Bach'
npm start

5. Acessar o Projeto
Abra seu navegador de internet (Chrome, Firefox, etc.) e acesse o seguinte endereço:

http://localhost:3010
