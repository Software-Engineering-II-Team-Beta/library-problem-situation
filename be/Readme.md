# Backend para trabalho de Engenharia de Software

## Links

1. [HealthCheck](http://localhost:8000)
1. [Swagger](http://localhost:8000/swagger)

## Rodando o projeto

### Em desenvolvimento

Para rodar o projeto em desenvolvimento, basta rodar `yarn dev`

### Em produção

Para rodar esse projeto em produção:

1. Caso deseje rodar o processo de `yarn build` e depois iniciar o servidor, utilize `yarn serve`
1. Caso o processo de `yarn build` já tenha sido executado, utilize `yarn start`

## Arquitetura

### Tecnologias Principais

1. [Node.JS](https://nodejs.org) com [Express](https://expressjs.com)
1. [Firebase](https://firebase.google.com)
1. [Typescript](https://www.typescriptlang.org)

### Deploy

A aplicação será disponibilizada utilizando docker futuramente. O arquivo [`Dockerfile`](src/Dockerfile) já está pronto e pode ser encontrado em [AQUI](src/Dockerfile).
