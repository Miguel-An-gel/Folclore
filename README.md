Projeto Dança com Cores (Folclore)
Este é um portal interativo dedicado à dança folclórica, focado em apresentar diferentes estilos e ajudar os usuários a descobrir qual dança mais combina com sua personalidade através de um quiz. O projeto também inclui um quiz de conhecimentos gerais e estatísticas de usuário.

Pré-requisitos
Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

Node.js: (Versão 16 ou superior). Usado para rodar o servidor backend.

[link suspeito removido]: (Versão 8.0 ou similar). O banco de dados do projeto.

MySQL Workbench: Recomendado para administrar o banco de dados e executar o script de instalação.

Git: Para clonar o repositório.

Instalação e Configuração
Siga estes passos para configurar e executar o projeto em sua máquina local.

1. Clonar o Repositório
Abra seu terminal ou Git Bash, navegue até o diretório onde deseja salvar o projeto e execute o comando:

Bash

git clone https://github.com/Miguel-An-gel/Folclore.git
Depois, entre na pasta do projeto:

Bash

cd Folclore
2. Instalar as Dependências do Backend
O backend é feito em Node.js e precisa de pacotes (como express e mysql2). Para instalá-los, execute no seu terminal:

Bash

npm install

3. Configurar o Banco de Dados (MySQL)
Este é o passo mais importante. O projeto inclui um script SQL que cria automaticamente o banco de dados, as tabelas e o usuário necessários.

Inicie seu serviço do MySQL Server.

Abra o MySQL Workbench e conecte-se à sua instância do banco de dados (geralmente como root).

Vá em File > Open SQL Script... e selecione o arquivo moveOn.sql (ou o nome do seu script) que está na pasta banco do projeto.

Com o script aberto, clique no ícone de raio (⚡) para executar o script inteiro.

Isso criará o banco de dados dancacomcores e o usuário danca (senha stepup), que o servidor usará para se conectar.

4. Iniciar o Servidor
Com o banco de dados configurado e as dependências instaladas, inicie o servidor. No seu terminal, dentro da pasta do projeto, execute:

Bash

npm start

Se tudo der certo, você verá uma mensagem no terminal confirmando que o servidor está rodando na porta 3010.

5. Acessar o Projeto
Abra seu navegador de internet (Chrome, Firefox, etc.) e acesse o seguinte endereço:

http://localhost:3010
