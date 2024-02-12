# Watcher Movies

Sistema de cadastro e listagem de Usuários e filmes.

# 🖼 Front-end

## 💻 Tecnologias
* React.js 18+
* Next.js 14+
* Material UI (MUI)
* Tailwind
* Node.js
* Typescript

## ⚙ Configuração
Para conseguir rodar o Front-end, você precisa ter instalado o Node.js.
Após isso, clone o repositório e entre na pasta `./frontend` e execute o seguinte comando para instalar as dependências do projeto:

``` bash
$ npm install
```
* Obs: Vale lembrar que o Backend precisa está configurado e ligado para a aplicação funcionar

## 🚀 Executando
A aplicação irá rodar utilizando o framework Next.js.
Após a instalação das dependências, execute o seguinte comando:

``` bash
$ npm run dev
```

Depois é só acessar em sua máquina o seguinte endereço: `http://localhost:3000/`

# 📡 Back-end

# 💻 Tecnologias
* Node.js
* Nest.js
* Prisma ORM
* SQLite

## ⚙ Configuração
Para conseguir rodar o Backe-end, você precisa ter instalado o Node.js em sua máquina.
Após isso, clone o repositório e entre na pasta `./backend` e execute os seguintes passo a passo:

- Rode o comando:
``` bash
    $ npm install
```

- Será necessário executar as entidades via Prisma para que o banco de dados SQLite seja gerado, para isso rode:
``` bash
    $ npx prisma db push
```

- Após o comando executar com sucesso, execute o próximo comando:
    ``` bash
    $ npx prisma generate
    ```


## 🚀 Executando
Após a configurção, execute o seguinte comando:

``` bash
$ npm run start:dev

```

## 🔀 Rotas
Para saber quais as rotas existentes, acesse: `https://localhost:3005/api/`.
- Vale lembrar que o swagger só irá funcionar em ambiente de desenvolvimento.

# Considerações
* Infelizmente tive imprevistos durante o tempo para fazer o teste, o que acarretou em uma perda de desempenho, logo, gostaria de deixar claro que planejava estruturar o Front-end de maneira mais adequada e com um design mais agradável para o usuário, e para o Back-end, implementar testes unitários, mas devido aos contra tempos que tive, acabei tendo que apressar o desenvolvimento.

# Observações

* Neste projeto, utilizei no backend um Design Pattern conhecido como IoC (Inversion of Controll) e para sua implementação utilizei a técnica conhecida como Dependency Injection, que representa a letra D do conhecido SOLID.
* Caso haja alguma coisa que eu possa melhorar no sistema, estarei totalmento aberto a criticas. Afinal, assim posso melhorar minhas habilidades no desenvolvimento.
* Qualquer dúvida em relação ao teste, entre em contato via telefone (caso tenha) ou email: luizvictor1231@gmail.com


