# Backend para trabalho de Engenharia de Software

Durante o desenvolvimento você pode utilizar `yarn code-check` para fazer uma análise estática do código com [TSLint](https://www.npmjs.com/package/tslint) e [Typescript](https://www.typescriptlang.org)

## Links

1. [HealthCheck](http://localhost:8000)
1. [Swagger](http://localhost:8000/swagger)

## Rodando o projeto

### Em desenvolvimento

Para rodar o projeto em desenvolvimento, basta rodar `yarn dev`

### Testes

Para executar os casos de teste, basta rodar `yarn test`.
Este comando irá executar tanto os testes unitários como os testes de integração.

### Em produção

Para rodar esse projeto em produção:

1. Caso deseje rodar o processo de `yarn build` e depois iniciar o servidor, utilize `yarn serve`
1. Caso o processo de `yarn build` já tenha sido executado, utilize `yarn start`

## Arquitetura

### Tecnologias Principais

1. [Node.JS](https://nodejs.org) com [Express](https://expressjs.com)
1. [Firebase](https://firebase.google.com)
1. [Typescript](https://www.typescriptlang.org)
1. [TSLint](https://www.npmjs.com/package/tslint)

### Deploy

A aplicação será disponibilizada utilizando docker futuramente. O arquivo [`Dockerfile`](src/Dockerfile) já está pronto e pode ser encontrado em [AQUI](src/Dockerfile).
