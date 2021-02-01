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

Esta seção é destinada para explicar o funcionamento do Website. Ela será dividida em duas sub-seções, mostrando o website na perspectiva de um usuário e na perspectiva do administrador do Website.

## :man: Funcionamento para o usuário

### :name_badge: Conta

<p>
Ao acessar o website, o usuário se depara com a Home page. Ele pode navegar livremente pelo site, entretanto, sem ter criado uma conta ele não será capaz de fazer compras. Para criar a conta basta utilizar o botão "Cadastre-se ou faça seu login" que se encontra no canto superior direito da tela.
</p>
  
<p align="center">
  <img alt="Cadastro e login" width="450px" src="https://user-images.githubusercontent.com/51447706/106460957-e078e200-6472-11eb-9926-73412634e22c.png" />
</p>
<p align="center">
  Figura 1: Cadastre-se ou faça seu login.
</p>

<p>
Após clicar no botão, o usuário é redirecionado para a página de login. Se ele já tiver uma conta, basta inserir seu email e senha para realizar o login. No entanto, se ele ainda não tem uma conta cadastrada no website, basta clicar no botão "Criar conta".
</p>

<p align="center">
  <img alt="Criar conta" width="450px" src="https://user-images.githubusercontent.com/51447706/106461595-bd9afd80-6473-11eb-8052-a767f9c08b5f.png" />
</p>
<p align="center">
   Figura 2: Tela de login com botão para criar conta.
</p>

<p>
Na nova página que se abre, o usuário precisa preencher seus dados e após isso clicar no botão de "Cadastrar-se". É importante salientar que ao realizar o cadastro o usuário está concordando com os Termos de uso e a Política de privacidade do website, que podem ser acessados através dos links presentes abaixo do formulário de cadastro.
</p>

<p align="center">
  <img alt="Cadastro" width="450px" src="https://user-images.githubusercontent.com/51447706/106462517-fb4c5600-6474-11eb-921d-0111c47dadc7.png" />
</p>
<p align="center">
   Figura 3: Tela de cadastro.
</p>

<p>
Agora, com a conta cadastrada, é possível realizar o login. Entretanto, não será possível fazer login se o usuário tiver esquecido da sua senha. Para estes casos existe o botão de "Esqueci minha senha". Ao clicar nele, o usuário é redirecionado para uma página onde ele deve inserir seu email e pedir a sua recuperação de senha.  
</p>

<p align="center">
  <img alt="Esqueci minha senha" width="450px" src="https://user-images.githubusercontent.com/51447706/106463353-11a6e180-6476-11eb-8c96-2a6444035ef4.png" />
</p>
<p align="center">
   Figura 4: Botão "Esqueci minha senha".
</p>

<p align="center">
  <img alt="Recuperação de senha" width="450px" src="https://user-images.githubusercontent.com/51447706/106463355-12d80e80-6476-11eb-8245-dcd74a9db090.png" />
</p>
<p align="center">
   Figura 5: Formulário para recuperação de senha
</p>

<p>
Em alguns instantes, um email para recuperação da senha será enviado para o endereço de email informado no formulário. Esse email contém um link, que leva o usuário a uma página em que ele pode redefinir sua senha. 
</p>

<p align="center">
  <img alt="Email para recuperação de senha" width="450px" src="https://user-images.githubusercontent.com/51447706/106464226-1d46d800-6477-11eb-8027-6fda94fd09b8.png" />
</p>
<p align="center">
   Figura 6: Email para recuperação de senha.
</p>

<p align="center">
  <img alt="Formulário para alterar senha" width="450px" src="https://user-images.githubusercontent.com/51447706/106464232-2172f580-6477-11eb-91bd-32f1d248f62b.png" />
</p>
<p align="center">
   Figura 7: Formulário para alterar senha.
</p>

### :arrows_counterclockwise: Navegação

<p>
Existem diversas formas de navegação pelo site, e a primeira a ser mostrada é a navegação através do cabeçalho. No canto superior esquerdo existem 3 botões: o botão de "Home", que faz com que o usuário seja redirecionado para a Home, o botão de "Quem somos" que redireciona o usuário para uma página que mostra uma imagem, a localização e um breve texto sobre a loja, e o botão de "Contato", que redireciona para uma página com informações de contato, links para as redes sociais e um formulário para envio de mensagens.
</p>

<p align="center">
  <img alt="Botões para navegação" width="450px" src="https://user-images.githubusercontent.com/51447706/106467836-f343e480-647b-11eb-850b-885bc992fa41.png" />
</p>
<p align="center">
   Figura 8: Botões para navegação.
</p>

<p align="center">
  <img alt="Página de Quem somos" width="450px" src="https://user-images.githubusercontent.com/51447706/106467196-115d1500-647b-11eb-86f8-e28bca3f3276.png" />
</p>
<p align="center">
   Figura 9: Página de Quem somos.
</p>

<p align="center">
  <img alt="Página de Contato" width="450px" src="https://user-images.githubusercontent.com/51447706/106467195-102be800-647b-11eb-8c5f-afcf93c2a165.png" />
</p>
<p align="center">
   Figura 10: Página de Contato.
</p>

<p>
Para facilitar o contato do usuário com a loja, a página de contato dispõe de um formulário para envio de mensagens. Assim, o usuário pode mandar uma mensagem para a loja sem precisar sair do website. Para isso, basta preencher o seu nome, um email para onde pode ser enviada uma resposta, opcionalmente um telefone para contato e a mensagem em si.
</p>

<p align="center">
  <img alt="Enviar mensagem através do formulário" width="450px" src="https://user-images.githubusercontent.com/51447706/106469537-2edfae00-647e-11eb-9a1d-57e0d4940607.png" />
</p>
<p align="center">
   Figura 11: Formulário para envio de mensagens através do site.
</p>

<p align="center">
  <img alt="Mensagem recebida no email" width="450px" src="https://user-images.githubusercontent.com/51447706/106469648-5171c700-647e-11eb-9271-0827a77eb34f.png" />
</p>
<p align="center">
   Figura 12: Demonstração de como a mensagem é recebida no email do administrador.
</p>

## :hammer: Funcionamento para o administrador


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
