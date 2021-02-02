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

<p>
A próxima navegação é em procura dos produtos, e ela começa na Home page. Ao entrar na Home page é possível observar imagens de reformas de estofados feitas pela Estofados Bech. O usuário pode pedir uma reforma entrando em contato com a loja. Abaixo das imagens de reformas, podem ser encontrados todos os produtos cadastrados no website. Estes podem ser ordenados por ordem alfabética ou por ordem de preço.
</p>

<p align="center">
  <img alt="Produtos na Home page" width="450px" src="https://user-images.githubusercontent.com/51447706/106472590-96e3c380-6481-11eb-8f5f-438b4f9fbf45.png" />
</p>
<p align="center">
   Figura 13: Produtos na Home page.
</p>

<p>
Além de encontrar os produtos pela Home page também é possível filtrar a busca por produtos, e para isso existem dois métodos. O primeiro deles é encontrando os produtos através das categorias, que podem ser localizadas na parte inferior do cabeçalho. Ademais, também existe a possibilidade de realizar a busca por um produto utilizando a barra de pesquisa, localizada na parte central do cabeçalho.
</p>

<p align="center">
  <img alt="Categoria de cadeiras" width="450px" src="https://user-images.githubusercontent.com/51447706/106474112-538a5480-6483-11eb-9883-8b0e39c200d0.png" />
</p>
<p align="center">
   Figura 14: Categoria de cadeiras.
</p>

<p align="center">
  <img alt="Pesquisa por preta" width="450px" src="https://user-images.githubusercontent.com/51447706/106474120-54bb8180-6483-11eb-9ad9-fbb5a3e446fa.png" />
</p>
<p align="center">
   Figura 15: Resultado da pesquisa por preta.
</p>

### :credit_card: Compras

<p>
Após o usuário realizar as pesquisas e encontrar os produtos que deseja comprar, está na hora de iniciar as compras!
</p>
<p>
Para isso, o usuário primeiramente precisa clicar sobre o produto em que ele está interessado. Então, se abrirá a página de informações do produto. Nela o usuário pode visualizar todas as fotos do produto, a descrição do produto, e quantas unidades estão no estoque. Nessa página também há uma área onde o usuário pode inserir seu CEP e calcular o preço do frete daquele produto. Além disso, também estão presentes nessa página os botões para adicionar o produto ao carrinho e de continuar a compra. 
</p>

<p align="center">
  <img alt="Página do produto" width="450px" src="https://user-images.githubusercontent.com/51447706/106498644-55154600-649e-11eb-9cc8-c1088568916d.png" />
</p>
<p align="center">
   Figura 16: Página do produto.
</p>

<p>
Se, na página do produto, o usuário clicar em "Adicionar ao carrinho" o produto será adicionado ao carrinho, que pode ser acessado clicando no ícone de carrinho, no canto superior direito da tela. 
</p>

<p align="center">
  <img alt="Acessar carrinho" width="450px" src="https://user-images.githubusercontent.com/51447706/106499475-6874e100-649f-11eb-91e9-8651b9a0c357.png" />
</p>
<p align="center">
   Figura 17: Ícone para acessar o carrinho e botão para adicionar produto ao carrinho.
</p>

<p>
Agora no carrinho, o usuário pode modificar a quantidade que ele deseja comprar, assim como pode remover o produto do carrinho. O carrinho pode ter um número ilimitado de produtos.
</p>

<p align="center">
  <img alt="Carrinho" width="450px" src="https://user-images.githubusercontent.com/51447706/106500142-3c0d9480-64a0-11eb-9284-f800a9f469c6.png" />
</p>
<p align="center">
   Figura 18: Carrinho do usuário.
</p>

<p>
Após definir os produtos que serão comprados, está na hora de fazer o pedido. É possível comprar apenas um produto, clicando em "Comprar" na página do produto. Porém, se o usuário quiser comprar mais de um produto, basta adicionar todos eles ao carrinho, e clicar em "Continuar a compra".
</p>

<p align="center">
  <img alt="Comprando um produto" width="450px" src="https://user-images.githubusercontent.com/51447706/106501289-b7bc1100-64a1-11eb-91eb-bdd5ceb532fc.png" />
</p>
<p align="center">
   Figura 19: Comprando um produto.
</p>

<p align="center">
  <img alt="Comprando pelo carrinho" width="450px" src="https://user-images.githubusercontent.com/51447706/106501294-ba1e6b00-64a1-11eb-9912-58cde4db3e7d.png" />
</p>
<p align="center">
   Figura 20: Comprando pelo carrinho.
</p>

<p>
O próximo passo é completar um formulário com as informações pessoais e com o endereço de entrega dos produtos. 
</p>
<p>
OBS:
A compra de produtos no website tem o processamento do pagamento feito através do Mercado Pago, para que assim, o cliente possa ter uma maior segurança no seu pagamento. Atualmente, a conta vinculada para receber os pagamentos é uma conta de testes, dessa forma, para que seja possível simular uma compra, é necessário que o usuário abra o link do Mercado Pago em uma guia anônima ou em um navegador que não tenha nenhuma conta do Mercado Livre logada. Além disso, o email utilizado no formulário deve ser o email de uma conta de testes. Tente utilizar este email: test_user_34678906@testuser.com. Se houver algum problema, contate o desenvolvedor.
</p>

<p align="center">
  <img alt="Formulário" width="450px" src="https://user-images.githubusercontent.com/51447706/106503952-10d97400-64a5-11eb-833b-351fbadc0687.png" />
</p>
<p align="center">
   Figura 21: Formulário para realizar a compra.
</p>

<p>
Após submeter o formulário, o usuário é redirecionado para uma página onde deve conferir seus dados, os preços dos produtos e o preço do frete, antes de prosseguir para o pagamento.
</p>

<p align="center">
  <img alt="Página para confirmação dos dados" width="450px" src="https://user-images.githubusercontent.com/51447706/106503959-120aa100-64a5-11eb-853f-98906f88de43.png"/>
</p>
<p align="center">
   Figura 22: Página para confirmação dos dados.
</p>

<p>
Ao clicar em "Pagar com Mercado Pago" o usuário é redirecionado para a página de pagamento do Mercado Pago. Nela estarão disponíveis diversas formas de pagamento. Também é possível que o usuário esteja em um navegador com uma conta do Mercado Livre logada ou tenha completado o formulário com uma conta que não é de testes. Nesse caso, aparecerá uma mensagem de erro, pois a conta vinculada ao Mercado Pago é uma conta de testes.
</p>

<p align="center">
  <img alt="Página do Mercado Pago" width="450px" src="https://user-images.githubusercontent.com/51447706/106504926-59456180-64a6-11eb-9778-c39d4b15e671.png"/>
</p>
<p align="center">
   Figura 23: Página do Mercado Pago.
</p>

<p align="center">
  <img alt="Página de erro" width="450px" src="https://user-images.githubusercontent.com/51447706/106503963-12a33780-64a5-11eb-832b-9091143a10eb.png"/>
</p>
<p align="center">
   Figura 24: Página de erro.
</p>

Uma vez na página do Mercado Pago, é necessário escolher uma forma de pagamento. Nesse exemplo será utilizado o pagamento com cartão de crédito. Para testar o pagamento com cartão de crédito, utilize os [cartões de teste](https://www.mercadopago.com.br/developers/pt/guides/online-payments/checkout-pro/test-integration#bookmark_cart%C3%B5es_de_teste) do Mercado Pago.

Após selecionar o cartão como método de pagamento, preencha as informações com um cartão de teste. Após isso, continue o preenchimento dos formulários, confirme os dados e faça o pagamento

<p align="center">
  <img alt="Informações do cartão" width="450px" src="https://user-images.githubusercontent.com/51447706/106507169-6adc3880-64a9-11eb-8930-9876df532b6c.png"/>
</p>
<p align="center">
   Figura 25: Preenchendo o formulário com os dados do cartão.
</p>

<p align="center">
  <img alt="Confirmando pagamento" width="450px" src="https://user-images.githubusercontent.com/51447706/106507152-66178480-64a9-11eb-83ea-8fcff1855356.png"/>
</p>
<p align="center">
   Figura 26: Confirmando pagamento.
</p>

<p>
Em alguns instantes o pagamento é aprovado e após alguns segundos o usuário é redirecionado de volta para o site da Estofados Bech. Após voltar para o site, há uma explicação de como o usuário poderá acompanhar a sua compra pelo site. 
</p>

<p align="center">
  <img alt="Pagamento aprovado" width="450px" src="https://user-images.githubusercontent.com/51447706/106507184-70d21980-64a9-11eb-88b8-39bb2dea367d.png"/>
</p>
<p align="center">
   Figura 27: Pagamento aprovado.
</p>

<p align="center">
  <img alt="Procedimentos após a compra" width="450px" src="https://user-images.githubusercontent.com/51447706/106508594-5b5def00-64ab-11eb-92e7-78ed91b47fc1.png"/>
</p>
<p align="center">
   Figura 28: Procedimentos após a compra.
</p>

### :clipboard: Menu do usuário

<p>
O menu do usuário é o local onde o usuário pode verificar o andamento das suas compras e também alterar sua senha. Ele pode ser acessado clicando na imagem do usuário, ao lado do ícone de carrinho, no canto superior direito.
</p>

<p align="center">
  <img alt="Menu do usuário." width="450px" src="https://user-images.githubusercontent.com/51447706/106516098-5867fc00-64b5-11eb-9343-d0700150b6ba.png"/>
</p>
<p align="center">
   Figura 29: Ícone para acessar o menu do usuário.
</p>

<p>
Ao abrir o menu, o usuário tem três opções para navegar: a primeira delas é a de Acompanhar compras, onde o usuário pode verificar suas últimas compras e obter o código de rastreamento dos correios. A segunda é o Histórico de compras, onde o usuário pode observar todas as compras já realizadas no site, bem como a data da compra. A última das opções é a de Alterar senha, onde a única informação necessária para realizar a alteração é a senha atual.
</p>

<p align="center">
  <img alt="Acompanhar compra" width="450px" src="https://user-images.githubusercontent.com/51447706/106516841-679b7980-64b6-11eb-97ce-7cfeb3b574bd.png"/>
</p>
<p align="center">
   Figura 30: Página para acompanhar compra.
</p>

<p align="center">
  <img alt="Histórico de compra" width="450px" src="https://user-images.githubusercontent.com/51447706/106516844-68341000-64b6-11eb-931e-b843701331db.png"/>
</p>
<p align="center">
   Figura 31: Página do histórico de compra.
</p>

<p align="center">
  <img alt="Alterar senha" width="450px" src="https://user-images.githubusercontent.com/51447706/106516847-68cca680-64b6-11eb-8c8c-9d2341620c11.png"/>
</p>
<p align="center">
   Figura 32: Página para alterar senha.
</p>

## :hammer: Funcionamento para o administrador

### :handbag: Produtos

<p>
Ao logar no site com uma conta de administrador, novas funções são liberadas. A primeira delas é a de criar produtos. Para isso, o administrador precisa clicar no ícone de "Novo produto" presente no cabeçalho. Então, ele será redirecionado para a página de cadastro do produto. Nessa página, é necessário preencher os principais dados do produto, como o nome o valor e a quantidade, adicionar uma foto do produto, além de ter que inserir as dimensões do produto, para que assim seja possível fazer o cálculo do frete.
</p>

<p align="center">
  <img alt="Botão para criar produto" width="450px" src="https://user-images.githubusercontent.com/51447706/106599416-c8b76180-6537-11eb-95c8-01bc446da4a4.png"/>
</p>
<p align="center">
   Figura 33: Botão para criar produto.
</p>

<p align="center">
  <img alt="Criação de produtos." width="450px" src="https://user-images.githubusercontent.com/51447706/106597806-afadb100-6535-11eb-90c6-4bf184341f21.png"/>
</p>
<p align="center">
   Figura 34: Formulário para criação de produtos.
</p>

<p>
Além disso, também é possível alterar as informações de um produto já cadastrado. Para isso, basta clicar sobre o produto que se deseja alterar. Então, na página que se abre, é possível adicionar e remover fotos do produto, adicionar e remover descrições, alterar o nome, preço, quantidade disponível e quantidade de parcelas permitidas no cartão. Também há a possibilidade de excluir o produto.
</p>

<p align="center">
  <img alt="Modificando produto" width="450px" src="https://user-images.githubusercontent.com/51447706/106597809-b1777480-6535-11eb-806f-7f15023658cd.png"/>
</p>
<p align="center">
   Figura 35: Modificando produto.
</p>

<p align="center">
  <img alt="Modificando produto" width="450px" src="https://user-images.githubusercontent.com/51447706/106597813-b2100b00-6535-11eb-9d06-f6b2aa8af66c.png"/>
</p>
<p align="center">
   Figura 36: Modificando produto: parte 2.
</p>

### :credit_card: Fluxo de compras

<p>
Quando um usuário concluir uma compra, um email será recebido. Esse email engloba as informações do comprador, além de conter o endereço onde o produto deve ser entregue. É importante salientar que, antes de enviar o produto, é necessário verificar a compra no Mercado Pago, pois pode ser que o pagamento ainda não tenha sido aprovado.
</p>

<p align="center">
  <img alt="Informações da compra" width="450px" src="https://user-images.githubusercontent.com/51447706/106601740-c73b6880-653a-11eb-8c1d-62a1a65cf561.png"/>
</p>
<p align="center">
   Figura 37: Email informando sobre uma possível compra.
</p>

<p>
Para verificar o andamento das compras, primeiro é necessário logar no Mercado Pago. Após ter efetuado o login, se abrirá a página de Atividades, onde constam todos os pedidos. Além dos pedidos, também é possível verificar o status do pagamento, se está pendente ou se foi aprovado. Ao clicar sobre um pedido com pagamento pendente, é possível observar todas as informações da compra, entretanto, há um aviso para não enviar o produto antes do pagamento ter sido aprovado. Ao clicar em um produto com o pagamento já aprovado, é possível observar os detalhes do pedido, além do email do comprador. Com esses dados em conjunto com os do email, já é possível fazer o envio dos produtos.
</p>


<p align="center">
  <img alt="Página de Atividades " width="450px" src="https://user-images.githubusercontent.com/51447706/106602389-af181900-653b-11eb-8241-dca8a3550689.png"/>
</p>
<p align="center">
   Figura 38: Página de Atividades contendo todos os pedidos.
</p>

<p align="center">
  <img alt="Pedido com pagamento pendente" width="450px" src="https://user-images.githubusercontent.com/51447706/106602385-ae7f8280-653b-11eb-8364-6a345f2f1922.png"/>
</p>
<p align="center">
   Figura 39: Detalhes de um pedido com pagamento pendente.
</p>

<p align="center">
  <img alt="Pedido com pagamento aprovado" width="450px" src="https://user-images.githubusercontent.com/51447706/106602379-ad4e5580-653b-11eb-80fa-19ea2897214a.png"/>
</p>
<p align="center">
   Figura 40: Detalhes de um pedido com pagamento aprovado.
</p>

<p>
Assim que o pagamento tiver sido aprovado, é necessário iniciar o processo de envio. Para isso, o administrador verifica o email do processo de compra e separa os produtos que foram comprados. Após isso, é preciso o deslocamento até uma agência dos correios. Lá os objetos deverão ser postados com destino ao endereço presente no email. Após a postagem, o código de rastreamento deve ser guardado para os próximos procedimentos.
</p>

<p>
O próximo passo é informar o comprador que os objetos estão a caminho. Para isso, o administrador deve enviar um email para o endereço de email que o usuário deixou como contato, informando que a compra está a caminho e deixando a disposição o código de rastreamento. Além disso, é necessário cadastrar a compra no website, para que o usuário também possa ter acesso a esses dados através do site. Para realizar essa ação, o administrador precisa clicar no ícone para abrir o menu do usuário. Então, ele deve dirigir-se à aba de "Cadastrar produto para acompanhamento". Uma vez nessa página, ele cadastra os produtos usando o email da conta do usuário, a data da compra, o código de rastreamento, o id do produto e a quantidade comprada (todos esses dados estão presentes no email da compra). Nesse mesmo menu também é possível "Listar produtos em acompanhamento de um usuário". Para usar essa opção basta inserir o email do usuário, fazendo com que todas as compras realizadas por ele sejam listadas. Se houver algum erro no cadastro, também é possível excluí-lo através desta página. Após isso, o último procedimento a ser feito é acessar as páginas dos produtos vendidos e atualizar o número de produtos disponíveis.
</p>

<p align="center">
  <img alt="Menu" width="450px" src="https://user-images.githubusercontent.com/51447706/106606478-f1902480-6540-11eb-8162-080465b7f397.png"/>
</p>
<p align="center">
   Figura 41: Ícone para acessar o menu do usuário.
</p>

<p align="center">
  <img alt="Acompanhamento" width="450px" src="https://user-images.githubusercontent.com/51447706/106606468-ee953400-6540-11eb-867e-a0ad46263ea1.png"/>
</p>
<p align="center">
   Figura 42: Cadastrar produto para acompanhamento.
</p>

<p align="center">
  <img alt="Listar produtos" width="450px" src="https://user-images.githubusercontent.com/51447706/106606472-efc66100-6540-11eb-8d64-1dc23f0a24f9.png"/>
</p>
<p align="center">
   Figura 43: Listar produtos em acompanhamento.
</p>

### :clipboard: Outros campos do menu


<p>
Além do que foi listado acima, o menu de usuário de uma conta de administrador ainda possui mais opções. Uma delas é a de consultar os dados do comprador através do código da compra do Mercado Pago. Esse recurso pode ser utilizado para confirmar alguns dados (como atualmente são utilizadas contas de teste, os dados de CPF e telefone são fixos).
</p>

<p align="center">
  <img alt="Dados do comprador" width="450px" src="https://user-images.githubusercontent.com/51447706/106607892-92331400-6542-11eb-9ac4-00330bb79c53.png"/>
</p>
<p align="center">
   Figura 44: Página para consultar os dados do comprador.
</p>

<p>
Como última opção do menu está a opção de modificar as imagens da home. Ela é utilizada para adicionar ou remover as imagens das reformas de estofados que são mostradas na home. A opção foi criada para que as imagens possam ser dinâmicas, sendo adicionadas as imagens das novas reformas e removidas as que não são mais pertinentes.
</p>

<p align="center">
  <img alt="Imagens reforma" width="450px" src="https://user-images.githubusercontent.com/51447706/106608889-b2170780-6543-11eb-9437-8828a4b52365.png"/>
</p>
<p align="center">
   Figura 45: Página para alteração das imagens de reformas.
</p>

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
<sup>Projeto desenvolvido exclusivamente por Gabriel Henrique Linke</sup>
