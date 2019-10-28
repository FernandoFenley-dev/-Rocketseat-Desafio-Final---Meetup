# -RocketSeatBootcamp-Meetup---backend

# Desafio Meetup: Backend

# Projeto criado no Windows

## Banco de dados do projeto: Postgres
## Banco de dados para fila de tarefas: Redis-Alpine
## Servidor de e-mails: Mailtrap.io

## Instruções para configuração do projeto

1-Renomear arquivo ".env.example" para ".env"

2-Preecher as variáveis de acordo com suas configurações. Por padrão, a URL da aplicação é: http://localhost:3000

3-Na pasta "src", arquivo "server.js" na linha 3, configurar a porta do servidor. Por padrão, a porta é 3000.

## Instruções para execução da base de dados

1-Executar as migrations: 
yarn sequelize db:migrate

2-Executar as seeds para popular a base de dados: 
yarn sequelize db:seed:all

## Executar a aplicação

Para executar a aplicação:

1- Primeiro, executar o servidor:
yarn dev

2- Segundo, executar a fila de tarefas:
yarn queue

