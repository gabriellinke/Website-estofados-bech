import { Request, Response } from 'express';
import knex from '../database/connection';
import nodemailer from 'nodemailer'
import { link } from '@hapi/joi';

class CheckoutController
{
    async create(request: Request, response: Response)
    {
        const {
            product_id,
            productName,
            quantity,
            price,
            freightPrice,
      
            name,
            surname,
            email,
            area_code,
            phone,
            cpf,
      
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            adjunct,
      
            url,
            checkout_id,

            userId,
            userName,
            userSurname,
            userEmail,
          } = request.body;

        const data = {
            product_id,
            productName,
            quantity,
            price,
            freightPrice,
      
            name,
            surname,
            email,
            area_code,
            phone,
            cpf,
      
            cep,
            state,
            city,
            neighborhood,
            street,
            number,
            adjunct,
      
            url,
            checkout_id,

            userId,
            userName,
            userSurname,
            userEmail,
        };

        const insertedData = await knex('checkout_data').insert(data);
        const data_id = insertedData[0];

        //ENVIAR EMAIL COM OS DADOS DO COMPRADOR E DO PRODUTO COMPRADO
        const usuario = "freestepnewversion@gmail.com";
        const senha = "soufreestep";

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: usuario,
                pass: senha
            },
            tls: { rejectUnauthorized: false }
        });

        const mensagem = `<p>O usuário ${userName} ${userSurname} cadastrado com o email ${userEmail} acaba de iniciar um processo de compra.<br/></p>
                          <p>O seu email de contato é ${email} e seu telefone para contato é (${area_code}) ${phone}.<br/></p>
                          <p>O nome preenchido no formulário é ${name} ${surname} e o CPF é ${cpf}.<br/></p>
                          <p>O endereço do destinatário é:<br/></p>
                          <p>CEP: ${cep}.</p>
                          <p>Estado: ${state}.</p>
                          <p>Cidade: ${city}.</p>
                          <p>Bairro: ${neighborhood}.</p>
                          <p>Rua: ${street}.</p>
                          <p>Número: ${number}.</p>
                          <p>Complemento: ${adjunct}.<br/></p>
                          <p>O produto comprado foi ${quantity} unidades de ${productName} pelo preço de R$${price} por unidade, com um frete de R$${freightPrice}.<br/></p>
                          <p>O link utilizado para a compra foi: <a href=${url}>${url}</a><br/></p>
                          <h3>Aguarde a confirmação do pagamento pelo Mercado Pago para fazer o envio do produto<h3>
                          `

        transporter.sendMail({
            from: "Estofados Bech <freestepnewversion@gmail.com>",
            to: "freestepnewversion@gmail.com",
            subject: "Possível compra sendo processada",
            html: mensagem
        }).then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err);
        })

        return response.json({
            data_id,
            data
        });
    }
}

export default CheckoutController;