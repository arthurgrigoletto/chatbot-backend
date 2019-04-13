# ChatBot USJT

Simples API REST para um chatbot. Essa aplicação é desenvolvida para a matéria de Projeto Integrado da Universidade São Judas Tadeu.

## Getting Started

Essas intruções servirão para copiar o projeto e rodá-lo localmente para desenvolvimento. Caso queira ter uma experiência online da API sem precisar copiar o projeto a url base é <https://saojudasbot.herokuapp.com/>. Caso queira usá-la, leia a parte de [Routes](#routes)

### Prerequisites

Quais coisas você precisa e como instalá-las:

- [Node.js](https://nodejs.org/en/)

  - Baixe a versão recomendada para os usuários comuns e siga as intruções corretamente.

- [Yarn](https://yarnpkg.com/pt-BR/)
- [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [AWS Account](https://console.aws.amazon.com/)

### Installing

#### 1. Copiando o projeto

No terminal navegue até o diretório que deseja e execute:

```bash
  git clone https://github.com/arthurgrigoletto/chatbot-backend
```

#### 2. Instalando dependências

No terminal navegue até o diretório do projeto e execute:

```bash
  cd .../chatbot-backend

  npm install
  ou
  yarn
```

Esse comando instalará todos os pacotes listados nos packages.json correspondentes: [package.json](https://github.com/arthurgrigoletto/chatbot-backend/blob/master/package.json)

#### 3. Criar arquivo .env

O arquivo _.env_ é de extrema importância, porque é dele que toda a aplicação busca as credenciais, ele fica localizado no diretório root. Um modelo para todas as Chaves está logo abaixo:

```bash
  DB_URL=mongodb://<dbUsername>:<dbPassword>@ds133556.mlab.com:33556/<dbName>

  APP_SECRET=chatbotSjDev

  WA_URL=https://gateway.watsonplatform.net/assistant/api
  WA_APIKEY=<Watson_Assistant_API_KEY>
  WA_VERSION='2019-02-28'

```

##### \* _O arquivo .env não subirá para o gitHub_

#### 3. Rodando localmente o servidor

Há alguns scripts disponibilizados para facilitar na hora do desenvolvimento.

- Esse comando rodará o servidor sem restartar automaticamente, a cada mudança será necessário parar o servidor no terminal e startar de novo.

  ```bash
    npm start
    ou
    yarn start
  ```

- Esse comando rodará o servidor ouvindo todas as mudanças que fizer no código, ou seja, ele sempre irá restartar o servidor a cada mudança

  ```bash
    npm run server
    ou
    yarn server
  ```

## Routes

| Endpoint                       | Description                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| POST `/api/users` **PUBLIC**   | Create an user **Required**: name, email, phone. **Returns**: success, token               |
| POST `/api/message`**PRIVATE** | Send and receive a message from Watson Assistant. **Required**: text, context, workspaceId |
| GET `/api/message` **PRIVATE** | Get all Messages from user logged.                                                         |
