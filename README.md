<h1 align="center">
  <img alt="Logo Estofados Bech" src="https://user-images.githubusercontent.com/51447706/106279734-a530a600-621b-11eb-967c-8040f91470c9.png" width="600px"/>
  <br>Website Estofados Bech<br/>
  Node.js | ReactJS 
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/gabriellinke/Website-estofados-bech?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/gabriellinke/Website-estofados-bech?style=flat-square">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=#555">
</p>

<p align="center">
  <img alt="Design do projeto" width="650px" src="https://user-images.githubusercontent.com/51447706/106307816-94455c00-623e-11eb-82ed-a02a1c8f2383.png" />
</p>

## :bookmark: Sobre
<p>
 O website da Estofados Bech é um e-commerce desenvolvido a fim de estudos. Nele é possível realizar a compra de diversos artigos vendidos pela Loja e Estofados Bech, tais como sofás, cadeiras e tecidos. O pagamento é realizado através do Mercado Pago, e a única ação que necessita ser feita antes da compra é a criação de uma conta no website.
</p>

## :hourglass_flowing_sand: História
<p>
Este site foi desenvolvido em 2020 durante a pandemia do coronavírus. Como eu estava com tempo livre, pois as aulas estavam paralisadas, resolvi estudar um pouco sobre desenvolvimento web. Então, após estudar o básico sobre ReactJS e Node.js, surgiu a ideia de criar um e-commerce, com o intuito de me desafiar e tentar desenvolver novas habilidades. O site começou a ser desenvolvido sob o nome de "Meu Website" porém, após comentar com um amigo que eu estava desenvolvendo um e-commerce, ele sugeriu que eu tentasse desenvolver um website para a loja da família dele, a Estofados Bech. De início já gostei da ideia, pois não precisaria desenvolver algo tão genérico, e no fim talvez o trabalho pudesse ser aproveitado e utilizado numa aplicação real. Entretanto, atualmente o website serve apenas a fim de estudos. 
</p>

## :eyes: Versão demo

Atualmente o website tem uma versão de demonstração, com o seu back-end hospedado no Heroku e o front-end hospedado na Netlify. Para testar essa versão basta acessar o site <a target="blank" href="https://estofadosbech.gabriellinke.tech">https://estofadosbech.gabriellinke.tech</a>. Para ter acesso a uma conta com permissões de administrador, entre em contato com o desenvolvedor. Uma explicação sobre o funcionamento pode ser encontrada a seguir.

## :gear: Funcionamento

## 💻 Como Executar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.

1. Faça um clone do repositório:

```sh
  $ git clone https://github.com/gabriellinke/Website-estofados-bech.git
```

2. Executando a Aplicação:

```sh
  # API
  $ cd server
  # Instalando as dependências do projeto.
  $ npm install
  # Configurando o banco de dados e criando as tabelas.
  $ npm run knex:migrate
  # Criando os primeiros dados do banco de dados
  $ npm run knex:seed

  # Inicie a API
  $ npm run dev

  # Aplicação web
  $ cd web
  # Instalando as dependências do projeto.
  $ yarn # ou npm install
  # Inicie a aplicação web
  $ yarn start # ou npm start

```
Acesse http://localhost:3000/ e veja o resultado.


## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---
<sup>Projeto desenvolvido por Gabriel Henrique Linke</sup>
