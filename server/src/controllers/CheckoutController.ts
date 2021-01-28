import { Request, Response } from 'express';
import knex from '../database/connection';
import nodemailer from 'nodemailer'
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
class CheckoutController
{
    // Cria uma tabela com os dados do comprador e envia esses dados por email para ter um controle
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
            CPF: cpf,
      
            CEP: cep,
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

        console.log(data);
        const insertedData = await knex('checkout_data').insert(data);
        // const data_id = insertedData[0];
        
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID, // HARD CODED
            process.env.CLIENT_SECRET, // Client Secret        // HARD CODED
            "https://developers.google.com/oauthplayground" // Redirect URL
       );

        oauth2Client.setCredentials({
            fresh_token: process.env.CLIENT_REFRESH_TOKEN // HARD CODED
        });
        const accessToken = oauth2Client.getAccessToken();

        //ENVIAR EMAIL COM OS DADOS DO COMPRADOR E DO PRODUTO COMPRADO
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.CLIENT_REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: { rejectUnauthorized: false }
        });

        let idArray = product_id.split('@')
        let quantityArray = quantity.split('@');
        let nameArray = productName.split('@');
        let priceArray = price.split('@');

        let msg = "";
        for(let i=0; i < quantityArray.length; i++)
        {
            msg += quantityArray[i] + " unidades de " + nameArray[i]+'(id: '+ idArray[i] +')' + " pelo preço de R$" + priceArray[i] + " por unidade,"
        }

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
                          <p>Os produtos comprados foram ${msg} com um frete de R$${freightPrice}.<br/></p>
                          <p>O link utilizado para a compra foi: <a href=${url}>${url}</a><br/></p>
                          <h3>Aguarde a confirmação do pagamento pelo Mercado Pago para fazer o envio do produto<h3>
                          `

        transporter.sendMail({
            from: `Estofados Bech <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Possível compra sendo processada",
            html: mensagem
        }).then(message => {
            console.log(message);
        }).catch(err => {
            console.log(err);
        })

        return response.json({
            // data_id,
            data
        });
    }
}

export default CheckoutController;