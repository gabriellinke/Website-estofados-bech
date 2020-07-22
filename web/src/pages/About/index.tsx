import React from 'react'; 
import Footer from '../../partials/Footer/Footer'
import Header from '../../partials/Header/Header'
import imagemLoja from '../../assets/imagem-loja.jpg'

import { Map, TileLayer, Marker} from 'react-leaflet';  //Usado para o mapa

import './styles.css';  //Importa o css

const About: React.FC = () =>
{
    return(
        <div id="page-about">
            <Header />
            <img src={imagemLoja} alt="Imagem da loja" className='imagem-loja'/>
            <div className="content">
                <main>
                    <h1>Quem somos</h1>
                    <div className="content-text">
                        O Grupo JB tecidos, com mais de 40 anos de atividades e realizações de sucesso, tornou-se um dos principais fornecedores de produtos acoplados e dublados do país. Atua fortemente nos segmentos automotivo, vestuário, bolsas e calçados, hospitalar e moveleiro.
                        Processos de beneficiamento ou fabricação de revestimentos acoplados ou dublados, conta com rigoroso e eficiente sistema de controle de qualidade e prazos, que nos garantiu em julho de 2008, a Certificação do Sistema de Gestão de Qualidade ISO 9001 pela conceituada Fundação Vanzolini. Com nossa capacidade de dublagem ampliada em 2008, e com a aquisição de novas e modernas máquinas, foi preciso também modernizar o layout fabril, a fim de tornar mais eficiente os fluxos de produção e escoamento de produtos. Dessa maneira conseguimos maximizar e aperfeiçoar a relação custo/benefício de nossos processos. Com nossa alta e exclusiva especialização na absorção de parte do processo da cadeia produtos de nossos clientes, conseguimos atuar e diminuir custos de processo, produção, armazenamento e transporte, tanto para nossos clientes e fornecedores quanto para o grupo JB. Entendemos que um dos caminhos para o crescimento é a parceria honesta e com relações aprofundadas de respeito e confiança. Convidamos você e sua empresa para fazer parte desse projeto de crescimento e aprendizado.
                        LOJA JB
                        Decidimos expandir ainda mais as possibilidades. Sendo assim, agora atendemos virtualmente você, tapeceiro, e também VOCÊ, consumidor final do nosso produto.
                        Agora você pode comprar o material que VOCÊ mais se identifica para o seu carro diretamente do fornecedor!
                    </div>
                    <h2>Localização</h2>
                    <div className="address">Avenida Belém, Nº 1563, Centro, Pinhalzinho-SC</div>
                    <div className="map">
                        <Map id="mapid" center={[-26.850094, -52.989369]} zoom={17}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[-26.850094, -52.989369]} />
                        </Map>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default About;