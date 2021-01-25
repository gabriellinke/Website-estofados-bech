import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('descriptions').insert([
        { product_id: 1, description:'Um sofá pronto para te acompanhar na hora de ler seu livro favorito ou tirar uma soneca pós-almoço, tudo graças à função retrátil - ela permite que você escolha a melhor posição do assento, aninhando seu corpo e esticando as pernas de forma muito confortável.' },
        { product_id: 1, description:'O sofá não tem graça se não der para dividir com quem amamos, por isso esse modelo é espaçoso o suficiente para até 3 pessoas ficarem confortáveis na hora de assistir a um filminho ou bater papo.' },
        { product_id: 1, description:'Só de olhar para essas almofadas dá vontade de se aconchegar, né? Graças à espuma usada para o enchimento do encosto e assento do produto, parece que o seu corpo está sendo abraçado e você consegue curtir muito mais os momentos relax.' },
        { product_id: 2, description:'Feito para resistir de maneira eficaz ao uso rotineiro, a estrutura do sofá é produzida em madeira pinus e eucalipto. Dessa forma, ele tem mais durabilidade e recepciona todos os seus convidados por muito mais tempo.' },
        { product_id: 2, description:'Além da função tradicional de assento, o móvel permite também a completa reclinação do encosto para formar uma cama de casal. Assim, você sempre terá um cantinho pronto para acomodar as visitas de final de semana.' },
        { product_id: 2, description:'A segurança que você quer oferecer para os seus familiares e amigos é garantida pelos pés metálicos da peça. Além de coroá-la com ótima estabilidade, eles também agregam à estética do móvel, que vira um destaque no cômodo.' },
        { product_id: 3, description:'O estofado macio é o principal destaque dessa cadeira, mas a ergonomia também chama a atenção: além do encosto ser mais alto e com curvas que acomodam bem as costas, o ângulo na região lombar é perfeito pois se adapta ao formato do corpo de maneira aconchegante.' },
        { product_id: 3, description:'Com 5 rodízios em nylon que deslizam facilmente pelo espaço, a base tipo estrela é também um atrativo para a decoração do cômodo. Por ser cromada, ela traz um charme especial que combina superbem com a decoração do ambiente profissional.' },
        { product_id: 3, description:'Para que você ajuste a cadeira no nível ideal para o seu corpo, basta acionar o mecanismo de regulagem de altura. Assim você deixa o assento em uma posição confortável para as pernas e não prejudica a postura durante as longas horas de trabalho.' },
        { product_id: 4, description:'A Cadeira de escritório DIR-001 preta diretor da Nell possui design anatômico, valorizando o seu conforto de diversas maneiras.' },
        { product_id: 4, description:'Giratória e com rodízios, agora vai ser muito mais fácil pegar arquivos e se movimentar sem precisar ficar levantando ou carregando a cadeira.' },
        { product_id: 4, description:'Além disso possui regulagem de altura para que você usufrua ao máximo da comodidade que essa linda cadeira te oferece. ' },
        { product_id: 4, description:'Agora você pode trabalhar tranquilo e gerir sua empresa com a melhor qualidade.' },
        { product_id: 4, description:'Os planos do crescimento profissional começam aqui!' },
        { product_id: 5, description:'Precisando de uma cadeira confortável para o seu ambiente de trabalho? Conte com a Cadeira de Escritório Oslo.' },
        { product_id: 5, description:'Ela é ideal para proporcionar charme e bom gosto para a decoração, deixando você muito mais à vontade para realizar as tarefas do dia.' },
        { product_id: 5, description:'Com rodízios e regulagem de altura, ela facilita a sua movimentação e se adapta à sua necessidade.' },
        { product_id: 6, description:'A Malha de Algodão é um tecido resistente e com boa elasticidade.' },
        { product_id: 6, description:'Perfeito para a confecção de peças para o dia a dia, devido ao seu conforto. ' },
        { product_id: 6, description:'Crie camisetas, calças, vestidos, saias e demais peças.' },
        { product_id: 7, description:'O tule filó é um tecido perfeito para as saias mais armadas de vestidos de noiva.' },
        { product_id: 7, description:'Possui um caimento pesado e uma textura macia que não pinica.' },
        { product_id: 7, description:'É semi-transparente.' },
        { product_id: 8, description:'A Mescla de Lã é um tecido mais fino que a lã batida, sendo indicada para a criação de conjuntos, blazers, calças e saias para temperaturas não tão frias.' }, 
        { product_id: 8, description:'Sua aparência se encaixa tanto no estilo casual como no social.' },
        { product_id: 8, description:'Por possuir caimento maleável, pode ser utilizada em modelagens retas e evasê. ' },
        { product_id: 8, description:'Apesar de seu toque levemente áspero, é bastante confortável e resistente.' },
        { product_id: 9, description:'É um tecido felpudo que é utilizada principalmente na confecção de casacos, coletes e sobretudos, mas pode ser usada também em golas, punhos, barras de outras peças, como um detalhe decorativo. ' },
        { product_id: 9, description:'Por ser um tecido grosso e de caimento médio, é melhor empregado em modelagens retas ou evasê.' },
        { product_id: 10, description:'Tapete produzido com tramas de algodão em um trançado de cores neutras.' },
        { product_id: 10, description:'De construção retangular e acabamento arrematado, o modelo é fácil de lavar e traz um toque de sustentabilidade ao ambiente.' },
        { product_id: 10, description:'Conforto e estilo para uma decoração super clean.' },
        { product_id: 11, description:'Em modelagem retangular, o tapete Signature é moderno e charmoso.' },
        { product_id: 11, description:'Com padronagem diferenciada, a peça promete complementar a decoração da sua sala com um toque de personalidade. Aposte!' },
        { product_id: 12, description:'A coleção supreme traz interessantes composições para a decoração da sua casa.' },
        { product_id: 12, description:'Brincando com formas orgânicas, como os delicados arabescos, e as modernas formas geométricas, combinadas com as cores bege, azul e cinza, esta coleção é a escolha certeira para dar um toque moderno à sua sala ou quarto.' },

    ]);
}