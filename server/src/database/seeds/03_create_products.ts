import Knex from 'knex';

export async function seed(knex: Knex)
{
    await knex('products').insert([
    {
        name: 'Sofá 3 Lugares Retrátil Lubeck Suede Preto',
        category: 'sofás',
        images: 'https://i.ibb.co/K7yZpgf/sofa1.jpg,https://i.ibb.co/G0tBHMS/sofa1-2.jpg,https://i.ibb.co/tHs49gJ/sofa1-3.jpg,https://i.ibb.co/Rc2sJQC/sofa1-4.jpg',
        conditions: 12,
        price: 569.90,
        quantity: 3,
        peso: 40,
        formato: 1,
        comprimento: 180,
        altura: 86,
        largura: 87,
        diametro: 5,
    },
    {
        name: 'Sofá-Cama 3 Lugares Casal Premium Suede Cinza',
        category: 'sofás',
        images: 'https://i.ibb.co/Y39fg9B/sofa2-1.jpg,https://i.ibb.co/GxNxSLH/sofa2-2.jpg,https://i.ibb.co/2MH6F3d/sofa2-3.jpg,https://i.ibb.co/DRgxtcm/sofa2-4.jpg',
        conditions: 12,
        price: 999.90,
        quantity: 5,
        peso: 45,
        formato: 1,
        comprimento: 190,
        altura: 46,
        largura: 120,
        diametro: 5,
    },
    {
        name: 'Cadeira de Escritório Presidente Giratória Finland Preta',
        category: 'cadeiras',
        images: 'https://i.ibb.co/C1z27Tx/cadeira1-1.jpg,https://i.ibb.co/wRYLH2Q/cadeira1-2.jpg,https://i.ibb.co/822PGgG/cadeira1-3.jpg,https://i.ibb.co/HKp0hKP/cadeira1-4.jpg',
        conditions: 12,
        price: 1099.90,
        quantity: 1,
        peso: 10,
        formato: 1,
        comprimento: 109,
        altura: 66,
        largura: 70,
        diametro: 5,
    },
    {
        name: 'Cadeira de Escritório Giratória Diretor Nell - Preta',
        category: 'cadeiras',
        images: 'https://i.ibb.co/LvxYxcv/cadeira2-1.jpg,https://i.ibb.co/64QRnRn/cadeira2-2.jpg,https://i.ibb.co/RH9HRwf/cadeira2-3.jpg',
        conditions: 10,
        price: 219.90,
        quantity: 8,
        peso: 8,
        formato: 1,
        comprimento: 90,
        altura: 60,
        largura: 60,
        diametro: 5,
    },
    {
        name: 'Cadeira de Escritório Diretor Giratória Oslo Branca',
        category: 'cadeiras',
        images: 'https://i.ibb.co/GPhWGSL/cadeira3-1.jpg,https://i.ibb.co/RzrHQRc/cadeira3-2.jpg,https://i.ibb.co/dWSpKgX/cadeira3-3.jpg,https://i.ibb.co/X2sSL6Z/cadeira3-4.jpg',
        conditions: 10,
        price: 412.99,
        quantity: 6,
        peso: 13,
        formato: 1,
        comprimento: 92,
        altura: 65,
        largura: 60,
        diametro: 5,
    },
    {
        name: 'Tecido Malha de Algodão Geométrico Tons de Cinza',
        category: 'tecidos',
        images: 'https://i.ibb.co/2kZCNms/tecido1-1.jpg,https://i.ibb.co/PNJJ9d2/tecido1-2.jpg,https://i.ibb.co/bdBHFD5/tecido1-3.jpg',
        conditions: 6,
        price: 32.90,
        quantity: 37,
        peso: 0.2,
        formato: 1,
        comprimento: 95,
        altura: 2,
        largura: 95,
        diametro: 5,
    },
    {
        name: 'Tecido Filó Branco',
        category: 'tecidos',
        images: 'https://i.ibb.co/HBcNB3Q/tecido2-1.jpg,https://i.ibb.co/mJRfQwr/tecido2-2.jpg,https://i.ibb.co/X5Ljwpb/tecido2-3.jpg',
        conditions: 6,
        price: 12.90,
        quantity: 95,
        peso: 0.2,
        formato: 1,
        comprimento: 95,
        altura: 2,
        largura: 95,
        diametro: 5,
    },
    {
        name: 'Tecido Mescla de Lã Grafite (100% Poliéster)',
        category: 'tecidos',
        images: 'https://i.ibb.co/qmgrbs4/tecido3-1.jpg,https://i.ibb.co/1bVNnjV/tecido3-2.jpg',
        conditions: 6,
        price: 43.90,
        quantity: 25,
        peso: 0.2,
        formato: 1,
        comprimento: 95,
        altura: 2,
        largura: 95,
        diametro: 5,
    },
    {
        name: 'Tecido Soft Roxo Uva',
        category: 'tecidos',
        images: 'https://i.ibb.co/Wt8R9CG/tecido4-1.jpg,https://i.ibb.co/M6V4MBd/tecido4-2.jpg,https://i.ibb.co/w63WtwZ/tecido4-3.jpg',
        conditions: 6,
        price: 40.90,
        quantity: 60,
        peso: 0.2,
        formato: 1,
        comprimento: 95,
        altura: 2,
        largura: 95,
        diametro: 5,
    },
    {
        name: 'Tapete Algodão Moderno Cinza 100x170cm',
        category: 'tapetes',
        images: 'https://i.ibb.co/YbDX6Bw/tapete1-1.jpg,https://i.ibb.co/cTyzvRk/tapete1-2.jpg,https://i.ibb.co/rHvmptQ/tapete1-3.jpg',
        conditions: 12,
        price: 299.90,
        quantity: 4,
        peso: 20,
        formato: 1,
        comprimento: 100,
        altura: 2,
        largura: 170,
        diametro: 5,
    },
    {
        name: 'Tapete Signature I Azul 200x300cm',
        category: 'tapetes',
        images: 'https://i.ibb.co/305z26V/tapete2-1.jpg,https://i.ibb.co/6Z66rBH/tapete2-2.jpg',
        conditions: 12,
        price: 2499.90,
        quantity: 2,
        peso: 20,
        formato: 1,
        comprimento: 200,
        altura: 2,
        largura: 300,
        diametro: 5,
    },
    {
        name: 'Tapete Supreme, Tapetes São Carlos, Ladrilho, 150x200 cm',
        category: 'tapetes',
        images: 'https://i.ibb.co/jMByvfV/tapete3-1.jpg,https://i.ibb.co/TqS0gWK/tapete3-2.jpg,https://i.ibb.co/7G5jmGJ/tapete3-3.jpg,https://i.ibb.co/jhdVbhG/tapete3-4.jpg',
        conditions: 12,
        price: 425.00,
        quantity: 2,
        peso: 22,
        formato: 1,
        comprimento: 150,
        altura: 2,
        largura: 200,
        diametro: 5,
    },
    ]);
}