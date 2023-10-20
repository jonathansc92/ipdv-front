## Descrição

Front desenvolvido em VueJs.

## Decisão da arquitetura utilizada

Neste projeto a ideia era separar as responsabilidades.
Na pasta src temos algumas estruturas de pastas.
- **http-common**: Este arquivo, tem a responsabilidade de instanciar o axios uma única vez, sem a necessidade de declarar várias vezes nas requisições;
- **services**: Nesta pasta há os serviços responsáveis pelas chamadas para api, salvar dados do usuário logado no localstorage e o mais importando o interceptor;
- **stores**: Utilizamos controle de estados, utilizando um conceito mais atual PINIA, ao invés do VUEX.

## Lista de bibliotecas de terceiros utilizadas

- pinia; 
- vue-toastification;
- vuelidate;
- primevue; 
- primeflex;
- axios;
- vue-router;

## Quais requisitos obrigatórios que não foram entregues

Neste repositório foram entregues todos os requisitos.

## Como executar o projeto
- Na raiz do projeto renomeie o arquivo **.env.example** para **.env**;
- Execute o comando: 
```
    docker-compose up -d
```

## Executar Manualmente
- Rodar na raiz do projeto o comando
```
    npm i
```
- Rodar o comando
```
    npm run serve
```

## Rotas
- Login GET [http://localhost:5173/login](http://localhost:5173/)
- Centro de Custos GET [http://localhost:5173/centro-de-custos](http://localhost:5173/centro-de-custos)
- Departamentos GET [http://localhost:5173/departamentos](http://localhost:5173/departamentos)
- Usuários GET [http://localhost:5173/usuarios](http://localhost:5173/usuarios)

## Autor
- Autor - Jonathan Cruz
- [https://jonathansc92.github.io/jonathancruzdev/?language=ptBr](https://jonathansc92.github.io/jonathancruzdev/?language=ptBr)


