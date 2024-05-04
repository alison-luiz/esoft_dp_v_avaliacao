## Projeto para avaliação da matéria Desafio Profissional V 🚀

### Trabalho realizado por:

- Alison Luiz da Silva - RA: 22033281-2
- Andre Fragalli Vassoler - RA: 22012716-2

 ___

Uma API Rest que faz requisições na API publica da Marvel para semear a base de dados, e CRUD para manipular entidades como: series, personagens, quadrinhos e criadores.

Tecnologias utilizadas neste projeto:

 - Backend: Express, TypeORM, PostgreSQL

##  Dependências 📦

[Docker](https://www.docker.com/)

[PostgreSQL](https://www.postgresql.org/) 

## Iniciando o projeto 🚩

```bash
$ git clone https://github.com/alison-luiz/esoft_dp_v_avaliacao
```

#### 1. Usar o docker-compose.yml para criar o banco de dados (na pasta raiz)
```bash
$ docker compose up -d
```

---

#### 2. Usar o gerenciador de pacotes [NPM](https://www.npmjs.com/) para executar o backend em modo de desenvolvimento

**Backend 🌐**
```bash
$ npm install
$ npm run dev
```
## Semeando o banco de dados 🌾
Com o servidor rodando, é preciso popular o banco de dados conforme a saga escolhida, nosso projeto foi feito de forma dinâmica, onde é possível semear o banco de dados com qualquer saga da Marvel API.

Para isso basta acessar a rota abaixo, informando a key privada e publica da Marvel API, assim como a saga desejada.

    http://localhost:3000/seed

 ![image](https://github.com/alison-luiz/esoft_dp_v_avaliacao/assets/89758128/2ffd6c13-90b5-4ca1-b138-0b1e57dc5589)


## Testes 🕵️

#### Para executar os testes e2e e autocannon, primeiro execute uma instância da API (passo 2)

Para rodar a série de testes feitos no backend, você pode digitar o comando abaixo.
Obs.: Importante semear o banco de dados para os testes de carga
```bash
$ npm run test
$ npm run test:autocannon
```

## Documentação/Endpoints 📰

Foi disponibilizado os arquivos de environment e collection da ferramenta [postman](https://www.postman.com/) contendo todos os endpoints feitos neste projeto.

[Collection](https://github.com/alison-luiz/esoft_dp_v_avaliacao/blob/main/API%20Marvel.postman_collection.json)

[Environment](https://github.com/alison-luiz/esoft_dp_v_avaliacao/blob/main/Marvel%20API.postman_environment.json)

Também contamos com uma documentação feita pelo [swagger](https://swagger.io/) que esta disponibilizada na seguinte rota da API:

    http://localhost:3000/api-docs/

![image](https://github.com/alison-luiz/esoft_dp_v_avaliacao/assets/89758128/92d579dc-4024-4201-8f6b-91c4ef49a679)
