# Trybe Futebol Club Project

---
## Habilidades

![Exemplo app front](./front-example.png)

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que funcionem consumindo um banco de dados.

Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Meu desenvolvimento deveria **respeitar regras de negócio** providas no projeto e **A API é capaz de ser consumida por um front-end já provido nesse projeto**. 

---
## Desenvolvido:

Arquitetei e desenvolvi uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. Começando pela API, desenvolvi alguns endpoints (seguindo os princípios **REST**) que estarão conectados ao seu banco de dados.

---

## Desenvolvimento

Desenvolvi uma aplicação dockerizada em `Node.js + Typescript` usando o pacote `sequelize`.

Para adicionar uma partida é necessário usuário e senha, portanto a pessoa deverá estar logada para fazer as alterações. Há um relacionamento entre as tabelas `clubs` e `matchs` para fazermos as atualizações das partidas.

## Tecnologias e ferramentas:
- NodeJS
- TypeScript
- Sequelize
- nyc
- JWT
- Express
- joi
- mysql2
- nodemon
- mocha
- jest
- sinon
- chai-http
- cors

## Como instalar e configurar:
  1. Primeiro instale as dependencias:
     ```
     npm install
     ```
  ### Para rodar o back-end:
  2. Crie um arquivo .jwt.evaluation.key e adicione uma chave

  3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
  ```
  PORT=3003
  DB_USER=seuUsuario
  DB_PASS=suaSenha
  DB_HOST=db
  DB_NAME=TRYBE_FUTEBOL_CLUBE
  DB_PORT=portaDoSeuBando
  ```

  4. Crie o banco executando o arquivo Trybesmith.sql que esta na raiz do projeto.

  5. Rode o proximo comando para dropa, criar o banco e criar as migrations e seeders
    ```
    npm run prestart
    ```
  6. Rode o projeto:
  ```
  npm run debug
  ```
  ou
  ```
  npm run dev
  ```
   7. Para rodar os testes:
    ```
    npm test
    ```
    ou
    ```
    npm run test:coverage
    ```
    ou
    ```
    npm run test:coverage:json
    ```

  ### Para rodar o front-end:
  8. Para rodar o front:
    ```
    npm start
    ```4. Rode o proximo comando para dropa, criar o banco e criar as migrations e seeders
    ```
    npm run prestart
    ```
  9. Rode o projeto:
  ```
  npm run debug
  ```
  ou
  ```
  npm run dev
  ```
   10. Para rodar os testes:
    ```
    npm test
    ```

    ou

    ```
    npm run test:coverage
    ```

    ou

    ```
    npm run test:coverage:json
    ```

  11. Rode o proximo comando para dropa, criar o banco e criar as migrations e seeders
   
    ```
    npm run prestart
    ```

  12. Rode o projeto:
   
  ```
  npm run debug
  ```

  ou

  ```
  npm run dev
  ```

  13. Para rodar os testes:

    ```
    npm test
    ```

    ou

    ```
    npm run test:coverage
    ```

    ou

    ```
      npm run test:coverage:json
    ```